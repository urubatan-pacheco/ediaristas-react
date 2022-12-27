import React from 'react';
import { GetStaticProps } from 'next';
import SafeEnvironment from 'ui/components/feedback/SafeEnvironment/SafeEnvironment';
import { Container } from '@mui/system';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import { LoginButton, LoginContainer } from '@styles/pages/login.styled';
import { LoginForm } from 'ui/components/inputs/UserForms/UserForms';
import useLogin from 'data/hooks/pages/useLogin.page';
import { FormProvider } from 'react-hook-form';
import { Typography } from '@mui/material';

// import { Component } from '@styles/pages/login.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Login',
        },
    };
};

const Login: React.FC = () => {
    const { externalServicesState, formMethods, errorMessage, onSubmit } =
        useLogin();
    return (
        <FormProvider {...formMethods}>
            <SafeEnvironment />
            <Container>
                <PageTitle title={'Informe seu e-mail e senha'} />
                <LoginContainer
                    as={'form'}
                    onSubmit={formMethods.handleSubmit(onSubmit)}
                >
                    <LoginForm />
                    {errorMessage && (
                        <Typography color={'error'} align={'center'}>
                            {errorMessage}
                        </Typography>
                    )}
                    <LoginButton
                        size={'large'}
                        variant={'contained'}
                        color={'secondary'}
                        type={'submit'}
                        disabled={
                            externalServicesState?.externalServices?.length ===
                            0
                        }
                    >
                        Entrar
                    </LoginButton>
                </LoginContainer>
            </Container>
        </FormProvider>
    );
};

export default Login;
