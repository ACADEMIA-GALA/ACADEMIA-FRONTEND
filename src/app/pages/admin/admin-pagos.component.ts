import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Payment } from '../../models/user.model';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="admin-container">

      <!-- BARRA SUPERIOR -->
      <div class="admin-topbar">
        <a routerLink="/" class="btn-back">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
               stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Volver al dashboard
        </a>

        <div class="topbar-right">
          <span class="admin-user">
            {{ authService.currentUser()?.name }}
          </span>
          <button class="btn-logout" (click)="authService.logout()">
            Salir
          </button>
        </div>
      </div>

      <!-- ENCABEZADO -->
      <div class="admin-header">
        <h2>Panel de Administración · Pagos Yape</h2>
        <p class="admin-sub">
          Revisa los pagos registrados por los alumnos y aprueba los que correspondan.
        </p>
      </div>

      <!-- CARGANDO -->
      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
        <span>Cargando pagos...</span>
      </div>

      <!-- ERROR (solo si no hay datos) -->
      <div *ngIf="!loading && errorMsg && payments.length === 0" class="error-box">
        <p>{{ errorMsg }}</p>
        <button class="btn-retry" (click)="loadPayments()">Reintentar</button>
      </div>

      <!-- VACÍO -->
      <div *ngIf="!loading && !errorMsg && payments.length === 0" class="empty">
        Aún no hay pagos registrados.
      </div>

      <!-- TABLA (no depende de errorMsg) -->
      <div class="table-wrap" *ngIf="!loading && payments.length > 0">
        <table class="payment-table">
          <thead>
            <tr>
              <th>ID Pago</th>
              <th>Usuario</th>
              <th>Etapa</th>
              <th>Monto</th>
              <th>Código Yape</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of payments">
              <td>{{ p.id }}</td>
              <td>{{ p.userName }}</td>
              <td>{{ p.stage }}</td>
              <td>S/ {{ p.amount }}</td>
              <td><code>{{ p.operationCode }}</code></td>
              <td>{{ p.date }}</td>
              <td>
                <span [class]="p.status === 'aprobado' ? 'badge-success' : 'badge-warning'">
                  {{ p.status | uppercase }}
                </span>
              </td>
              <td>
                <button *ngIf="p.status === 'pendiente'"
                        (click)="approve(p.id)"
                        [disabled]="approvingId === p.id"
                        class="btn-approve">
                  {{ approvingId === p.id ? 'Aprobando...' : 'Aprobar' }}
                </button>
                <span *ngIf="p.status === 'aprobado'" class="approved-text">Aprobado</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- MENSAJES DE ACCIÓN -->
      <div *ngIf="actionMsg" class="inline-msg success">{{ actionMsg }}</div>
      <div *ngIf="actionError" class="inline-msg error">{{ actionError }}</div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: 'Inter', sans-serif;
      box-sizing: border-box;
    }
    *, *::before, *::after { box-sizing: border-box; }

    .admin-container {
      padding: 24px 32px;
      max-width: 1200px;
      margin: 0 auto;
    }

    /* --- BARRA SUPERIOR --- */
    .admin-topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 28px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .btn-back {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: white;
      color: #4338ca;
      border: 1px solid #c7d2fe;
      padding: 8px 14px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 13px;
      text-decoration: none;
      transition: background 0.15s;
    }
    .btn-back:hover { background: #eef2ff; }

    .topbar-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .admin-user {
      font-size: 13px;
      font-weight: 500;
      color: #334155;
      max-width: 220px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .btn-logout {
      background: #f1f5f9;
      color: #334155;
      border: 1px solid #e2e8f0;
      padding: 8px 14px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      transition: background 0.15s;
      font-family: inherit;
    }
    .btn-logout:hover { background: #e2e8f0; }

    /* --- HEADER --- */
    .admin-header { margin-bottom: 24px; }
    .admin-header h2 {
      font-size: 26px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 6px 0;
      line-height: 1.3;
    }
    .admin-sub {
      font-size: 14px;
      color: #64748b;
      margin: 0;
      line-height: 1.5;
    }

    /* --- ESTADOS --- */
    .loading {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #64748b;
      font-size: 14px;
      padding: 24px 0;
    }
    .spinner {
      width: 22px;
      height: 22px;
      border: 3px solid #e2e8f0;
      border-top-color: #4f46e5;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .empty {
      color: #94a3b8;
      font-size: 14px;
      padding: 24px;
      font-style: italic;
      background: #f8fafc;
      border: 1px dashed #e2e8f0;
      border-radius: 12px;
      text-align: center;
    }

    .error-box {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #b91c1c;
      padding: 20px;
      border-radius: 12px;
      font-size: 14px;
      text-align: center;
    }
    .error-box p { margin: 0 0 12px 0; }
    .btn-retry {
      background: #4f46e5;
      color: white;
      border: none;
      padding: 8px 20px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      font-family: inherit;
    }
    .btn-retry:hover { background: #4338ca; }

    /* --- TABLA --- */
    .table-wrap {
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      border-radius: 12px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    }
    .payment-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      min-width: 760px;
    }
    .payment-table th,
    .payment-table td {
      border-bottom: 1px solid #e2e8f0;
      padding: 12px 14px;
      text-align: left;
      font-size: 13px;
      white-space: nowrap;
    }
    .payment-table th {
      background: #f8fafc;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.5px;
    }
    .payment-table tbody tr:hover { background: #f8fafc; }
    .payment-table code {
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      color: #4338ca;
    }

    /* --- BADGES --- */
    .badge-success {
      display: inline-block;
      background: #dcfce7;
      color: #166534;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
    }
    .badge-warning {
      display: inline-block;
      background: #fef9c3;
      color: #854d0e;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
    }

    /* --- BOTÓN APROBAR --- */
    .btn-approve {
      background: #4338ca;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
      transition: background 0.15s;
      font-family: inherit;
    }
    .btn-approve:hover:not(:disabled) { background: #3730a3; }
    .btn-approve:disabled { opacity: 0.6; cursor: not-allowed; }
    .approved-text {
      color: #059669;
      font-size: 12px;
      font-weight: 600;
    }

    /* --- MENSAJES INLINE --- */
    .inline-msg {
      padding: 12px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      margin-top: 16px;
      text-align: center;
    }
    .inline-msg.success { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
    .inline-msg.error { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

    /* --- RESPONSIVE --- */
    @media (max-width: 768px) {
      .admin-container { padding: 16px; }
      .admin-header h2 { font-size: 20px; }
      .admin-user { display: none; }
      .payment-table { min-width: 640px; }
    }
    @media (max-width: 480px) {
      .admin-container { padding: 12px; }
      .admin-header h2 { font-size: 18px; }
      .btn-back { font-size: 12px; padding: 7px 12px; }
      .btn-logout { font-size: 12px; padding: 7px 12px; }
    }
  `]
})
export class AdminPagosComponent implements OnInit {
  authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  payments: Payment[] = [];
  loading = true;
  errorMsg = '';
  actionMsg = '';
  actionError = '';
  approvingId: string | null = null;

  ngOnInit() {
    this.loadPayments();
  }

  loadPayments() {
    this.loading = true;
    this.errorMsg = '';
    this.actionMsg = '';
    this.actionError = '';

    console.log('[AdminPagos] Iniciando loadPayments...');
    console.log('[AdminPagos] Token:', this.authService.getToken());
    console.log('[AdminPagos] currentUser:', this.authService.currentUser());

    this.authService.getAllPaymentsAdmin().pipe(
      timeout(10000),
      catchError((err) => {
        console.error('[AdminPagos] Error capturado:', err);
        console.error('[AdminPagos] Status:', err?.status);
        console.error('[AdminPagos] Message:', err?.message);
        console.error('[AdminPagos] Error body:', err?.error);

        if (err.name === 'TimeoutError') {
          this.errorMsg = 'La petición tardó demasiado. Verifica que el backend esté corriendo.';
        } else if (err.status === 401) {
          this.errorMsg = 'Sesión expirada. Vuelve a iniciar sesión.';
        } else if (err.status === 403) {
          this.errorMsg = 'No tienes permisos de administrador.';
        } else if (err.status === 0) {
          this.errorMsg = 'No se pudo conectar con el servidor. Verifica que el backend esté activo.';
        } else {
          this.errorMsg = err.error?.message || 'Error al cargar los pagos.';
        }
        this.loading = false;
        this.cdr.detectChanges();
        return of([]);
      })
    ).subscribe({
      next: (data) => {
        console.log('[AdminPagos] Datos recibidos:', data);
        console.log('[AdminPagos] Cantidad:', data?.length);
        console.log('[AdminPagos] errorMsg antes:', JSON.stringify(this.errorMsg));
        this.payments = data || [];
        this.loading = false;
        console.log('[AdminPagos] payments.length:', this.payments.length);
        console.log('[AdminPagos] errorMsg después:', JSON.stringify(this.errorMsg));
        this.cdr.detectChanges();
      },
      complete: () => {
        console.log('[AdminPagos] Observable completado. loading =', this.loading);
      }
    });
  }

  approve(id: string) {
    this.actionMsg = '';
    this.actionError = '';
    this.approvingId = id;

    this.authService.approvePayment(id).subscribe({
      next: () => {
        this.actionMsg = `Pago ${id} aprobado correctamente.`;
        this.approvingId = null;
        this.cdr.detectChanges();
        this.loadPayments();
      },
      error: (err) => {
        console.error('[AdminPagos] Error al aprobar:', err);
        this.actionError = err.error?.message || 'No se pudo aprobar el pago.';
        this.approvingId = null;
        this.cdr.detectChanges();
      }
    });
  }
}