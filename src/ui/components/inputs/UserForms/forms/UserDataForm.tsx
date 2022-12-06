import { Controller, useFormContext } from 'react-hook-form';
import { string } from 'yup';
import TextFieldMask from '../../TextFieldMask/TextFieldMask';
import TextField from '../../TextField/TextField';
import { UsertData } from '../UserForms.style';
import { FormValues } from 'data/@types/forms/FormValue';
import { useContext } from 'react';
import { UserContext } from 'data/contexts/UserContext';
import { TextFormnatService } from 'data/services/TextFormatService';

export interface UserDataFormProps {
    cadastro?: boolean;
}

export const UserDataForm: React.FC<UserDataFormProps> = ({
    cadastro = false,
}) => {
    const {
            register,
            formState: { errors },
            control,
        } = useFormContext<FormValues>(),
        { user } = useContext(UserContext).userState;

    return (
        <UsertData>
            <TextField
                label={'Nome completo'}
                defaultValue={user.nome_completo}
                style={{ gridArea: 'nome' }}
                {...register('usuario.nome_completo')}
                error={errors?.usuario?.nome_completo?.message != undefined}
                helperText={errors?.usuario?.nome_completo?.message}
            />
            <Controller
                name={'usuario.nascimento'}
                defaultValue={TextFormnatService.reverseDate(
                    user.nascimento as string
                )}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <TextFieldMask
                        {...inputProps}
                        mask={'99/99/9999'}
                        label={'Data de nascimento'}
                        style={{ gridArea: 'data-nascimento' }}
                        error={
                            errors?.usuario?.nascimento?.message != undefined
                        }
                        helperText={errors?.usuario?.nascimento?.message}
                    />
                )}
            />
            <Controller
                name={'usuario.cpf'}
                defaultValue={user.cpf}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <TextFieldMask
                        {...inputProps}
                        mask={'9999.999.99-99'}
                        label={'CPF'}
                        style={{ gridArea: 'cpf' }}
                        error={errors?.usuario?.cpf?.message != undefined}
                        helperText={errors?.usuario?.cpf?.message}
                        InputProps={{ readOnly: !cadastro }}
                    />
                )}
            />
            <Controller
                name={'usuario.telefone'}
                defaultValue={user.telefone}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <TextFieldMask
                        {...inputProps}
                        mask={'(99) 99999-9999'}
                        label={'Telefone'}
                        style={{ gridArea: 'telefone' }}
                        error={errors?.usuario?.telefone?.message != undefined}
                        helperText={errors?.usuario?.telefone?.message}
                    />
                )}
            />
        </UsertData>
    );
};
