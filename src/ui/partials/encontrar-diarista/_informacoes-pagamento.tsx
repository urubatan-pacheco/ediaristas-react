import { Button, Container, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { PaymentForm } from 'ui/components/inputs/UserForms/UserForms';

// import { Component } from './_informacoes-pagamento.styled';

const InformacoesPagamento: React.FC<PropsWithChildren> = () => {
    return (
        <>
            <Typography sx={{ fontWeight: 'bold', pb: 2 }}>
                Informações Pagamento
            </Typography>
            <PaymentForm />
            <Container
                sx={{
                    textAlign: 'center',
                }}
            >
                <Button
                    variant={'contained'}
                    color={'secondary'}
                    type={'submit'}
                >
                    Fazer o pagamento
                </Button>
            </Container>
        </>
    );
};

export default InformacoesPagamento;
