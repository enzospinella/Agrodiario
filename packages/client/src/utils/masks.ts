// src/utils/masks.ts

// Remove todos os caracteres que não são dígitos
const clean = (value: string) => {
    return value.replace(/\D/g, '');
  };
  
  export const cpfMask = (value: string) => {
    return clean(value)
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2');
  };
  
  export const dateMask = (value: string) => {
    return clean(value)
      .slice(0, 8)
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d{1,4})/, '$1/$2');
  };
  
  export const phoneMask = (value: string) => {
    const cleaned = clean(value).slice(0, 11);
    if (cleaned.length <= 10) {
      // Fixo (XX) XXXX-XXXX
      return cleaned
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d{1,4})/, '$1-$2');
    } else {
      // Celular (XX) XXXXX-XXXX
      return cleaned
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{1,4})/, '$1-$2');
    }
  };