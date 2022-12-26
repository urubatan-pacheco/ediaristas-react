import { useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchemaService } from 'data/services/FormSchemaService';
import {
    CadastroClienteFormDataInterface,
    CredenciaisInterface,
    LoginFormDataInterface,
    NovaDiariaFormDataInterface,
    PagamentoFormDataInterface,
} from 'data/@types/FormInterface';
import { ServicoInterface } from 'data/@types/ServicoInterface';
import useApi, { useApiHateos } from '../useApi.hook';
import { DiariaInterface } from 'data/@types/DiariaInterface';
import { ValidationService } from 'data/services/ValidationService';
import { DateService } from 'data/services/DateService';
import { getSystemErrorMap } from 'util';
import { houseParts } from '@partials/encontrar-diarista/_detalhes-servico';
import { ExternalServicesContext } from 'data/contexts/ExternalServicesContext';
import {
    ApiService,
    ApiServiceHateoas,
    linksResolver,
} from 'data/services/ApiService';
import { AxiosError } from 'axios';
import { UserContext } from 'data/contexts/UserContext';
import { UserInterface, UserType } from 'data/@types/UserInterface';
import { TextFormnatService } from 'data/services/TextFormatService';
import { LoginService } from 'data/services/LoginService';
import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';
import { UserService } from 'data/services/UserServices';
import { CardInterface } from 'pagarme';
import { PaymentService } from '../../services/PaymentService';

