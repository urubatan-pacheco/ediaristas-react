import { Typography } from '@mui/material';
import { FormValues } from 'data/@types/forms/FormValue';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '../../TextField/TextField';
import TextFieldMask from '../../TextFieldMask/TextFieldMask';
import { PaymentData } from '../UserForms.style';

export const PaymentForm = () => {
    const {
        register,
        formState: { errors },
        control,
    } = useFormContext<FormValues>();

    useEffect(() => {
        register('pagamento_recusado');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PaymentData>
            <Controller
                name={'pagamento.numero_cartao'}
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <TextFieldMask
                        {...inputProps}
                        mask={'9999 9999 9999 9999'}
                        label={'Número do cartão'}
                        style={{ gridArea: 'numero' }}
                        error={errors?.pagamento?.numero_cartao !== undefined}
                        helperText={errors?.pagamento?.numero_cartao?.message}
                    />
                )}
            />
            <TextField
                label={'Nome no cartão'}
                defaultValue={''}
                style={{ gridArea: 'nome' }}
                {...register('pagamento.nome_cartao')}
                error={errors?.pagamento?.nome_cartao?.message != undefined}
                helperText={errors?.pagamento?.nome_cartao?.message}
            />
            <Controller
                name={'pagamento.validade'}
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <TextFieldMask
                        {...inputProps}
                        mask={'99/99'}
                        label={'Validade do cartão'}
                        style={{ gridArea: 'validade' }}
                        error={errors?.pagamento?.validade !== undefined}
                        helperText={errors?.pagamento?.validade?.message}
                    />
                )}
            />
            <Controller
                name={'pagamento.codigo'}
                defaultValue={''}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <TextFieldMask
                        {...inputProps}
                        mask={'9999'}
                        label={'Código de verificação do cartão'}
                        style={{ gridArea: 'codigo' }}
                        error={errors?.pagamento?.codigo !== undefined}
                        helperText={errors?.pagamento?.codigo?.message}
                    />
                )}
            />
            {errors?.pagamento_recusado !== undefined && (
                <Typography
                    color={'error'}
                    sx={{ gridArea: 'error', textAlign: 'center' }}
                >
                    errors?.pagamento_recusado?.message
                </Typography>
            )}
        </PaymentData>
    );
};
