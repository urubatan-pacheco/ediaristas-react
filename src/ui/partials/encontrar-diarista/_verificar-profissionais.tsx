import { Button, CircularProgress, Container, Typography } from '@mui/material';
import useVerificarProfissionais from 'data/hooks/pages/useVerificarProfissionais.page';
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
  const {
    cep,
    setCep,
    cepValido,
    buscarProfissionais,
    erro,
    diaristas,
    buscaFeita,
    carregando,
    diaristasRestantes,
  } = useVerificarProfissionais();

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
            value={cep}
            onChange={(event) => setCep(event.target.value)}
          />
          <Typography color={'error'}>{erro}</Typography>
          <Button
            variant={'contained'}
            color={'secondary'}
            sx={{ width: '220px' }}
            disabled={!cepValido || carregando}
            onClick={() => buscarProfissionais(cep)}
          >
            {carregando ? <CircularProgress size={20} /> : 'Buscar'}
          </Button>
        </FormElementsContainer>
        {buscaFeita &&
          (diaristas.length > 0 ? (
            <ProfissionalPaper>
              <ProfissionalContainer>
                {diaristas.map((diarista, index) => (
                  <UserInformation
                    key={index}
                    name={diarista.nome_completo}
                    picture={diarista.url_foto_usuario || ''}
                    rating={diarista.reputacao || 0}
                    description={diarista.cidade}
                  />
                ))}
              </ProfissionalContainer>
              <Container sx={{ textAlign: 'center' }}>
                {diaristasRestantes > 0 ? (
                  <Typography
                    variant={'body2'}
                    color={'textSecondary'}
                    sx={{ mt: 5 }}
                  >
                    ...e mais {diaristasRestantes}{' '}
                    {diaristasRestantes > 1
                      ? 'profissionais atendem'
                      : 'profissional atende'}{' '}
                    ao seu endereço.
                  </Typography>
                ) : (
                  <></>
                )}
                <Button
                  variant={'contained'}
                  color={'secondary'}
                  sx={{ mt: 5 }}
                >
                  Contratar um(a) profissional
                </Button>
              </Container>
            </ProfissionalPaper>
          ) : (
            <Typography align={'center'} color={'textPrimary'}>
              Ainda não temos nenhum(a) diarista disponível em sua região
            </Typography>
          ))}
      </Container>
    </>
  );
};

export default VerificarProfissionais;
