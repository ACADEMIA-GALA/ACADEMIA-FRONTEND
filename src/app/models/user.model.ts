export interface User {
  name: string;
  email: string;
}

export interface Payment {
  id: string;
  stage: string;
  amount: number;
  date: string;
  status: 'pendiente' | 'aprobado';
}