export default function useContratacao() {
    const [step, setStep] = useState(1),
        [hasLogin, setHasLogin] = useState(false),
        [loginError, setLoginError] = useState(''),
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
        paymentForm = useForm<PagamentoFormDataInterface>({
            resolver: yupResolver(FormSchemaService.payment()),
        }),
        loginForm = useForm<LoginFormDataInterface<CredenciaisInterface>>({
            resolver: yupResolver(FormSchemaService.login()),
        }),
        { userState, userDispatch } = useContext(UserContext),
        { externalServicesState } = useContext(ExternalServicesContext),
        servicos = useApiHateos<ServicoInterface[]>(
            externalServicesState.externalServices,
            'listar_servicos'
        ).data,
        dadosFaxina = serviceForm.watch('faxina'),
        cepFaxina = serviceForm.watch('endereco.cep'),
        [podemosAtender, setPodemosAtender] = useState(false),
        [novaDiaria, setNovaDiaria] = useState({} as DiariaInterface),
        tipoLimpeza = useMemo<ServicoInterface>(() => {
            if (servicos && dadosFaxina?.servico) {
                const selectedService = servicos.find(
                    (servico) => servico.id === dadosFaxina?.servico
                );
                if (selectedService) {
                    return selectedService;
                }
            }

            return {} as ServicoInterface;
        }, [dadosFaxina?.servico, servicos]),
        { tamanhoCasa, totalPrice, totalTime } = useMemo<{
            tamanhoCasa: string[];
            totalPrice: number;
            totalTime: number;
        }>(() => {
            return {
                tamanhoCasa: listarComodos(dadosFaxina),
                totalPrice: calcularPreco(dadosFaxina, tipoLimpeza),
                totalTime: calcularTempoServico(
                    {
                        quantidade_banheiros: dadosFaxina?.quantidade_banheiros,
                        quantidade_cozinhas: dadosFaxina?.quantidade_cozinhas,
                        quantidade_outros: dadosFaxina?.quantidade_outros,
                        quantidade_quartos: dadosFaxina?.quantidade_quartos,
                        quantidade_quintais: dadosFaxina?.quantidade_quintais,
                        quantidade_salas: dadosFaxina?.quantidade_salas,
                    } as DiariaInterface,
                    tipoLimpeza
                ),
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [
            tipoLimpeza,
            dadosFaxina,
            dadosFaxina?.quantidade_banheiros,
            dadosFaxina?.quantidade_cozinhas,
            dadosFaxina?.quantidade_outros,
            dadosFaxina?.quantidade_quartos,
            dadosFaxina?.quantidade_quintais,
            dadosFaxina?.quantidade_salas,
        ]);

    useEffect(() => {
        if (
            dadosFaxina &&
            ValidationService.hora(dadosFaxina.hora_inicio) &&
            totalTime >= 0
        ) {
            serviceForm.setValue(
                'faxina.hora_inicio',
                dadosFaxina?.hora_inicio,
                {
                    shouldValidate: true,
                }
            );
            serviceForm.setValue(
                'faxina.data_atendimento',
                dadosFaxina?.data_atendimento,
                {
                    shouldValidate: true,
                }
            );

            serviceForm.setValue(
                'faxina.hora_termino',
                DateService.addHours(
                    dadosFaxina?.hora_inicio as string,
                    totalTime
                ),
                { shouldValidate: true }
            );
        } else {
            serviceForm.setValue('faxina.hora_termino', '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        totalTime,
        dadosFaxina?.data_atendimento,
        dadosFaxina?.hora_inicio,
        dadosFaxina?.hora_termino,
    ]);

    useEffect(() => {
        const cep = ((cepFaxina as string) ?? '').replace(/\D/g, ''); // somente digitos
        if (ValidationService.cep(cep)) {
            ApiServiceHateoas(
                externalServicesState.externalServices,
                'verificar_disponibilidade_atendimento',
                (request) => {
                    request<{ disponibilidade: boolean }>({
                        params: { cep },
                    })
                        .then(({ data }) => {
                            setPodemosAtender(data.disponibilidade);
                        })
                        .catch((_error) => setPodemosAtender(false));
                }
            );
        } else {
            setPodemosAtender(false);
        }
    }, [cepFaxina, externalServicesState.externalServices]);

    function onServiceFormSubmit(data: NovaDiariaFormDataInterface) {
        if (userState.user.nome_completo) {
            criarDiaria(userState.user);
        } else {
            setStep(2);
        }
    }

    async function onClientFormSubmit(data: CadastroClienteFormDataInterface) {
        const newUserLink = linksResolver(
            externalServicesState.externalServices,
            'cadastrar_usuario'
        );
        if (newUserLink) {
            try {
                await cadastrarUsuario(data, newUserLink);
            } catch (error) {
                console.log(error);
                UserService.handleNewUserError(error, clientForm);
            }
        }
    }

    async function cadastrarUsuario(
        data: CadastroClienteFormDataInterface,
        link: ApiLinksInterface
    ) {
        const newUser = await UserService.cadastrar(
            data.usuario,
            UserType.Cliente,
            link
        );
        if (newUser) {
            const loginSuccess = await login(
                {
                    email: data.usuario.email,
                    password: data.usuario.password ?? '',
                },
                newUser
            );
            if (loginSuccess) {
                criarDiaria(newUser);
            }
        }
    }

    async function onLoginFormSubmit(
        data: LoginFormDataInterface<CredenciaisInterface>
    ) {
        const loginSuccess = await login(data.login);
        if (loginSuccess) {
            const user = await LoginService.getUser();
            if (user) {
                criarDiaria(user);
                setStep(3);
            }
        }
    }

    async function login(
        credentials: CredenciaisInterface,
        user?: UserInterface
    ): Promise<boolean> {
        const loginSuccess = await LoginService.login(credentials);
        if (loginSuccess) {
            if (!user) {
                user = await LoginService.getUser();
            }
            userDispatch({ type: 'SET_USER', payload: user });
        } else {
            setLoginError('E-mail e/ou senha inválidos!');
        }

        return loginSuccess;
    }

    async function onPaymentFormSubmit(data: PagamentoFormDataInterface) {
        const cartao = {
            card_number: data.pagamento.numero_cartao.replaceAll(' ', ''),
            card_holder_name: data.pagamento.nome_cartao,
            card_cvv: data.pagamento.codigo,
            card_expiration_date: data.pagamento.validade,
        } as CardInterface;
        const hash = await PaymentService.getHash(cartao);
        ApiServiceHateoas(novaDiaria.links, 'pagar_diaria', async (request) => {
            try {
                await request({
                    data: {
                        card_hash: hash,
                    },
                });

                setStep(4);
            } catch (error) {
                paymentForm.setError('pagamento_recusado', {
                    type: 'manual',
                    message: 'Pagamento recusado!',
                });
            }
        });
    }

    function listarComodos(dadosFaxina: DiariaInterface): string[] {
        const comodos: string[] = [];
        if (dadosFaxina) {
            houseParts.forEach((housePart) => {
                const qnt_comodo = dadosFaxina[
                    housePart.name as keyof DiariaInterface
                ] as number;
                if (qnt_comodo > 0) {
                    const nome_comodo =
                        qnt_comodo > 1 ? housePart.plural : housePart.singular;
                    comodos.push(`${qnt_comodo} ${nome_comodo}`);
                }
            });
        }

        return comodos;
    }

    function calcularTempoServico(
        dadosFaxina: DiariaInterface,
        tipoLimpeza: ServicoInterface
    ) {
        let total = 0;
        if (dadosFaxina && tipoLimpeza) {
            total +=
                tipoLimpeza.horas_banheiro * dadosFaxina.quantidade_banheiros;
            total +=
                tipoLimpeza.horas_cozinha * dadosFaxina.quantidade_cozinhas;
            total += tipoLimpeza.horas_outros * dadosFaxina.quantidade_outros;
            total += tipoLimpeza.horas_quarto * dadosFaxina.quantidade_quartos;
            total +=
                tipoLimpeza.horas_quintal * dadosFaxina.quantidade_quintais;
            total += tipoLimpeza.horas_sala * dadosFaxina.quantidade_salas;
        }

        return total;
    }

    function calcularPreco(
        dadosFaxina: DiariaInterface,
        tipoLimpeza: ServicoInterface
    ) {
        let total = 0;
        if (dadosFaxina && tipoLimpeza) {
            total +=
                tipoLimpeza.valor_banheiro * dadosFaxina.quantidade_banheiros;
            total +=
                tipoLimpeza.valor_cozinha * dadosFaxina.quantidade_cozinhas;
            total += tipoLimpeza.valor_outros * dadosFaxina.quantidade_outros;
            total += tipoLimpeza.valor_quarto * dadosFaxina.quantidade_quartos;
            total +=
                tipoLimpeza.valor_quintal * dadosFaxina.quantidade_quintais;
            total += tipoLimpeza.valor_sala * dadosFaxina.quantidade_salas;
        }

        return Math.max(total, tipoLimpeza.valor_minimo);
    }

    async function criarDiaria(user: UserInterface) {
        if (user.nome_completo) {
            const serviceData = serviceForm.getValues();
            ApiServiceHateoas(
                user.links,
                'cadastrar_diaria',
                async (request) => {
                    //   try {
                    const novaDiaria = (
                        await request<DiariaInterface>({
                            data: {
                                ...serviceData.endereco,
                                ...serviceData.faxina,
                                cep: TextFormnatService.getNumbersFromText(
                                    serviceData.endereco.cep
                                ),
                                preco: totalPrice,
                                data_atendimento:
                                    TextFormnatService.reverseDate(
                                        serviceData.faxina
                                            .data_atendimento as string
                                    ) +
                                    'T' +
                                    serviceData.faxina.hora_inicio,
                                tempo_atendimento: totalTime,
                            },
                        })
                    ).data;

                    if (novaDiaria) {
                        setStep(3);
                        setNovaDiaria(novaDiaria);
                    }
                    //q    } catch (error) {}
                }
            );
        }
    }

    return {
        step,
        setStep,
        breadCrumbItems,
        serviceForm,
        clientForm,
        paymentForm,
        loginForm,
        onServiceFormSubmit,
        onClientFormSubmit,
        onPaymentFormSubmit,
        onLoginFormSubmit,
        servicos,
        podemosAtender,
        setPodemosAtender,
        hasLogin,
        loginError,
        tamanhoCasa,
        tipoLimpeza,
        totalPrice,
        setHasLogin,
    };
}
