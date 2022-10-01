export const ValidationService = {
  cep(cep: string): boolean {
    // 99.999-999 >removendo '.' e '-'> 99999999(8)
    // 99999999 >removendo '.' e '-'> 99999999(8)

    return cep.replace(/\D/g, '').length == 8;
  },
};
