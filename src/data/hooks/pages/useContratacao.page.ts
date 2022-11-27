import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchemaService } from 'data/services/FormSchemaService';
import {
    CadastroClienteFormDataInterface,
    NovaDiariaFormDataInterface,
} from 'data/@types/FormInterface';
import { ServicoInterface } from 'data/@types/ServicoInterface';

export default function useContratacao() {
    const [step, setStep] = useState(2),
        [hasLogin, setHasLogin] = useState(false),
        breadCrumbItems = ['Detalhes da diária', 'Identificação', 'Pagamento'],
        serviceForm = useForm<NovaDiariaFormDataInterface>({
            resolver: yupResolver(
                FormSchemaService.address().concat(
                    FormSchemaService.detalhesServico()
                )
            ),
        }),
        clientForm = useForm<CadastroClienteFormDataInterface>({
            resolver: yupResolver(
                FormSchemaService.userData().concat(
                    FormSchemaService.newContact()
                )
            ),
        }),
        servicos: ServicoInterface[] = [
            {
                id: 2,
                nome: 'Limpeza convencional',
                valor_minimo: 100.0,
                qtd_horas: 1,
                porcentagem_comissao: 10.0,
                horas_quarto: 1,
                valor_quarto: 20.0,
                horas_sala: 1,
                valor_sala: 20.0,
                horas_banheiro: 1,
                valor_banheiro: 20.0,
                horas_cozinha: 1,
                valor_cozinha: 20.0,
                horas_quintal: 1,
                valor_quintal: 20.0,
                horas_outros: 1,
                valor_outros: 20.0,
                icone: 'upf-cleaning-1',
                posicao: 1,
            },
            {
                id: 3,
                nome: 'Limpeza pesada',
                valor_minimo: 120.0,
                qtd_horas: 1.2,
                porcentagem_comissao: 10.0,
                horas_quarto: 1.2,
                valor_quarto: 30.0,
                horas_sala: 1.2,
                valor_sala: 30.0,
                horas_banheiro: 1.2,
                valor_banheiro: 30.0,
                horas_cozinha: 1.2,
                valor_cozinha: 30.0,
                horas_quintal: 1.2,
                valor_quintal: 30.0,
                horas_outros: 1.2,
                valor_outros: 30.0,
                icone: 'upf-cleaning-2',
                posicao: 2,
            },
            {
                id: 4,
                nome: 'Limpeza pós obra',
                valor_minimo: 150.0,
                qtd_horas: 1.5,
                porcentagem_comissao: 10.0,
                horas_quarto: 1.5,
                valor_quarto: 50.0,
                horas_sala: 1.5,
                valor_sala: 50.0,
                horas_banheiro: 1.5,
                valor_banheiro: 50.0,
                horas_cozinha: 1.5,
                valor_cozinha: 50.0,
                horas_quintal: 1.5,
                valor_quintal: 50.0,
                horas_outros: 1.5,
                valor_outros: 50.0,
                icone: 'upf-cleaning-3',
                posicao: 3,
            },
        ];

    function onServiceFormSubmit(data: NovaDiariaFormDataInterface) {
        console.log(data);
    }

    function onClientFormSubmit(data: CadastroClienteFormDataInterface) {
        console.log(data);
    }

    return {
        step,
        setStep,
        breadCrumbItems,
        serviceForm,
        clientForm,
        onServiceFormSubmit,
        onClientFormSubmit,
        servicos,
        hasLogin,
        setHasLogin,
    };
}
