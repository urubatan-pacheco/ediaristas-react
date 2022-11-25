import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchemaService } from 'data/services/FormSchemaService';
import { NovaDiariaFormDataInterface } from 'data/@types/FormInterface';

export default function useContratacao() {
    const [step, setStep] = useState(1),
        breadCrumbItems = ['Detalhes da diária', 'Identificação', 'Pagamento'],
        serviceForm = useForm<NovaDiariaFormDataInterface>({
            resolver: yupResolver(
                FormSchemaService.address().concat(
                    FormSchemaService.detalhesServico()
                )
            ),
        });

    return {
        step,
        breadCrumbItems,
    };
}
