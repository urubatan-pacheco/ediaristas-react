import { yupResolver } from '@hookform/resolvers/yup';
import {
    CredenciaisInterface,
    LoginFormDataInterface,
} from 'data/@types/FormInterface';
import { ExternalServicesContext } from 'data/contexts/ExternalServicesContext';
import { UserContext } from 'data/contexts/UserContext';
import { FormSchemaService } from 'data/services/FormSchemaService';
import { LoginService } from 'data/services/LoginService';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
export default function useLogin() {
    const formMethods = useForm<LoginFormDataInterface<CredenciaisInterface>>({
        resolver: yupResolver(FormSchemaService.login()),
    });
    const [errorMessage, setErrorMessage] = useState(''),
        { userDispatch } = useContext(UserContext),
        { externalServicesState } = useContext(ExternalServicesContext);
    async function onSubmit(
        data: LoginFormDataInterface<CredenciaisInterface>
    ) {
        setErrorMessage('');
        const loginSuccess = await LoginService.login(data.login);

        if (loginSuccess) {
            const user = await LoginService.getUser();
            userDispatch({ type: 'SET_USER', payload: user });
        } else {
            setErrorMessage('E-mail e/o senha inválidos!');
        }
    }
    return { externalServicesState, formMethods, errorMessage, onSubmit };
}
