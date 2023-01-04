import '@styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CircularProgress, ThemeProvider } from '@mui/material';
import theme from 'ui/themes/theme';
import Header from 'ui/components/surfaces/Header/Header';
import Footer from 'ui/components/surfaces/Footer/Footer';
import { AppContainer } from '@styles/pages/_app.styled';
import { PropsWithChildren, useContext, useState } from 'react';
import { MainProvider } from 'data/contexts/MainContext';
import { UserContext } from 'data/contexts/UserContext';
import useRouterGuard, { privateRoutes } from 'data/hooks/useRouterGuard.hook';
import { Container, textAlign } from '@mui/system';

function App({ Component, pageProps }: AppProps) {
    const { userState } = useContext(UserContext);
    const router = useRouterGuard(userState.user, userState.isLogging);

    function canShow(): boolean {
        if (privateRoutes.includes(router.pathname)) {
            if (userState.isLogging) {
                return false;
            } else {
                return userState.user.nome_completo.length > 0;
            }
        }
        return true;
    }
    return (
        <>
            <Head>
                <title>
                    e-diaristas {pageProps.title && ` -  ${pageProps.title}`}
                </title>
            </Head>
            <ThemeProvider theme={theme}>
                <AppContainer>
                    <Header />
                    <main>
                        {canShow() ? (
                            <Component {...pageProps} />
                        ) : (
                            <Container sx={{ textAlign: 'center', my: 10 }}>
                                <CircularProgress />
                            </Container>
                        )}
                    </main>
                    <Footer />
                </AppContainer>
            </ThemeProvider>
        </>
    );
}

const AppProviderContainer: React.FC<AppProps> = (props) => {
    return (
        <MainProvider>
            <App {...props} />
        </MainProvider>
    );
};

export default AppProviderContainer;
