export const DateService = {
    addHours(startTime: string, hours: number): string {
        let [hour, minute] = startTime.split(':').map(Number);
        hour = Math.min(hour + hours, 23);

        const newHour = hour.toString().padStart(2, '0'),
            newMinute = minute.toString().padStart(2, '0');

        return `${newHour}:${newMinute}`;
    },
    minAdultBirthDay(): Date {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 18);
        return date;
    },
    maxAdultBirthDay(): Date {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 100);
        return date;
    },
    transformDate(value: any, originalValue: any): any {
        if (typeof originalValue === 'string') {
            const [dia, mes, ano] = originalValue.split('/');
            if (+mes < 1 || +mes > 12) {
                return new Date(''); // retorna um data qualquer
            }
            value = new Date(+ano, +mes - 1, +dia);
        }

        return value;
    },
};
