import React from 'react';
import { GetStaticProps } from 'next';

import { Component } from '@styles/pages/encontrar-diarista.styled';
import VerificarProfissionais from '@partials/encontrar-diarista/_verificar-profissionais';
import Contratacao from '@partials/encontrar-diarista/_contratacao';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: 'Encontrar diarista',
    },
  };
};

const EncontrarDiarista: React.FC = () => {
  return (
    <div>
      {/* <VerificarProfissionais /> */}
      <Contratacao />
    </div>
  );
};

export default EncontrarDiarista;
