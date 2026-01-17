export const VALIDATION_MESSAGES = {
  required: "Este campo é obrigatório",
  minValue: "O valor deve ser maior que 0",
  minLength: (min: number) => `Deve ter pelo menos ${min} caracteres`,
  maxLength: (max: number) => `Não pode ter mais de ${max} caracteres`,
  invalidCharacters: "Contém caracteres inválidos",
} as const;

export const FORM_RULES = {
  descricaoMinLength: 3,
  descricaoMaxLength: 200,
  minCurrencyValue: 0.01,
} as const;

export const DATE_FORMAT = "DD/MM/YYYY";

export const CURRENCY_SYMBOLS = {
  EUR: "€",
  BRL: "R$",
} as const;
