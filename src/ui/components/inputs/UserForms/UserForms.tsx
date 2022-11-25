import React from 'react';
import { FormContainerStyled } from './UserForms.style';
// import {} from '@mui/material';

export interface UserFormsProps {}

export const UserFormContainer = FormContainerStyled;

const UserForms: React.FC<UserFormsProps> = () => {
    return (
        <div>
            <div>UserForms</div>
        </div>
    );
};

export default UserForms;

export * from './forms/AddressForm';
export * from './forms/NewContactForm';
export * from './forms/PaymentForm';
export * from './forms/PictureForm';
export * from './forms/UserDataForm';
