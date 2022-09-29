import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import PageTitle from './PageTitle';

export default {
  title: 'data-display/PageTitle',
  component: PageTitle,
} as ComponentMeta<typeof PageTitle>;

const Template: ComponentStory<typeof PageTitle> = (args) => (
  <PageTitle {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'Conheça os profissionais',
  subtitle:
    'Preencha o seu endereço e veja todos os prpfissionais de sua localidade.',
};
