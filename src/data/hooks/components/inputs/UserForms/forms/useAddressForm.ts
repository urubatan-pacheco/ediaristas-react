import { CepResponse } from 'data/@types/EnderecoInterface';
import { FormValues } from 'data/@types/forms/FormValue';
import { UserContext } from 'data/contexts/UserContext';
import useCities from 'data/hooks/useCities.hook';
import { LocationService } from 'data/services/LocationService';
import { useContext, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

export default function useAddressForm() {
    const { userAddress, user } = useContext(UserContext).userState,
        {
            register,
            control,
            watch,
            setValue,
            formState: { errors },
        } = useFormContext<FormValues>(),
        [addressState, addressCity, addressCep] = watch([
            'endereco.estado',
            'endereco.cidade',
            'endereco.cep',
        ]),
        estados = LocationService.estados(),
        listaCidades = useCities(addressState),
        opcoesCidades = useMemo(
            () => listaCidades.map((item) => item.cidade),
            [listaCidades]
        );

    useEffect(() => {
        register('endereco.codigo_ibge');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (addressCity) {
            const cidade = listaCidades.find(
                (item) => item.cidade === addressCity
            );
            if (cidade) {
                setValue('endereco.codigo_ibge', cidade.codigo_ibge);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addressCity]);

    useEffect(() => {
        const cep = (addressCep || '').replaceAll('_', '');
        if (cep.length === 10) {
            LocationService.cep(cep).then((newAddress) => {
                if (newAddress) {
                    newAddress.uf && setValue('endereco.estado', newAddress.uf);
                    newAddress.localidade &&
                        setValue('endereco.cidade', newAddress.localidade);
                    newAddress.bairro &&
                        setValue('endereco.bairro', newAddress.bairro);
                    newAddress.logradouro &&
                        setValue('endereco.logradouro', newAddress.logradouro);
                    newAddress.ibge &&
                        setValue('endereco.codigo_ibge', +newAddress.ibge);
                    setValue('endereco.complemento', newAddress.complemento);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addressCep]);

    return {
        userAddress,
        user,
        control,
        errors,
        estados,
        opcoesCidades,
        addressState,
        addressCity,
        addressCep,
        register,
    };
}
