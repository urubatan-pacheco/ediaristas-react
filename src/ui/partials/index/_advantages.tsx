import {
  AvatarStyled,
  GradientBackground,
  ListDivider,
  ListItemTextStyled,
  SectionTitle,
  StyledList,
} from './_advantages.style';
import { Container, ListItem, ListItemAvatar, Typography } from '@mui/material';
import React from 'react';

const advantagesList = [
  {
    icon: 'twf-woman',
    title: 'Diversidade',
    description: 'São mais de 5.000 profissionais esperando por você!',
  },
  {
    icon: 'twf-certificate',
    title: 'Confiabilidade',
    description: 'Todos os profissionais são verificados',
  },
  {
    icon: 'twf-search-2',
    title: 'Rastreabilidade',
    description: 'Você pode acessar todo o histórico do(a) profissional',
  },
  {
    icon: 'twf-frame-broken',
    title: 'Segurança',
    description: 'Seguro sobre qualquer possível dano',
  },
  {
    icon: 'twf-payment',
    title: 'Controle',
    description:
      'O pagamento é realizado somente quando o(a) profissional está na sua casa',
  },
  {
    icon: 'twf-broom-bucket',
    title: 'Experiência',
    description: 'Mais de 500.000 diárias realizada',
  },
];

const Advantages = () => {
  return (
    <GradientBackground>
      <Container>
        <SectionTitle>Por que usar o E-diarista?</SectionTitle>
        <StyledList>
          {advantagesList.map((advantage, index) => (
            <React.Fragment key={advantage.title}>
              {index !== 0 && <ListDivider />}
              <ListItem disableGutters>
                <ListItemAvatar>
                  <AvatarStyled>
                    <i className={advantage.icon} />
                  </AvatarStyled>
                </ListItemAvatar>
                <ListItemTextStyled
                  primary={advantage.title}
                  secondary={advantage.description}
                />
              </ListItem>
            </React.Fragment>
          ))}
        </StyledList>
      </Container>
    </GradientBackground>
  );
};

export default Advantages;
