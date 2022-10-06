import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Breadcrumb from './Breadcrumb';

export default {
    title: 'navigation/Breadcrumb',
    component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = (args) => (
    <Breadcrumb {...args} />
);

export const Default = Template.bind({});

Default.args = {
    selected: 'Identificação',
    items: ['Detalhes', 'Identificação', 'Pagamento'],
};
