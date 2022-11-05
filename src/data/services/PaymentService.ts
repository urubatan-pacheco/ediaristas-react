import pagarme, { CardInterface, CardValidateInterface } from 'pagarme';

export const PaymentService = {
    validade(card: CardInterface): CardValidateInterface {
        return pagarme.validate({ card }).card;
    },
};
