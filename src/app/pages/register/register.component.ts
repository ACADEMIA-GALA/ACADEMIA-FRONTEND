import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2 class="auth-title">Crea tu cuenta en GALA</h2>
        <p class="auth-sub">Desbloquea todos los ejemplos y vídeos del método Fridrich.</p>

        <form (ngSubmit)="onSubmit()">
          <label>Nombre completo</label>
          <input [(ngModel)]="name" name="name" placeholder="Tu nombre" required>

          <label>Correo electrónico</label>
          <input [(ngModel)]="email" name="email" type="email" placeholder="tucorreo@ejemplo.com" required>

          <label>Contraseña</label>
          <input [(ngModel)]="password" name="password" type="password" placeholder="Mínimo 6 caracteres" required>

          <button type="submit" class="btn-submit">Registrarme</button>
        </form>

        <p class="auth-footer">
          ¿Ya tienes cuenta? <a routerLink="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
      padding: 20px;
    }
    .auth-card {
      background: white;
      border-radius: 20px;
      border: 1px solid #e2e8f0;
      padding: 40px;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.05);
    }
    .auth-title { font-size: 26px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; }
    .auth-sub { font-size: 14px; color: #64748b; margin: 0 0 28px 0; line-height: 1.5; }
    label { display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px; }
    input {
      width: 100%;
      padding: 12px;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      margin-bottom: 18px;
      font-size: 14px;
      box-sizing: border-box;
      transition: border 0.2s;
    }
    input:focus { outline: none; border-color: #4f46e5; box-shadow: 0 0 0 3px #eef2ff; }
    .btn-submit {
      width: 100%;
      padding: 14px;
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 10px;
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-submit:hover { background: #4338ca; }
    .auth-footer { margin-top: 24px; font-size: 14px; color: #64748b; text-align: center; }
    .auth-footer a { color: #4f46e5; font-weight: 600; text-decoration: none; }
  `]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (this.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => alert(err.error?.message || 'Error al registrarse')
    });
  }
}