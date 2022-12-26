import React from 'react';
import { GetStaticProps } from 'next';

import { Component } from '@styles/pages/encontrar-diarista.styled';
import VerificarProfissionais from '@partials/encontrar-diarista/_verificar-profissionais';
import Contratacao from '@partials/encontrar-diarista/_contratacao';
import useEncontrarDirista from 'data/hooks/pages/useEncontrarDiarista.page';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Encontrar diarista',
        },
    };
};

const EncontrarDiarista: React.FC = () => {
    const { podeContratar, setPodeContratar } = useEncontrarDirista();

    return (
        <div>
            {!podeContratar ? (
                <VerificarProfissionais
                    onContratarProfissional={() => setPodeContratar(true)}
                />
            ) : (
                <Contratacao />
            )}
        </div>
    );
};

export default EncontrarDiarista;
