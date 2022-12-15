import axios from 'axios';
import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';
import { CadastroUserInterface } from 'data/@types/FormInterface';
import { UserInterface, UserType } from 'data/@types/UserInterface';
import { FieldPath, UseFormReturn } from 'react-hook-form';
import { ApiService } from './ApiService';
import { ObjectService } from './ObjectService';
import { TextFormnatService } from './TextFormatService';

export const UserService = {
    async cadastrar(
        user: UserInterface,
        userType: UserType,
        link: ApiLinksInterface
    ): Promise<UserInterface | undefined> {
        ApiService.defaults.headers.common.Authorization = '';

        const nascimento = TextFormnatService.dateToString(
                user.nascimento as Date
            ),
            cpf = TextFormnatService.getNumbersFromText(user.cpf),
            telefone = TextFormnatService.getNumbersFromText(user?.telefone);

        const userData = ObjectService.jsonToFormData({
            ...user,
            tipo_usuario: userType,
            nascimento,
            telefone,
            cpf,
        });

        const response = await ApiService.request<UserInterface>({
            url: link.uri,
            method: link.type,
            data: userData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
    handleNewUserError(
        error: unknown,
        form: UseFormReturn<CadastroUserInterface>
    ): void {
        if (axios.isAxiosError(error)) {
            const errorList = error?.response?.data as
                | { errors: UserInterface }
                | undefined;

            if (errorList) {
                if (errorList.errors.cpf) {
                    form.setError('usuario.cpf' as FieldPath<T>, {
                        type: 'cadastrado',
                        message: 'CPF já cadastrado',
                    });
                }
                if (errorList.errors.email) {
                    form.setError('usuario.email' as FieldPath<T>, {
                        type: 'cadastrado',
                        message: 'CPF já cadastrado',
                    });
                }
            }
        }
    },
};
