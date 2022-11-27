import { Button, Container, Divider, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import {
    NewContactForm,
    PictureForm,
    UserDataForm,
} from 'ui/components/inputs/UserForms/UserForms';

// import { Component } from './_cadastro-cliente.styled';

interface CadastroClienteProps extends PropsWithChildren {
    onBack: () => void;
}

const CadastroCliente: React.FC<CadastroClienteProps> = ({ onBack }) => {
    return (
        <>
            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Dados pessoais
            </Typography>
            <UserDataForm cadastro={true} />
            <Divider sx={{ mb: 5 }} />
            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Hora da self! Envie uma self segurando o documento
            </Typography>
            <PictureForm />
            <Typography sx={{ pt: 1, pb: 5 }} variant={'body2'}>
                Esta foto não será vista por ninguém
            </Typography>
            <Divider sx={{ mb: 5 }} />
            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Dados de acesso
            </Typography>
            <NewContactForm />
            <Container
                sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <Button
                    variant={'outlined'}
                    color={'primary'}
                    type={'button'}
                    onClick={onBack}
                >
                    Voltar para detalhes da diária
                </Button>
                <Button
                    variant={'contained'}
                    color={'secondary'}
                    type={'submit'}
                >
                    Ir para pagamento
                </Button>
            </Container>
        </>
    );
};

export default CadastroCliente;
