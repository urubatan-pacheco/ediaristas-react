import { Button, Container, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';
import SafeEnvironment from 'ui/components/feedback/SafeEnvironment/SafeEnvironment';
import TextFieldMask from 'ui/components/inputs/TextFieldMask/TextFieldMask';

import {
  FormElementsContainer,
  ProfissionalContainer,
  ProfissionalPaper,
} from './_verificar-profissionais.styled';

const VerificarProfissionais: React.FC<PropsWithChildren> = () => {
  return (
    <>
      <SafeEnvironment />
      <PageTitle
        title={'Conheça os profissionais'}
        subtitle={
          'Preencha seu endereço e veja todos os profissionais da sua localidade'
        }
      />
      <Container sx={{ mb: 10 }}>
        <FormElementsContainer>
          <TextFieldMask
            mask={'99.999-999'}
            label={'Digite seu CEP'}
            fullWidth
          />
          <Typography color={'error'}>CEP não encontrado!</Typography>
          <Button
            variant={'contained'}
            color={'secondary'}
            sx={{ width: '220px' }}
          >
            Buscar
          </Button>
        </FormElementsContainer>
        <ProfissionalPaper>
          <ProfissionalContainer>
            <UserInformation
              name={'Urubatan Pacheco'}
              picture={'https://github.com/urubatan-pacheco.png'}
              rating={3}
              description={'Campinas-SP'}
            />
            <UserInformation
              name={'Urubatan Pacheco'}
              picture={'https://github.com/urubatan-pacheco.png'}
              rating={3}
              description={'Campinas-SP'}
            />
            <UserInformation
              name={'Urubatan Pacheco'}
              picture={'https://github.com/urubatan-pacheco.png'}
              rating={3}
              description={'Campinas-SP'}
            />
          </ProfissionalContainer>
          <Container sx={{ textAlign: 'center' }}>
            <Typography
              variant={'body2'}
              color={'textSecondary'}
              sx={{ mt: 5 }}
            >
              ...e mais 50 profissionais atendem ao seu endereço.
            </Typography>
            <Button variant={'contained'} color={'secondary'} sx={{ mt: 5 }}>
              Contratar um(a) profissional
            </Button>
          </Container>
        </ProfissionalPaper>
      </Container>
    </>
  );
};

export default VerificarProfissionais;
