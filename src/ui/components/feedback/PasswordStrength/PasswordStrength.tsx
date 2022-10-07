import React from 'react';
import { passwordStrength } from 'check-password-strength';
import {
    PasswordStrengthBar,
    PasswordStrengthLabel,
} from './PasswordStrength.style';
import { Typography } from '@mui/material';
// import { PasswordStrengthStyled } from './PasswordStrength.style';

export interface PasswordStrengthProps {
    password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
    const strength = password ? passwordStrength(password).id : 0,
        strengthValue = (100 * (strength + 1)) / 4;
    return (
        <div style={{ gridArea: 'password-strength' }}>
            <Typography
                variant={'body2'}
                component={'span'}
                color={'textSecondary'}
            >
                Nível da senha:&nbsp;
                <PasswordStrengthLabel value={strengthValue}>
                    {strength == 0 && 'FRACA'}
                    {strength == 1 && 'MÉDIA'}
                    {strength == 2 && 'FORTE'}
                    {strength == 3 && 'FORTE'}
                </PasswordStrengthLabel>
            </Typography>
            <PasswordStrengthBar
                value={strengthValue}
                variant={'determinate'}
            />
        </div>
    );
};

export default PasswordStrength;
