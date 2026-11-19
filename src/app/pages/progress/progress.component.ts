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
      <div class="percent-block">
        <div class="percent">0 %</div>
        <div class="percent-label">del recorrido completado</div>
      </div>

      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width: 0%"></div>
      </div>

      <div class="section">
        <h2 class="section-title">Método principiante</h2>
        <p class="section-desc">0 de 9 completadas</p>

        <div class="lessons-grid">
          <div class="lesson-item">
            <svg class="lesson-icon pending" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/></svg>
            <span>Conoce las piezas</span>
          </div>
          <div class="lesson-item">
            <svg class="lesson-icon pending" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/></svg>
            <span>Lee los movimientos</span>
          </div>
          <div class="lesson-item">
            <svg class="lesson-icon pending" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/></svg>
            <span>Construye la cruz blanca</span>
          </div>
          <div class="lesson-item">
            <svg class="lesson-icon pending" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/></svg>
            <span>Inserta las esquinas</span>
          </div>
          <div class="lesson-item">
            <svg class="lesson-icon pending" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/></svg>
            <span>Segunda capa</span>
          </div>
          <div class="lesson-item">
            <svg class="lesson-icon pending" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/></svg>
            <span>Cruz amarilla</span>
          </div>
          <div class="lesson-item">
            <svg class="lesson-icon pending" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/></svg>
            <span>Orientar esquinas</span>
          </div>
          <div class="lesson-item">
            <svg class="lesson-icon pending" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/></svg>
            <span>Colocar esquinas</span>
          </div>
          <div class="lesson-item">
            <svg class="lesson-icon pending" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/></svg>
            <span>Últimos ajustes</span>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Fridrich · CFOP</h2>
        <p class="section-desc">0 de 4 etapas desbloqueadas</p>

        <div class="lessons-grid">
          <div class="lesson-item locked">
            <svg class="lesson-icon lock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>Cruz eficiente</span>
          </div>
          <div class="lesson-item locked">
            <svg class="lesson-icon lock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>F2L</span>
          </div>
          <div class="lesson-item locked">
            <svg class="lesson-icon lock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>OLL</span>
          </div>
          <div class="lesson-item locked">
            <svg class="lesson-icon lock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>PLL</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* ========================================================= */
    /* BASE                                                      */
    /* ========================================================= */
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }
    * { box-sizing: border-box; }

    .page-header {
      margin-bottom: 28px;
      padding: 0 4px;
    }
    .page-title {
      font-size: 30px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 8px 0;
      line-height: 1.2;
      word-wrap: break-word;
    }
    .page-subtitle {
      font-size: 15px;
      color: #64748b;
      margin: 0;
      line-height: 1.5;
    }

    /* ========================================================= */
    /* TARJETA PRINCIPAL                                         */
    /* ========================================================= */
    .progress-card {
      background: white;
      padding: 32px;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      width: 100%;
      overflow: hidden;
    }

    .percent-block { margin-bottom: 16px; }
    .percent {
      font-size: 48px;
      font-weight: 900;
      color: #4f46e5;
      margin-bottom: 4px;
      line-height: 1;
    }
    .percent-label {
      font-size: 14px;
      color: #64748b;
    }

    /* ========================================================= */
    /* BARRA DE PROGRESO                                         */
    /* ========================================================= */
    .progress-bar-bg {
      width: 100%;
      background: #f1f5f9;
      border-radius: 999px;
      height: 14px;
      margin-bottom: 32px;
      overflow: hidden;
    }
    .progress-bar-fill {
      background: #4f46e5;
      height: 100%;
      border-radius: 999px;
      transition: width 0.3s ease;
      min-width: 0;
    }

    /* ========================================================= */
    /* SECCIONES                                                 */
    /* ========================================================= */
    .section {
      margin-top: 28px;
      padding-top: 24px;
      border-top: 1px solid #f1f5f9;
    }
    .section:first-of-type {
      border-top: none;
      padding-top: 0;
      margin-top: 0;
    }
    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 6px 0;
      line-height: 1.3;
    }
    .section-desc {
      font-size: 14px;
      color: #64748b;
      margin: 0 0 18px 0;
    }

    /* ========================================================= */
    /* GRID DE LECCIONES (responsive)                            */
    /* ========================================================= */
    .lessons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 12px;
    }

    .lesson-item {
      display: flex;
      align-items: center;
      gap: 10px;
      border: 1px solid #e2e8f0;
      padding: 14px 16px;
      border-radius: 12px;
      font-size: 14px;
      color: #475569;
      background: #f8fafc;
      line-height: 1.4;
      word-wrap: break-word;
      transition: background 0.15s, border-color 0.15s;
    }
    .lesson-item:hover {
      background: #f1f5f9;
      border-color: #cbd5e1;
    }

    .lesson-item.locked {
      color: #94a3b8;
      background: #f8fafc;
      border-style: dashed;
    }

    /* ========================================================= */
    /* ICONOS SVG                                                */
    /* ========================================================= */
    .lesson-icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .lesson-icon.pending { color: #94a3b8; }
    .lesson-icon.lock { color: #94a3b8; }
    .lesson-icon.done { color: #059669; }

    /* ========================================================= */
    /* RESPONSIVE                                                */
    /* ========================================================= */

    /* Tablet grande */
    @media (max-width: 1024px) {
      .progress-card { padding: 28px; }
      .page-title { font-size: 26px; }
    }

    /* Tablet */
    @media (max-width: 768px) {
      .page-header { margin-bottom: 20px; }
      .page-title { font-size: 22px; }
      .page-subtitle { font-size: 14px; }

      .progress-card {
        padding: 20px;
        border-radius: 14px;
      }
      .percent { font-size: 38px; }
      .percent-label { font-size: 13px; }
      .progress-bar-bg { height: 12px; margin-bottom: 24px; }

      .section { margin-top: 22px; padding-top: 20px; }
      .section-title { font-size: 18px; }
      .section-desc { font-size: 13px; margin-bottom: 14px; }

      .lessons-grid {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 10px;
      }
      .lesson-item {
        padding: 12px 14px;
        font-size: 13px;
      }
      .lesson-icon { width: 16px; height: 16px; }
    }

    /* Móvil */
    @media (max-width: 480px) {
      .page-header { margin-bottom: 16px; }
      .page-title { font-size: 20px; }
      .page-subtitle { font-size: 13px; }

      .progress-card {
        padding: 16px;
        border-radius: 12px;
      }
      .percent { font-size: 32px; }
      .percent-label { font-size: 12px; }
      .progress-bar-bg { height: 10px; margin-bottom: 20px; }

      .section { margin-top: 18px; padding-top: 16px; }
      .section-title { font-size: 16px; }
      .section-desc { font-size: 12px; margin-bottom: 12px; }

      .lessons-grid {
        grid-template-columns: 1fr;
        gap: 8px;
      }
      .lesson-item {
        padding: 12px;
        font-size: 13px;
      }
    }

    /* Móvil muy pequeño */
    @media (max-width: 360px) {
      .progress-card { padding: 12px; }
      .page-title { font-size: 18px; }
      .percent { font-size: 28px; }
      .lesson-item { padding: 10px; font-size: 12px; }
      .lesson-icon { width: 14px; height: 14px; }
    }
  `]
})
export class ProgressComponent {}