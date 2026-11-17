import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  standalone: true,
  template: `
    <div class="page-header">
      <h1 class="page-title">Tu progreso, giro a giro.</h1>
      <p class="page-subtitle">0 de 13 lecciones y 0 de 86 algoritmos de práctica aprendidos.</p>
    </div>

    <div class="progress-card">
      <div class="percent">0 %</div>
      <div class="percent-label">del recorrido completado</div>
      
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width: 0%"></div>
      </div>
      
      <h2 class="section-title">Método principiante</h2>
      <p class="section-desc">0 de 9 completadas</p>
      
      <div class="lessons-grid">
        <div class="lesson-item">○ Conoce las piezas</div>
        <div class="lesson-item">○ Lee los movimientos</div>
        <div class="lesson-item">○ Construye la cruz blanca</div>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      margin-bottom: 32px;
    }
    .page-title {
      font-size: 30px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 8px 0;
    }
    .page-subtitle {
      font-size: 16px;
      color: #64748b;
      margin: 0;
    }

    .progress-card {
      background: white;
      padding: 32px;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
    }
    .percent {
      font-size: 48px;
      font-weight: 900;
      color: #4f46e5;
      margin-bottom: 4px;
    }
    .percent-label {
      font-size: 14px;
      color: #64748b;
      margin-bottom: 24px;
    }

    .progress-bar-bg {
      width: 100%;
      background: #f1f5f9;
      border-radius: 999px;
      height: 16px;
      margin-bottom: 32px;
      overflow: hidden;
    }
    .progress-bar-fill {
      background: #4f46e5;
      height: 100%;
      border-radius: 999px;
      transition: width 0.3s ease;
    }

    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 8px 0;
    }
    .section-desc {
      font-size: 14px;
      color: #64748b;
      margin-bottom: 16px;
    }

    .lessons-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    .lesson-item {
      border: 1px solid #e2e8f0;
      padding: 16px;
      border-radius: 12px;
      text-align: center;
      font-size: 14px;
      color: #64748b;
    }
  `]
})
export class ProgressComponent {}