import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import UserForms from './UserForms';

export default {
  title: 'inputs/UserForms',
  component: UserForms,
} as ComponentMeta<typeof UserForms>;

const Template: ComponentStory<typeof UserForms> = (args) => (
  <UserForms {...args} />
);

export const Default = Template.bind({});

Default.args = {
};