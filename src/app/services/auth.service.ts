import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User, Payment } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private backendUrl = environment.backendUrl;

  currentUser = signal<User | null>(null);
  payments = signal<Payment[]>([]);

  constructor(private http: HttpClient, private router: Router) {
    this.loadSession();

    // Solo carga pagos si hay token y NO está expirado.
    // Si no hay sesión válida, limpia silenciosamente SIN redirigir.
    if (this.isSessionValid()) {
      this.loadPayments();
    } else {
      this.clearSession();
    }
  }

  // --- AUTH ---
  login(email: string, password: string) {
    return this.http.post<{ token: string; user: User }>(
      `${this.apiUrl}/login`,
      { email, password }
    ).pipe(
      tap(response => {
        this.saveSession(response.token, response.user);
        this.loadPayments();
      })
    );
  }

  register(name: string, email: string, password: string) {
    return this.http.post<{ token: string; user: User }>(
      `${this.apiUrl}/register`,
      { name, email, password }
    ).pipe(
      tap(response => {
        this.saveSession(response.token, response.user);
        this.loadPayments();
      })
    );
  }

  logout() {
    this.clearSession();
    // La app es pública → volvemos al dashboard, no al login
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem('gala_token');
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }

  // --- SESIÓN ---
  private saveSession(token: string, user: User) {
    localStorage.setItem('gala_token', token);
    localStorage.setItem('gala_user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  private clearSession() {
    localStorage.removeItem('gala_token');
    localStorage.removeItem('gala_user');
    this.currentUser.set(null);
    this.payments.set([]);
  }

  private loadSession() {
    const userJson = localStorage.getItem('gala_user');
    if (userJson) {
      try {
        this.currentUser.set(JSON.parse(userJson));
      } catch {
        this.clearSession();
      }
    }
  }

  /** Valida que el token exista y no esté expirado (sin ir al servidor) */
  private isSessionValid(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  private authHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
  }

  /**
   * Solo cerramos sesión si el token es inválido/expirado (401).
   * Un 403 significa "logueado pero sin permiso" → NO se desloguea.
   */
  private handleAuthError(err: any) {
    if (err?.status === 401) {
      this.logout();
    }
  }

  // --- PAGOS (usuario) ---
  registerPayment(stage: string, operationCode: string, file?: File) {
    const formData = new FormData();
    formData.append('stage', stage);
    formData.append('amount', '1');
    formData.append('operationCode', operationCode);
    if (file) formData.append('screenshot', file);

    return this.http.post<Payment>(
      `${this.apiUrl}/payments`,
      formData,
      { headers: this.authHeaders() }
    ).pipe(tap(() => this.loadPayments()));
  }

  loadPayments() {
    if (!this.isSessionValid()) {
      this.payments.set([]);
      return;
    }

    this.http.get<Payment[]>(
      `${this.apiUrl}/payments/my-payments`,
      { headers: this.authHeaders() }
    ).subscribe({
      next: (data) => this.payments.set(data),
      error: (err) => {
        this.handleAuthError(err);
        this.payments.set([]);
      }
    });
  }

  // --- ADMIN ---
  getAllPaymentsAdmin() {
    return this.http.get<Payment[]>(
      `${this.apiUrl}/admin/payments`,
      { headers: this.authHeaders() }
    );
  }

  approvePayment(id: string) {
    return this.http.put(
      `${this.apiUrl}/admin/payments/${id}/approve`,
      {},
      { headers: this.authHeaders() }
    ).pipe(tap(() => this.loadPayments()));
  }

  // --- HELPERS ---
  /** '/uploads/yape-xxx.jpg' → 'http://localhost:3000/uploads/yape-xxx.jpg' */
  getScreenshotUrl(screenshotPath: string | null | undefined): string {
    if (!screenshotPath) return '';
    if (screenshotPath.startsWith('http')) return screenshotPath;
    return `${this.backendUrl}${screenshotPath}`;
  }
}