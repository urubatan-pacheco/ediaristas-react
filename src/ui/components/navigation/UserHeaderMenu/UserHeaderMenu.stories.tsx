import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import UserHeaderMenu from './UserHeaderMenu';
import { UserType } from 'data/@types/UserInterface';

export default {
    title: 'navigation/UserHeaderMenu',
    component: UserHeaderMenu,
} as ComponentMeta<typeof UserHeaderMenu>;

const Template: ComponentStory<typeof UserHeaderMenu> = (args) => (
    <UserHeaderMenu {...args} />
);

export const Default = Template.bind({});

Default.args = {
    user: {
        nome_completo: 'Akira Hanshiro',
        nascimento: '1993-07-07',
        cpf: '99999999999',
        email: 'abc@def.com',
        foto_usuario: 'https://github.com/hanashiro.png',
        telefone: '(99) 99999-9999',
        tipo_usuario: UserType.Cliente,
        reputacao: 0,
        password: '',
        chave_pix: '',
    },
    isMenuOpen: false,
};
