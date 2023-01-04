import { UserInterface, UserType } from 'data/@types/UserInterface';
import { useRouter, NextRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

export const privateRoutes = [
    '/alterar-dados',
    '/diarias',
    '/pagamentos',
    '/oportunidades',
];

export const annonymousRoutes = [
    '/cadastro/diarista',
    '/login',
    '/recuperar-senha',
    '/',
];

export const houseCleanerOnlyRoutes = ['/pagamentos', '/oportunidades'];

export default function useRouterGuard(
    user: UserInterface,
    isLoggin: boolean
): NextRouter {
    const router = useRouter();
    const isLogged = user.nome_completo.length > 0;
    const isHouseCleaner = user.tipo_usuario === UserType.Diarista;

    useEffect(() => {
        const url = router.route;
        handleNavigation(url);

        router.events.on('routeChangeStart', handleNavigation);

        return () => {
            router.events.off('routeChangeStart', handleNavigation);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, isLogged, isLoggin]);

    function handleNavigation(url: string) {
        console.log('url:', url);
        console.log('isLogged:', isLogged);
        console.log('isLoggin:', isLoggin);
        console.log(
            'annonymousRoutes.includes(url):',
            annonymousRoutes.includes(url)
        );

        if (!isLoggin) {
            if (privateRoutes.includes(url) && !isLogged) {
                const nextUrl = '/login';

                router.replace('/login');

                return;
            }

            if (
                (annonymousRoutes.includes(url) && isLogged) ||
                (houseCleanerOnlyRoutes.includes(url) && !isHouseCleaner)
            ) {
                console.log('router.replace(getHome()):', getHome());
                const nextUrl = getHome();

                router.replace(nextUrl);

                return;
            }

            if (url === '/encontrar/diarista' && isHouseCleaner) {
                router.replace('/');
                return;
            }
        }
    }

    function getHome(): string {
        if (!isLogged) {
            return '/';
        }

        return isHouseCleaner ? '/oportunidades' : '/diarias';
    }

    return router;
}
