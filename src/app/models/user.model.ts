export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Payment {
  id: string;
  userId: number;
  userName: string;
  stage: string;
  amount: number;
  date: string;
  status: 'pendiente' | 'aprobado';
  operationCode: string;
  screenshot?: string | null;
}