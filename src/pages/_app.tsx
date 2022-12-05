import '@styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material';
import theme from 'ui/themes/theme';
import Header from 'ui/components/surfaces/Header/Header';
import Footer from 'ui/components/surfaces/Footer/Footer';
import { AppContainer } from '@styles/pages/_app.styled';
import { PropsWithChildren } from 'react';
import { MainProvider } from 'data/contexts/MainContext';

function App({ Component, pageProps }: AppProps) {
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
                        <Component {...pageProps} />
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
