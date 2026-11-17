import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-access',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-header">
      <div class="tag-indigo">FRIDRICH · ACCESO POR ETAPAS</div>
      <h1 class="page-title">Tu siguiente nivel, a tu ritmo.</h1>
      <p class="page-subtitle">
        Desbloquea cada etapa del método Fridrich de forma individual. Paga S/ 1 por la etapa que quieras dominar y accede a sus algoritmos de por vida.
      </p>
    </div>

    <!-- GRILLA DE ETAPAS -->
    <div class="stages-grid">
      <div class="stage-card" *ngFor="let stage of stages" [class.unlocked]="isUnlocked(stage.name)">
        
        <!-- HEADER DE LA TARJETA -->
        <div class="stage-header">
          <div class="stage-icon" [ngClass]="stage.color">
            <!-- Iconos SVG para cada etapa -->
            <svg *ngIf="stage.name === 'Cruz eficiente'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M2 12h20"/></svg>
            <svg *ngIf="stage.name === 'F2L'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/><path d="M3 9h18"/></svg>
            <svg *ngIf="stage.name === 'OLL'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <svg *ngIf="stage.name === 'PLL'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
          </div>
          
          <!-- BADGE DE ESTADO -->
          <div class="status-badge" [class.unlocked-badge]="isUnlocked(stage.name)">
            <svg *ngIf="isUnlocked(stage.name)" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <svg *ngIf="!isUnlocked(stage.name)" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            {{ isUnlocked(stage.name) ? 'Desbloqueado' : 'Bloqueado' }}
          </div>
        </div>

        <h3 class="stage-title">{{ stage.name }}</h3>
        <p class="stage-desc">{{ stage.desc }}</p>
        
        <div class="stage-meta">
          <span class="meta-label">Incluye:</span>
          <span class="meta-value">{{ stage.algorithms }}</span>
        </div>

        <div class="stage-footer">
          <!-- BOTÓN DESBLOQUEADO -->
          <a *ngIf="isUnlocked(stage.name)" routerLink="/fridrich" class="btn-unlocked">
            Entrar a la etapa
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
          
          <!-- BOTÓN BLOQUEADO -->
          <a *ngIf="!isUnlocked(stage.name)" routerLink="/pagos" class="btn-locked">
            Pagar S/ 1 para acceder
          </a>
        </div>
      </div>
    </div>

    <!-- SECCIÓN DE AYUDA -->
    <div class="help-box">
      <div class="help-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      </div>
      <div class="help-content">
        <h4 class="help-title">¿Cómo funciona el acceso?</h4>
        <p class="help-desc">
          Cada etapa es independiente. Al realizar el pago vía Yape, el administrador validará tu operación (suele tardar unos minutos) y la etapa se desbloqueará automáticamente en tu cuenta. No necesitas pagar suscripciones mensuales, es un pago único por etapa.
        </p>
      </div>
    </div>
  `,
  styles: [`
    /* --- ESTILOS BASE --- */
    .page-header { margin-bottom: 40px; }
    .tag-indigo { font-size: 12px; font-weight: 700; color: #4f46e5; letter-spacing: 1.5px; margin-bottom: 8px; text-transform: uppercase; }
    .page-title { font-size: 36px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0; }
    .page-subtitle { font-size: 16px; color: #64748b; margin: 0; max-width: 800px; line-height: 1.6; }

    /* --- GRILLA DE ETAPAS --- */
    .stages-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }

    .stage-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
    }

    .stage-card:hover {
      box-shadow: 0 12px 30px rgba(0,0,0,0.06);
      border-color: #cbd5e1;
    }

    .stage-card.unlocked {
      border-color: #34d399;
      background: #f0fdf4;
    }

    /* --- HEADER DE LA TARJETA --- */
    .stage-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
    }

    .stage-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Colores por etapa */
    .stage-icon.color-blue { background: #eff6ff; color: #3b82f6; }
    .stage-icon.color-indigo { background: #eef2ff; color: #4f46e5; }
    .stage-icon.color-amber { background: #fffbeb; color: #d97706; }
    .stage-icon.color-emerald { background: #ecfdf5; color: #059669; }

    .status-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      gap: 4px;
      background: #f1f5f9;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status-badge.unlocked-badge {
      background: #d1fae5;
      color: #047857;
    }

    /* --- CONTENIDO DE LA TARJETA --- */
    .stage-title {
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 8px 0;
    }

    .stage-desc {
      font-size: 14px;
      color: #64748b;
      line-height: 1.5;
      margin: 0 0 20px 0;
      flex: 1; /* Empuja el footer hacia abajo */
    }

    .stage-meta {
      background: #f8fafc;
      padding: 12px;
      border-radius: 8px;
      font-size: 13px;
      margin-bottom: 24px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .meta-label { color: #94a3b8; font-weight: 500; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;}
    .meta-value { color: #334155; font-weight: 600; }

    /* --- BOTONES --- */
    .stage-footer {
      margin-top: auto;
    }

    .btn-unlocked {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: #10b981;
      color: white;
      padding: 12px;
      border-radius: 10px;
      font-weight: 600;
      text-decoration: none;
      font-size: 14px;
      transition: background 0.2s;
    }

    .btn-unlocked:hover { background: #059669; }

    .btn-locked {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #4f46e5;
      color: white;
      padding: 12px;
      border-radius: 10px;
      font-weight: 600;
      text-decoration: none;
      font-size: 14px;
      transition: background 0.2s;
    }

    .btn-locked:hover { background: #4338ca; }

    /* --- CAJA DE AYUDA --- */
    .help-box {
      background: #eef2ff;
      border: 1px solid #e0e7ff;
      border-radius: 16px;
      padding: 24px;
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }

    .help-icon {
      flex-shrink: 0;
    }

    .help-title {
      font-size: 16px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 6px 0;
    }

    .help-desc {
      font-size: 14px;
      color: #475569;
      line-height: 1.6;
      margin: 0;
    }
  `]
})
export class AccessComponent {
  auth = inject(AuthService);

  // Definición de las etapas
  stages = [
    { 
      name: 'Cruz eficiente', 
      desc: 'Aprende a planificar la cruz desde la inspección. Menos movimientos, mejor tiempo.',
      algorithms: '12 algoritmos esenciales',
      color: 'color-blue'
    },
    { 
      name: 'F2L', 
      desc: 'Las dos primeras capas emparejando esquinas y aristas sin romper la cruz.',
      algorithms: '41 casos de parejas',
      color: 'color-indigo'
    },
    { 
      name: 'OLL', 
      desc: 'Orientación de la última capa. Lleva todas las caras superiores a amarillo.',
      algorithms: '57 casos de orientación',
      color: 'color-amber'
    },
    { 
      name: 'PLL', 
      desc: 'Permutación de la última capa. El paso final para resolver el cubo.',
      algorithms: '21 casos de permutación',
      color: 'color-emerald'
    }
  ];

  // Verifica si el usuario ya pagó por esta etapa
  isUnlocked(stageName: string): boolean {
    // Busca si existe un pago con el nombre de la etapa y estado aprobado
    return this.auth.payments().some(p => p.stage === stageName && p.status === 'aprobado');
  }
}