import { Injectable, signal } from '@angular/core';
import { User, Payment } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Usuario por defecto solicitado
  currentUser = signal<User | null>({
    name: 'VICTOR GABRIEL PINEDO RIOJA',
    email: 'victor@galacubos.com'
  });

  payments = signal<Payment[]>([]);

  constructor() {
    this.loadPayments();
  }

  // Simula el inicio de sesión (ya está logueado por defecto)
  login() {
    this.currentUser.set({
      name: 'VICTOR GABRIEL PINEDO RIOJA',
      email: 'victor@galacubos.com'
    });
  }

  logout() {
    this.currentUser.set(null);
  }

  // Simula el registro de un pago
  registerPayment(stage: string) {
    const newPayment: Payment = {
      id: Math.random().toString(36).substring(2, 9).toUpperCase(),
      stage: stage,
      amount: 1,
      date: new Date().toLocaleDateString(),
      status: 'pendiente' // Queda pendiente hasta que "el admin" lo apruebe
    };
    this.payments.update(p => [...p, newPayment]);
    this.savePayments();
  }

  // Simula la aprobación del pago (para la exposición)
  approvePayment(id: string) {
    this.payments.update(payments =>
      payments.map(p => p.id === id ? { ...p, status: 'aprobado' } : p)
    );
    this.savePayments();
  }

  // ✅ Ahora es público: el componente lo puede llamar desde el template
  loadPayments() {
    const saved = localStorage.getItem('gala_payments');
    if (saved) {
      this.payments.set(JSON.parse(saved));
    }
  }

  private savePayments() {
    localStorage.setItem('gala_payments', JSON.stringify(this.payments()));
  }
}