const CurrencyFormater = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export const TextFormnatService = {
    reverseDate(date: string): string {
        if (date.includes('/')) {
            return date.split('/').reverse().join('-');
        }

        if (date.includes('T')) {
            [date] = date.split('T');
        }

        return date.split('-').reverse().join('/');
    },
    getNumbersFromText(text = ''): string {
        return text.replace(/\D/g, '');
    },
    dateToString(date: Date, withTime = false) {
        const time = date.toISOString();
        if (withTime) {
            return time.substring(0, 19); // 2000-00-00T00:00:00*Z
        } else {
            return time.substring(0, 10); // 2000-00-00*T00:00:00Z
        }
    },
    currency(price = 0): string {
        if (isNaN(price)) {
            price = 0;
        }
        return CurrencyFormater.format(price);
    },
};
