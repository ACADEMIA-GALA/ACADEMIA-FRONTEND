import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <h1 class="page-title">Mis pagos y accesos.</h1>
      <p class="page-subtitle">Consulta la revisión de tus yapes.</p>
    </div>

    <div class="grid-container">
      
      <!-- Lado Izquierdo: Simulador de Pago -->
      <div class="card">
        <h2 class="card-title">Pagar con Yape (Simulado)</h2>
        
        <!-- QR / CAPTURA DE YAPE -->
        <div class="yape-image-container">
          <img src="assets/pago/pago.jpg" alt="Captura de Yape" class="yape-image" />
        </div>

        <div class="yape-box">
          <div class="yape-label">Paga S/ 1 a:</div>
          <div class="yape-name">Victor Gabriel Pinedo Rioja</div>
          <div class="yape-number">Yape: +51 957 771 432</div>
        </div>

        <div class="form-group">
          <label class="form-label">Selecciona la etapa:</label>
          <select #stageSelect class="form-select">
            <option value="Cruz eficiente">Cruz eficiente (S/ 1)</option>
            <option value="F2L">F2L - Dos primeras capas (S/ 1)</option>
            <option value="OLL">OLL - Orientación (S/ 1)</option>
            <option value="PLL">PLL - Permutación (S/ 1)</option>
          </select>
        </div>

        <button (click)="simulatePayment(stageSelect.value)" class="btn-primary">
          Registrar Pago de S/ 1
        </button>
        
        <p class="disclaimer">
          Este es un simulador. En producción, aquí iría el número de operación.
        </p>
      </div>

      <!-- Lado Derecho: Historial de Pagos -->
      <div class="card">
        <div class="card-header">
          <h2 class="card-title" style="margin: 0;">Historial de Pagos</h2>
          <button (click)="auth.loadPayments()" class="btn-link">Actualizar ↻</button>
        </div>

        <div *ngIf="auth.payments().length === 0" class="empty-state">
          <div class="empty-icon">📭</div>
          <p>No tienes pagos registrados aún.</p>
        </div>

        <div class="payment-list">
          <div *ngFor="let payment of auth.payments()" class="payment-item">
            <div class="payment-info">
              <div class="payment-stage">{{ payment.stage }}</div>
              <div class="payment-meta">{{ payment.date }} · ID: {{ payment.id }}</div>
            </div>
            
            <div class="payment-amount-box">
              <div class="payment-amount">S/ {{ payment.amount }}.00</div>
              <div class="badge" [ngClass]="payment.status === 'aprobado' ? 'badge-success' : 'badge-warning'">
                {{ payment.status === 'aprobado' ? 'Aprobado ✓' : 'Pendiente ⏳' }}
              </div>
            </div>

            <!-- Botón para simular que el admin aprueba (para la exposición) -->
            <button *ngIf="payment.status === 'pendiente'" (click)="auth.approvePayment(payment.id)" class="btn-admin">
              Aprobar (Admin)
            </button>
          </div>
        </div>
      </div>
      
    </div>
  `,
  styles: [`
    /* --- ENCABEZADO --- */
    .page-header { margin-bottom: 32px; }
    .page-title { font-size: 30px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; }
    .page-subtitle { font-size: 16px; color: #64748b; margin: 0; }

    /* --- GRID PRINCIPAL --- */
    .grid-container { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }

    /* --- TARJETAS --- */
    .card { background: white; padding: 32px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .card-title { font-size: 20px; font-weight: 700; color: #0f172a; margin: 0 0 16px 0; }

    /* --- CAJA YAPE --- */
    .yape-box { background: #eef2ff; padding: 24px; border-radius: 12px; margin-bottom: 24px; text-align: center; }
    .yape-label { font-size: 14px; font-weight: 700; color: #4f46e5; margin-bottom: 8px; }
    .yape-name { font-size: 18px; font-weight: 700; color: #0f172a; }
    .yape-number { font-size: 14px; color: #64748b; margin-top: 4px; }

    /* --- IMAGEN DE YAPE --- */
    .yape-image-container {
      display: flex;
      justify-content: center;
      margin-bottom: 24px;
    }
    .yape-image {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      border: 1px solid #e2e8f0;
    }

    /* --- FORMULARIO --- */
    .form-group { margin-bottom: 24px; }
    .form-label { display: block; font-size: 14px; font-weight: 500; color: #334155; margin-bottom: 8px; }
    .form-select { width: 100%; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; font-size: 14px; color: #0f172a; background: white; outline: none; box-sizing: border-box; }
    .form-select:focus { border-color: #4f46e5; box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2); }

    /* --- BOTONES --- */
    .btn-primary { width: 100%; background: #4f46e5; color: white; padding: 12px; border-radius: 12px; font-weight: 700; border: none; cursor: pointer; transition: background 0.2s; font-size: 15px; }
    .btn-primary:hover { background: #4338ca; }
    .btn-link { background: none; border: none; color: #4f46e5; font-size: 14px; cursor: pointer; text-decoration: underline; padding: 0; }
    .btn-link:hover { color: #4338ca; }
    .btn-admin { margin-left: 16px; background: #e2e8f0; color: #334155; padding: 6px 12px; border-radius: 8px; font-size: 12px; border: none; cursor: pointer; transition: background 0.2s; }
    .btn-admin:hover { background: #cbd5e1; }

    /* --- DISCLAIMER --- */
    .disclaimer { font-size: 12px; color: #94a3b8; text-align: center; margin-top: 16px; }

    /* --- ESTADO VACÍO --- */
    .empty-state { text-align: center; padding: 40px 0; color: #94a3b8; }
    .empty-icon { font-size: 36px; margin-bottom: 8px; }

    /* --- LISTA DE PAGOS --- */
    .payment-list { display: flex; flex-direction: column; gap: 16px; }
    
    .payment-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border: 1px solid #f1f5f9;
      border-radius: 12px;
      background: #f8fafc;
    }
    
    .payment-stage { font-weight: 700; color: #0f172a; }
    .payment-meta { font-size: 12px; color: #64748b; margin-top: 2px; }
    .payment-amount-box { text-align: right; }
    .payment-amount { font-weight: 700; color: #0f172a; }
    .badge { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; margin-top: 4px; display: inline-block; }
    .badge-success { background: #dcfce7; color: #15803d; }
    .badge-warning { background: #fef3c7; color: #b45309; }
  `]
})
export class PaymentsComponent {
  auth = inject(AuthService);

  simulatePayment(stage: string) {
    this.auth.registerPayment(stage);
    alert(`Pago de S/ 1 por "${stage}" registrado. Estado: Pendiente de validación.`);
  }
}