export interface ExpenseFormValues {
  custoEUR: number;
  custoBRL: number;
  data: Date;
  descricao: string;
}

export interface Expense extends ExpenseFormValues {
  id: string;
  createdAt: Date;
  updatedAt: Date;
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
