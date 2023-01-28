import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';
import { LocalStorage } from './StorageService';

const url = process.env.NEXT_PUBLIC_API;

export const ApiService = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    },
});

ApiService.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('#### interceptor.response.use', error);
        if (
            error?.response?.status === 401 &&
            error.response.data.code === 'token_not_valid'
        ) {
            return handleTokenRefresh(error);
        }

        return Promise.reject(error);
    }
);

async function handleTokenRefresh(error: { config: AxiosRequestConfig }) {
    const tokenRefresh = LocalStorage.get<string>('token_refresh', '');
    console.log(
        '%%%%% handleTokenRefresh tokenrefresh:',
        tokenRefresh,
        'error:',
        error
    );
    if (tokenRefresh) {
        // verifica se já fizemos login
        LocalStorage.clear('token_refresh');
        LocalStorage.clear('token');
        ApiService.defaults.headers.common.Authorization = '';
        error.config.headers!.Authorization = '';
        try {
            const { data } = await ApiService.post<{
                access: string;
                refresh: string;
            }>('/auth/refresh/', {
                refresh: tokenRefresh,
            });
            LocalStorage.set('token', data.access);
            LocalStorage.set('token_refresh', data.refresh);

            ApiService.defaults.headers.common.Authorization = `Bearer ${data.access}`;

            // precisamos refazer a requisição
            error.config.headers!.Authorization = `Bearer ${data.access}`;

            return ApiService(error.config);
        } catch (error) {
            // neste caso o token-refresh não estava mais valido
            console.log(
                'neste caso o token-refresh não estava mais valido, error:',
                error
            );
            return error;
        }
    } else {
        console.log('An empty tokenRefresh:', tokenRefresh);
        return error;
    }
}

export function linksResolver(links: ApiLinksInterface[] = [], name: string) {
    return links.find((link) => link.rel === name);
}

export function ApiServiceHateoas(
    links: ApiLinksInterface[] = [],
    name: string,
    onCanRequest: (
        request: <T>(data?: AxiosRequestConfig) => Promise<AxiosResponse<T>>
    ) => void,
    onCantRequest?: Function
) {
    const requestLink = linksResolver(links, name);
    if (requestLink) {
        onCanRequest(<T>(data?: AxiosRequestConfig) => {
            return ApiService.request<T>({
                method: requestLink.type,
                url: requestLink.uri,
                ...data,
            });
        });
    } else {
        onCantRequest?.();
    }
}
