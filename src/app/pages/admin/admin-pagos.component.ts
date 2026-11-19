import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Payment } from '../../models/user.model';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="admin-container">

      <!-- BARRA SUPERIOR: volver + salir -->
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

      <!-- ESTADOS -->
      <div *ngIf="loading" class="loading">Cargando pagos...</div>

      <div *ngIf="!loading && payments.length === 0" class="empty">
        Aún no hay pagos registrados.
      </div>

      <!-- TABLA -->
      <table class="payment-table" *ngIf="!loading && payments.length > 0">
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
              <span *ngIf="p.status === 'aprobado'" class="approved-text">✔ Aprobado</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .admin-container {
      padding: 24px 32px;
      max-width: 1200px;
      margin: 0 auto;
      font-family: 'Inter', sans-serif;
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
    }
    .btn-logout:hover { background: #e2e8f0; }

    /* --- HEADER --- */
    .admin-header { margin-bottom: 24px; }
    .admin-header h2 {
      font-size: 26px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 6px 0;
    }
    .admin-sub {
      font-size: 14px;
      color: #64748b;
      margin: 0;
    }

    /* --- ESTADOS --- */
    .loading {
      color: #64748b;
      font-size: 14px;
      padding: 20px 0;
    }
    .empty {
      color: #94a3b8;
      font-size: 14px;
      padding: 20px 0;
      font-style: italic;
      background: #f8fafc;
      border: 1px dashed #e2e8f0;
      border-radius: 12px;
      text-align: center;
    }

    /* --- TABLA --- */
    .payment-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    }
    .payment-table th,
    .payment-table td {
      border-bottom: 1px solid #e2e8f0;
      padding: 12px 14px;
      text-align: left;
      font-size: 13px;
    }
    .payment-table th {
      background: #f8fafc;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.5px;
    }
    .payment-table tbody tr:hover {
      background: #f8fafc;
    }
    .payment-table code {
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      color: #4338ca;
    }

    /* --- BADGES --- */
    .badge-success {
      background: #dcfce7;
      color: #166534;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
    }
    .badge-warning {
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
    }
    .btn-approve:hover:not(:disabled) { background: #3730a3; }
    .btn-approve:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .approved-text {
      color: #059669;
      font-size: 12px;
      font-weight: 600;
    }

    /* --- RESPONSIVE --- */
    @media (max-width: 768px) {
      .admin-container { padding: 16px; }
      .payment-table { font-size: 12px; display: block; overflow-x: auto; }
      .admin-user { display: none; }
    }
  `]
})
export class AdminPagosComponent implements OnInit {
  authService = inject(AuthService);  // público para usarlo en el template
  payments: Payment[] = [];
  loading = false;
  approvingId: string | null = null;

  ngOnInit() {
    this.loadPayments();
  }

  loadPayments() {
    this.loading = true;
    this.authService.getAllPaymentsAdmin().subscribe({
      next: (data) => {
        this.payments = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  approve(id: string) {
    this.approvingId = id;
    this.authService.approvePayment(id).subscribe({
      next: () => {
        this.approvingId = null;
        this.loadPayments();
      },
      error: () => {
        this.approvingId = null;
      }
    });
  }
}