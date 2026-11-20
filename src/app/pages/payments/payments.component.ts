import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="page-header">
      <h1 class="page-title">Registrar pago con Yape</h1>
      <p class="page-subtitle">
        Sube tu captura de Yape para que el administrador la valide.
      </p>
    </div>

    <!-- ============================================================ -->
    <!-- SIN SESIÓN: pedir login -->
    <!-- ============================================================ -->
    <div class="card login-required" *ngIf="!auth.currentUser()">
      <h2 class="card-title">Necesitas iniciar sesión</h2>
      <p class="login-desc">
        Para registrar tu pago y vincularlo a tu cuenta, primero inicia sesión o crea una cuenta.
      </p>
      <div class="login-actions">
        <a routerLink="/login" [queryParams]="{ returnUrl: '/pagos' }" class="btn-login-link">
          Iniciar sesión
        </a>
        <a routerLink="/register" [queryParams]="{ returnUrl: '/pagos' }" class="btn-register-link">
          Crear cuenta
        </a>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- CON SESIÓN: formulario de pago -->
    <!-- ============================================================ -->
    <div class="card form-card" *ngIf="auth.currentUser()">
      <h2 class="card-title">Pago por etapa - S/ 1</h2>

      <!-- QR / INFO YAPE -->
      <div class="yape-image-container">
        <img src="assets/pago/pago.jpg" alt="Captura de Yape" class="yape-image" />
      </div>

      <div class="yape-box">
        <div class="yape-label">Paga S/ 1 a:</div>
        <div class="yape-name">Victor Gabriel Pinedo Rioja</div>
        <div class="yape-number">Yape: +51 957 771 432</div>
      </div>

      <!-- Etapa -->
      <div class="form-group">
        <label class="form-label">Selecciona la etapa:</label>
        <select [(ngModel)]="selectedStage" class="form-select">
          <option value="Cruz eficiente">Cruz eficiente (S/ 1)</option>
          <option value="F2L">F2L - Dos primeras capas (S/ 1)</option>
          <option value="OLL">OLL - Orientación (S/ 1)</option>
          <option value="PLL">PLL - Permutación (S/ 1)</option>
        </select>
      </div>

      <!-- Código -->
      <div class="form-group">
        <label class="form-label">Código de operación Yape:</label>
        <input
          type="text"
          [(ngModel)]="operationCode"
          class="form-input"
          placeholder="Ej. 12345678"
          maxlength="20"
        />
      </div>

      <!-- Captura -->
      <div class="form-group">
        <label class="form-label">Captura de Yape:</label>
        <input
          #fileInput
          type="file"
          accept="image/*"
          (change)="onFileSelected($event)"
          class="form-input file-input"
        />
        <div *ngIf="previewUrl" class="preview-container">
          <img [src]="previewUrl" alt="Vista previa" class="preview-img" />
        </div>
      </div>

      <!-- Mensaje inline -->
      <div *ngIf="successMsg" class="inline-msg success">{{ successMsg }}</div>
      <div *ngIf="errorMsg" class="inline-msg error">{{ errorMsg }}</div>

      <button (click)="submitPayment(fileInput)" class="btn-primary" [disabled]="loading">
        {{ loading ? 'Enviando...' : 'Enviar pago para revisión' }}
      </button>

      <p class="disclaimer">
        Tu pago quedará como "Pendiente" hasta que el administrador valide la captura.
      </p>
    </div>

    <!-- ============================================================ -->
    <!-- HISTORIAL DE PAGOS DEL USUARIO -->
    <!-- ============================================================ -->
    <div class="card history-card" *ngIf="auth.currentUser()">
      <h2 class="card-title">Mis pagos registrados</h2>

      <div *ngIf="auth.payments().length === 0" class="empty">
        Aún no has registrado ningún pago.
      </div>

      <div class="table-wrap" *ngIf="auth.payments().length > 0">
        <table class="history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Etapa</th>
              <th>Código</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of auth.payments()">
              <td>{{ p.id }}</td>
              <td>{{ p.stage }}</td>
              <td><code>{{ p.operationCode }}</code></td>
              <td>S/ {{ p.amount }}</td>
              <td>{{ p.date }}</td>
              <td>
                <span [class]="p.status === 'aprobado' ? 'badge-success' : 'badge-warning'">
                  {{ p.status | uppercase }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    /* ========================================================= */
    /* BASE                                                      */
    /* ========================================================= */
    :host {
      display: block;
      font-family: 'Inter', sans-serif;
      box-sizing: border-box;
      padding: 24px 16px;
      max-width: 900px;
      margin: 0 auto;
    }

    *, *::before, *::after { box-sizing: border-box; }

    /* ========================================================= */
    /* HEADER                                                    */
    /* ========================================================= */
    .page-header { margin-bottom: 32px; }
    .page-title {
      font-size: 30px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 8px 0;
      line-height: 1.2;
    }
    .page-subtitle {
      font-size: 16px;
      color: #64748b;
      margin: 0;
      line-height: 1.5;
    }

    /* ========================================================= */
    /* CARDS                                                     */
    /* ========================================================= */
    .card {
      background: #ffffff;
      padding: 32px;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      width: 100%;
      margin: 0 auto 24px auto;
    }
    .form-card { max-width: 640px; }
    .card-title {
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 20px 0;
      line-height: 1.3;
    }

    /* ========================================================= */
    /* BANNER SIN SESIÓN                                         */
    /* ========================================================= */
    .login-required { text-align: center; max-width: 640px; }
    .login-desc {
      font-size: 15px;
      color: #64748b;
      margin: 0 0 24px 0;
      line-height: 1.6;
    }
    .login-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .btn-login-link, .btn-register-link {
      display: inline-block;
      padding: 12px 24px;
      border-radius: 10px;
      font-weight: 600;
      text-decoration: none;
      font-size: 14px;
      text-align: center;
      transition: background 0.15s, border-color 0.15s;
    }
    .btn-login-link {
      background: #ffffff;
      color: #4f46e5;
      border: 1px solid #c7d2fe;
    }
    .btn-login-link:hover { background: #eef2ff; }
    .btn-register-link {
      background: #4f46e5;
      color: #ffffff;
      border: 1px solid #4f46e5;
    }
    .btn-register-link:hover { background: #4338ca; border-color: #4338ca; }

    /* ========================================================= */
    /* YAPE                                                      */
    /* ========================================================= */
    .yape-image-container {
      display: flex;
      justify-content: center;
      margin-bottom: 24px;
    }
    .yape-image {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }

    .yape-box {
      background: #eef2ff;
      padding: 24px;
      border-radius: 12px;
      margin-bottom: 24px;
      text-align: center;
    }
    .yape-label {
      font-size: 14px;
      font-weight: 700;
      color: #4f46e5;
      margin-bottom: 8px;
    }
    .yape-name {
      font-size: 18px;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.4;
    }
    .yape-number {
      font-size: 14px;
      color: #64748b;
      margin-top: 6px;
    }

    /* ========================================================= */
    /* FORM                                                      */
    /* ========================================================= */
    .form-group { margin-bottom: 20px; }
    .form-label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #334155;
      margin-bottom: 8px;
    }
    .form-select, .form-input {
      display: block;
      width: 100%;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 12px;
      font-size: 14px;
      color: #0f172a;
      background: #ffffff;
      outline: none;
      font-family: inherit;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    .form-select:focus, .form-input:focus {
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
    }
    .file-input { padding: 10px; cursor: pointer; }

    .preview-container { margin-top: 14px; text-align: center; }
    .preview-img {
      max-width: 100%;
      max-height: 220px;
      border-radius: 10px;
      border: 1px solid #e2e8f0;
      object-fit: contain;
    }

    /* ========================================================= */
    /* BOTÓN                                                     */
    /* ========================================================= */
    .btn-primary {
      display: block;
      width: 100%;
      background: #4f46e5;
      color: #ffffff;
      padding: 13px;
      border-radius: 10px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      font-size: 15px;
      font-family: inherit;
      transition: background 0.15s;
    }
    .btn-primary:hover:not(:disabled) { background: #4338ca; }
    .btn-primary:disabled { background: #a5b4fc; cursor: not-allowed; }

    .disclaimer {
      font-size: 12px;
      color: #94a3b8;
      text-align: center;
      margin: 16px 0 0 0;
      line-height: 1.5;
    }

    /* ========================================================= */
    /* MENSAJES INLINE                                           */
    /* ========================================================= */
    .inline-msg {
      padding: 12px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 16px;
      text-align: center;
      line-height: 1.4;
    }
    .inline-msg.success { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
    .inline-msg.error { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

    /* ========================================================= */
    /* HISTORIAL                                                 */
    /* ========================================================= */
    .history-card { margin-top: 24px; }
    .empty {
      color: #94a3b8;
      font-size: 14px;
      font-style: italic;
      padding: 12px 0;
    }

    .table-wrap {
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      border-radius: 10px;
    }

    .history-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 520px;
    }
    .history-table th, .history-table td {
      border-bottom: 1px solid #e2e8f0;
      padding: 10px 12px;
      text-align: left;
      font-size: 13px;
      white-space: nowrap;
    }
    .history-table th {
      background: #f8fafc;
      text-transform: uppercase;
      font-size: 11px;
      color: #475569;
      letter-spacing: 0.5px;
      font-weight: 700;
    }
    .history-table code {
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      color: #4338ca;
    }
    .badge-success, .badge-warning {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
    }
    .badge-success { background: #dcfce7; color: #166534; }
    .badge-warning { background: #fef9c3; color: #854d0e; }

    /* ========================================================= */
    /* RESPONSIVE                                                */
    /* ========================================================= */
    @media (max-width: 720px) {
      :host { padding: 16px 12px; }
      .page-title { font-size: 24px; }
      .page-subtitle { font-size: 14px; }
      .card { padding: 24px 20px; border-radius: 14px; }
      .card-title { font-size: 18px; }
      .yape-box { padding: 20px; }
      .yape-name { font-size: 16px; }
    }

    @media (max-width: 480px) {
      :host { padding: 12px 8px; }
      .page-header { margin-bottom: 20px; }
      .page-title { font-size: 20px; }
      .card { padding: 20px 16px; border-radius: 12px; margin-bottom: 16px; }
      .login-actions { flex-direction: column; gap: 10px; }
      .btn-login-link, .btn-register-link { width: 100%; padding: 12px 16px; }
      .yape-box { padding: 16px; }
      .yape-name { font-size: 15px; }
      .form-select, .form-input { padding: 11px; font-size: 14px; }
      .btn-primary { padding: 12px; font-size: 14px; }
      .history-table { min-width: 460px; }
    }

    @media (max-width: 360px) {
      .card { padding: 16px 14px; }
      .page-title { font-size: 18px; }
      .yape-name { font-size: 14px; }
    }
  `]
})
export class PaymentsComponent {
  auth = inject(AuthService);

  selectedStage = 'Cruz eficiente';
  operationCode = '';
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  loading = false;

  successMsg = '';
  errorMsg = '';

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result as string);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  submitPayment(fileInput: HTMLInputElement) {
    this.successMsg = '';
    this.errorMsg = '';

    if (!this.auth.currentUser()) {
      this.errorMsg = 'Debes iniciar sesión para registrar un pago.';
      return;
    }

    if (!this.operationCode.trim()) {
      this.errorMsg = 'Ingresa el código de operación de Yape.';
      return;
    }

    if (!this.selectedFile) {
      this.errorMsg = 'Adjunta la captura de Yape para que el admin pueda validarlo.';
      return;
    }

    this.loading = true;
    this.auth
      .registerPayment(this.selectedStage, this.operationCode.trim(), this.selectedFile)
      .subscribe({
        next: () => {
          this.successMsg = `Pago por "${this.selectedStage}" enviado. Espera la validación del administrador.`;
          this.operationCode = '';
          this.selectedFile = null;
          this.previewUrl = null;
          fileInput.value = '';
          this.loading = false;
          // Recarga el historial para que aparezca el nuevo pago
          this.auth.loadPayments();
        },
        error: (err) => {
          this.errorMsg = err.error?.message || 'Error al registrar el pago.';
          this.loading = false;
        }
      });
  }
}