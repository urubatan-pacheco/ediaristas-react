import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import UserProfileAvatar from './UserProfileAvatar';
import { UserType } from 'data/@types/UserInterface';

export default {
    title: 'data-display/UserProfileAvatar',
    component: UserProfileAvatar,
} as ComponentMeta<typeof UserProfileAvatar>;

const Template: ComponentStory<typeof UserProfileAvatar> = (args) => (
    <UserProfileAvatar {...args} />
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
};
