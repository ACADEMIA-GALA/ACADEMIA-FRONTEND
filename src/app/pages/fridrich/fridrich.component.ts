import { Component } from '@angular/core';

@Component({
  selector: 'app-fridrich',
  standalone: true,
  template: `
    <div class="page-header">
      <div class="tag-amber">FRIDRICH · S/ 1 POR ETAPA</div>
      <h1 class="page-title">Fridrich · CFOP</h1>
      <p class="page-subtitle">Cruz, F2L, OLL y PLL. Cada etapa se adquiere por separado mediante Yape.</p>
    </div>

    <div class="tabs-grid">
      <div class="tab">CRUZ</div>
      <div class="tab">F2L</div>
      <div class="tab">OLL</div>
      <div class="tab">PLL</div>
    </div>

    <div class="lesson-card">
      <div class="tag-amber">ETAPA 01 · FRIDRICH</div>
      <h2 class="lesson-title">Cruz eficiente</h2>
      <p class="lesson-desc">Planificación y cruz blanca. Lección y ejemplo animado.</p>
      <div class="price">S/ 1</div>
      <button class="btn-pay">Pagar con Yape →</button>
    </div>
  `,
  styles: [`
    .page-header {
      margin-bottom: 32px;
    }
    .tag-amber {
      font-size: 12px;
      font-weight: 700;
      color: #d97706;
      letter-spacing: 1.5px;
      margin-bottom: 4px;
    }
    .page-title {
      font-size: 36px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 8px 0;
    }
    .page-subtitle {
      font-size: 16px;
      color: #64748b;
      margin: 0;
    }

    .tabs-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 32px;
    }
    .tab {
      background: white;
      padding: 16px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      text-align: center;
      font-weight: 700;
      color: #334155;
    }

    .lesson-card {
      background: white;
      padding: 32px;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      max-width: 672px;
    }
    .lesson-title {
      font-size: 24px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 8px 0;
    }
    .lesson-desc {
      color: #64748b;
      margin: 0 0 24px 0;
    }
    .price {
      font-size: 30px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 24px;
    }
    .btn-pay {
      width: 100%;
      background: #4f46e5;
      color: white;
      padding: 14px;
      border-radius: 12px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      transition: background 0.2s;
      font-size: 16px;
    }
    .btn-pay:hover {
      background: #4338ca;
    }
  `]
})
export class FridrichComponent {}