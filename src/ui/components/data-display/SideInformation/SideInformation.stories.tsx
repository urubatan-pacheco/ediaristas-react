import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import SideInformation from './SideInformation';

export default {
    title: 'data-display/SideInformation',
    component: SideInformation,
} as ComponentMeta<typeof SideInformation>;

const Template: ComponentStory<typeof SideInformation> = (args) => (
    <SideInformation {...args} />
);

export const Default = Template.bind({});

Default.args = {
    title: 'Detalhes',
    items: [
        {
            title: 'Tipo',
            icon: 'twf-check-circle',
            description: ['Limpeza de rotina'],
        },
        {
            title: 'Tamanho',
            icon: 'twf-check-circle',
            description: ['3 cômodos', '2 banheiros'],
        },
        {
            title: 'Data',
            icon: 'twf-check-circle',
            description: ['14/12/2020'],
        },
    ],
    footer: {
        text: 'R$185,00',
        icon: 'twf-credit-card',
    },
};

export const NoIconNoFooter = Template.bind({});

NoIconNoFooter.args = {
    title: 'Como funciona?',
    items: [
        {
            title: '1 - Cadastro',
            description: ['Você faz o cadastro e escolhe as cidades atendidas'],
        },
        {
            title: '2 - Receba propostas',
            description: [
                'Você receberá avisos por e-mail sobre novos serviços nas cidades',
            ],
        },
        {
            title: '3 - Diária agendada',
            description: [
                'Se o seu perfil for escolhido pelo cliente, você receberá a confirmação do agendamento',
            ],
        },
    ],
};
