import * as yup from 'yup';
import { DateService } from './DateService';
import { PaymentService } from './PaymentService';
import { ValidationService } from './ValidationService';

export const FormSchemaService = {
    userData() {
        return yup
            .object()
            .shape({
                usuario: yup
                    .object()
                    .shape({
                        nome: yup.string().min(3, 'Digite seu nome completo'),
                        nascimento: yup
                            .date()
                            .transform(DateService.transformDate)
                            .min(
                                DateService.maxAdultBirthDay(),
                                'Digite uma data válida'
                            )
                            .max(
                                DateService.minAdultBirthDay(),
                                'Proibido menores de idade'
                            )
                            .typeError('Digite uma data válida'),
                        cpf: yup
                            .string()
                            .test('cpf', 'CPF inválido', ValidationService.cpf),
                        telefone: yup
                            .string()
                            .test(
                                'telefone',
                                'Telefone inválido',
                                ValidationService.telefone
                            ),
                    })
                    .defined(),
            })
            .defined();
    },
    newContact() {
        return yup
            .object()
            .shape({
                usuario: yup.object().shape({
                    email: yup.string().email('E-mail inválido'),
                    password: yup.string().min(5, 'Senha muito curta'),
                    password_confirmation: yup
                        .string()
                        .min(5, 'Senha muito curta')
                        .oneOf(
                            [yup.ref('password'), null],
                            'As senhas não estão iguais'
                        ),
                }),
            })
            .defined();
    },
    payment() {
        return yup
            .object()
            .shape({
                pagamento: yup.object().shape({
                    nome_cartao: yup.string(),
                    card_number: yup
                        .string()
                        .test(
                            'card_number',
                            'Número de cartão inválido',
                            (value) => {
                                return PaymentService.validade({
                                    card_number: value as string,
                                    card_holder_name: '',
                                    card_expiration_date: '',
                                    card_cvv: '',
                                }).card_number;
                            }
                        ),
                    validade: yup
                        .string()
                        .test(
                            'card_number',
                            'Data de validade inválida',
                            (value) => {
                                return PaymentService.validade({
                                    card_number: '',
                                    card_holder_name: '',
                                    card_expiration_date: value as string,
                                    card_cvv: '',
                                }).card_expiration_date;
                            }
                        ),
                    codigo: yup
                        .string()
                        .test(
                            'card_cvv',
                            'Código de validação inválido',
                            (value) => {
                                return PaymentService.validade({
                                    card_number: '',
                                    card_holder_name: '',
                                    card_expiration_date: '',
                                    card_cvv: value as string,
                                }).card_cvv;
                            }
                        ),
                }),
            })
            .defined();
    },
    address() {
        return yup
            .object()
            .shape({
                endereco: yup.object().shape({
                    cep: yup
                        .string()
                        .test('cep', 'CEP inválido', (value) =>
                            ValidationService.cep(value)
                        ),
                    estado: yup.string(),
                    cidade: yup.string(),
                    bairro: yup.string(),
                    logradouro: yup.string(),
                    numero: yup.string(),
                    complemento: yup
                        .string()
                        .nullable()
                        .default(undefined)
                        .notRequired(),
                }),
            })
            .defined();
    },
    detalhesServico() {
        return yup
            .object()
            .shape({
                data_atendimento: yup
                    .date()
                    .transform(DateService.transformDate)
                    .typeError('Digite uma data válida')
                    .test(
                        'antecendencia',
                        'O agendamento deve ser feito com pelo menos 48 horas de antecedencia',
                        (value, data) => {
                            if (typeof value === 'object') {
                                return ValidationService.horarioDeAgendamento(
                                    value.toJSON().substring(0, 10),
                                    data.parent.hora_inicio as string
                                );
                            }
                            return false;
                        }
                    ),
                hora_inicio: yup
                    .string()
                    .test('hora_valida', 'Digite uma hora válida', (value) =>
                        ValidationService.hora(value)
                    )
                    .test(
                        'hora_inicio',
                        'O serviço não deve começar antes das 06:00',
                        (value) => {
                            const [hora] = value?.split(':') || [''];
                            return +hora >= 6;
                        }
                    ),
                hora_termino: yup
                    .string()
                    .test(
                        'hora_termino',
                        'O serviço não pode encerrar após as 22:00',
                        (value) => {
                            const [hora, minuto] = value?.split(':') || [
                                '',
                                '',
                            ];
                            if (+hora < 22) {
                                return true;
                            } else if (+hora === 22) {
                                return +minuto === 0;
                            }

                            return false;
                        }
                    )
                    .test(
                        'tempo_servico',
                        'O serviço não deve durar mais de 8h',
                        (value, data) => {
                            const [horaTermino] = value?.split(':') || [''],
                                [horaInicio] = data.parent.hora_inicio?.split(
                                    ':'
                                ) || [''];

                            return +horaTermino - +horaInicio <= 8;
                        }
                    ),
            })
            .defined();
    },
};