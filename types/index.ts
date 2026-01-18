export interface ExpenseFormValues {
  custoEUR?: number | null;
  custoBRL?: number | null;
  data: Date;
  descricao: string;
  parcelado?: boolean;
  numeroParcelas?: number;
}

export interface Expense {
  id: string;
  custoEUR: number | null;
  custoBRL: number | null;
  data: Date;
  descricao: string;
  createdAt: Date;
  updatedAt: Date;
  parcelado: boolean;
  numeroParcelas: number | null;
  parcelaAtual: number | null;
  parcelamentoId: string | null;
  dataInicio: Date | null;
  dataFim: Date | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
