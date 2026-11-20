import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <div class="login-page">
      <div class="login-card">

        <!-- LOGO + TÍTULO -->
        <div class="brand">
          <div class="brand-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <h1 class="brand-title">GALA</h1>
          <p class="brand-sub">Academia de Cubos</p>
        </div>

        <h2 class="login-title">Bienvenido de vuelta</h2>
        <p class="login-subtitle">Inicia sesión para continuar tu aprendizaje.</p>

        <!-- FORM -->
        <form (ngSubmit)="onSubmit()" class="login-form">
          <div class="field">
            <label class="label">Correo electrónico</label>
            <div class="input-wrap">
              <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
              <input
                type="email"
                [(ngModel)]="email"
                name="email"
                placeholder="tucorreo@ejemplo.com"
                autocomplete="email"
                required
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Contraseña</label>
            <div class="input-wrap">
              <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input
                type="password"
                [(ngModel)]="password"
                name="password"
                placeholder="••••••••"
                autocomplete="current-password"
                required
              />
            </div>
          </div>

          <div *ngIf="errorMsg" class="inline-error">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {{ errorMsg }}
          </div>

          <button type="submit" class="btn-submit" [disabled]="loading">
            <span *ngIf="!loading">Entrar</span>
            <span *ngIf="loading">Ingresando...</span>
            <svg *ngIf="!loading" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </form>

        <p class="register-link">
          ¿No tienes cuenta?
          <a routerLink="/register">Regístrate aquí</a>
        </p>

      </div>
    </div>
  `,
  styles: [`
    /* ========================================================= */
    /* PÁGINA                                                    */
    /* ========================================================= */
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: linear-gradient(135deg, #eef2ff 0%, #f8fafc 50%, #fdf4ff 100%);
      font-family: 'Inter', sans-serif;
      box-sizing: border-box;
    }

    .login-card {
      width: 100%;
      max-width: 420px;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 40px 32px;
      box-shadow: 0 10px 40px rgba(15, 23, 42, 0.08), 0 2px 8px rgba(15, 23, 42, 0.04);
      box-sizing: border-box;
    }

    /* ========================================================= */
    /* BRAND                                                     */
    /* ========================================================= */
    .brand {
      text-align: center;
      margin-bottom: 28px;
    }
    .brand-icon {
      width: 56px;
      height: 56px;
      margin: 0 auto 12px auto;
      background: #eef2ff;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .brand-title {
      font-size: 26px;
      font-weight: 900;
      color: #4338ca;
      margin: 0;
      letter-spacing: -1px;
    }
    .brand-sub {
      font-size: 12px;
      color: #94a3b8;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin: 4px 0 0 0;
    }

    /* ========================================================= */
    /* TEXTOS                                                    */
    /* ========================================================= */
    .login-title {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 6px 0;
      text-align: center;
      line-height: 1.3;
    }
    .login-subtitle {
      font-size: 14px;
      color: #64748b;
      margin: 0 0 24px 0;
      text-align: center;
      line-height: 1.5;
    }

    /* ========================================================= */
    /* FORM                                                      */
    /* ========================================================= */
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .field { display: flex; flex-direction: column; }
    .label {
      font-size: 13px;
      font-weight: 600;
      color: #334155;
      margin-bottom: 6px;
    }

    .input-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }
    .input-icon {
      position: absolute;
      left: 14px;
      color: #94a3b8;
      pointer-events: none;
    }
    .input-wrap input {
      width: 100%;
      padding: 12px 14px 12px 42px;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      font-size: 14px;
      color: #0f172a;
      background: #ffffff;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.15s, box-shadow 0.15s;
      font-family: inherit;
    }
    .input-wrap input::placeholder { color: #cbd5e1; }
    .input-wrap input:focus {
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
    }

    /* ========================================================= */
    /* MENSAJE DE ERROR                                          */
    /* ========================================================= */
    .inline-error {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #fef2f2;
      color: #b91c1c;
      border: 1px solid #fecaca;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      line-height: 1.4;
    }

    /* ========================================================= */
    /* BOTÓN                                                     */
    /* ========================================================= */
    .btn-submit {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 13px;
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 10px;
      font-weight: 700;
      font-size: 15px;
      cursor: pointer;
      margin-top: 4px;
      transition: background 0.15s, transform 0.05s;
      font-family: inherit;
    }
    .btn-submit:hover:not(:disabled) { background: #4338ca; }
    .btn-submit:active:not(:disabled) { transform: scale(0.99); }
    .btn-submit:disabled {
      background: #a5b4fc;
      cursor: not-allowed;
    }

    /* ========================================================= */
    /* LINK REGISTRO                                             */
    /* ========================================================= */
    .register-link {
      text-align: center;
      font-size: 13px;
      color: #64748b;
      margin: 20px 0 0 0;
    }
    .register-link a {
      color: #4f46e5;
      font-weight: 600;
      text-decoration: none;
    }
    .register-link a:hover { text-decoration: underline; }

    /* ========================================================= */
    /* RESPONSIVE                                                */
    /* ========================================================= */
    @media (max-width: 480px) {
      .login-page { padding: 16px; }
      .login-card {
        padding: 28px 20px;
        border-radius: 16px;
      }
      .brand-icon { width: 48px; height: 48px; }
      .brand-title { font-size: 22px; }
      .login-title { font-size: 19px; }
      .login-subtitle { font-size: 13px; margin-bottom: 20px; }
      .input-wrap input { padding: 11px 12px 11px 40px; font-size: 14px; }
      .btn-submit { padding: 12px; font-size: 14px; }
    }

    @media (max-width: 360px) {
      .login-card { padding: 24px 16px; }
      .brand-title { font-size: 20px; }
      .login-title { font-size: 17px; }
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  errorMsg = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    this.errorMsg = '';

    if (!this.email.trim() || !this.password) {
      this.errorMsg = 'Ingresa tu correo y contraseña.';
      return;
    }

    this.loading = true;
    this.authService
      .login(this.email.trim().toLowerCase(), this.password)
      .subscribe({
        next: () => {
          this.loading = false;

          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
          } else if (this.authService.isAdmin()) {
            this.router.navigate(['/admin/pagos']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          this.loading = false;
          this.errorMsg = err.error?.message || 'Credenciales incorrectas. Intenta de nuevo.';
        }
      });
  }
}