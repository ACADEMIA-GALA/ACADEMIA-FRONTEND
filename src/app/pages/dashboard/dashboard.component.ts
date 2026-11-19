import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- ENCABEZADO -->
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">Tu primer giro empieza aquí.</h1>
        <p class="page-subtitle">De tu primera cruz a tu próxima mejor marca.</p>
      </div>
    </div>

    <!-- BANNER PRINCIPAL -->
    <div class="hero-banner">
      <div class="hero-content">
        <div class="hero-tag">ACADEMIA DE CUBOS - GALA</div>
        <h2 class="hero-title">Dos caminos.<br>Una misma pasión.</h2>
        <p class="hero-desc">
          Aprende a resolver tu primer cubo o lleva tu técnica al siguiente nivel con el método Fridrich. Tú eliges el próximo giro.
        </p>
        <div class="hero-actions">
          <a routerLink="/principiante" class="btn-primary">
            Quiero aprender desde cero
          </a>
          <a routerLink="/fridrich" class="btn-secondary">
            Ya sé resolverlo
          </a>
        </div>
      </div>

      <div class="hero-image">
        <div class="cube-wrapper">
          <img src="assets/cubo1.png" alt="Cubo Rubik" class="cube-img" />
        </div>
        <div class="cube-caption">
          Tu cubo. Tu ritmo. Tu siguiente logro.
        </div>
      </div>
    </div>

    <!-- ESTADÍSTICAS -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon indigo">2</div>
        <div>
          <div class="stat-value">2 métodos</div>
          <div class="stat-label">Principiante y Fridrich</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon amber">13</div>
        <div>
          <div class="stat-value">0 / 13</div>
          <div class="stat-label">Lecciones completadas</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon emerald">78</div>
        <div>
          <div class="stat-value">78 casos</div>
          <div class="stat-label">57 OLL + 21 PLL</div>
        </div>
      </div>
    </div>

    <!-- RUTAS -->
    <div class="section-header">
      <h3 class="section-title">Elige tu ruta de aprendizaje</h3>
      <span class="section-sub">Un espacio para cada nivel</span>
    </div>

    <div class="routes-grid">
      <div class="route-card">
        <div class="route-tag indigo">01 · EMPIEZA DESDE CERO</div>
        <h4 class="route-title">Método principiante</h4>
        <p class="route-desc">Resuelve tu primer 3×3 por capas, con instrucciones claras y ejemplos de cada paso.</p>
        <div class="route-meta emerald">GRATIS · 9 lecciones paso a paso</div>
        <a routerLink="/principiante" class="btn-outline">Aprender desde cero</a>
      </div>

      <div class="route-card yellow">
        <div class="route-tag amber">02 · LLEVA TU TÉCNICA MÁS LEJOS</div>
        <h4 class="route-title">Fridrich · CFOP</h4>
        <p class="route-desc">Cruz eficiente, parejas F2L y los catálogos completos de OLL y PLL para seguir mejorando.</p>
        <div class="route-meta amber">S/ 1 por etapa · 4 etapas independientes</div>
        <a routerLink="/fridrich" class="btn-yellow">Explorar Fridrich</a>
      </div>
    </div>
  `,
  styles: [`
    /* ---- ENCABEZADO ---- */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 32px;
      flex-wrap: wrap;
    }
    .page-header-left { flex: 1 1 320px; }
    .page-title {
      font-size: 32px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 8px 0;
      line-height: 1.2;
    }
    .page-subtitle {
      font-size: 16px;
      color: #64748b;
      margin: 0;
    }

    /* ---- BANNER PRINCIPAL ---- */
    .hero-banner {
      background: #F4F1FF;
      border-radius: 24px;
      padding: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 32px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }
    .hero-content { flex: 1 1 380px; min-width: 280px; }
    .hero-tag {
      font-size: 12px;
      font-weight: 700;
      color: #4f46e5;
      letter-spacing: 1.5px;
      margin-bottom: 16px;
    }
    .hero-title {
      font-size: 40px;
      font-weight: 900;
      color: #0f172a;
      line-height: 1.15;
      margin: 0 0 20px 0;
    }
    .hero-desc {
      font-size: 16px;
      color: #475569;
      line-height: 1.6;
      margin: 0 0 28px 0;
    }
    .hero-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .btn-primary {
      background: #4f46e5;
      color: white;
      padding: 12px 22px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 14px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
    }
    .btn-secondary {
      background: white;
      color: #4f46e5;
      border: 1px solid #c7d2fe;
      padding: 12px 22px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 14px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
    }

    /* ---- IMAGEN ---- */
    .hero-image {
      flex: 0 1 260px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .cube-wrapper {
      width: 240px;
      height: 240px;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 100%;
    }
    .cube-img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .cube-caption {
      background: white;
      padding: 8px 16px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
      color: #334155;
      margin-top: 12px;
      text-align: center;
    }

    /* ---- ESTADÍSTICAS ---- */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 18px;
      flex-shrink: 0;
    }
    .stat-icon.indigo { background: #eef2ff; color: #4f46e5; }
    .stat-icon.amber { background: #fffbeb; color: #d97706; }
    .stat-icon.emerald { background: #ecfdf5; color: #059669; }
    .stat-value {
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
    }
    .stat-label {
      font-size: 13px;
      color: #64748b;
      margin-top: 2px;
    }

    /* ---- RUTAS ---- */
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 20px;
      flex-wrap: wrap;
      gap: 8px;
    }
    .section-title {
      font-size: 22px;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }
    .section-sub {
      font-size: 13px;
      color: #94a3b8;
    }

    .routes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }
    .route-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 28px;
      display: flex;
      flex-direction: column;
    }
    .route-card.yellow {
      background: #FFFBF0;
      border-color: #fde68a;
    }
    .route-tag {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 12px;
    }
    .route-tag.indigo { color: #4f46e5; }
    .route-tag.amber { color: #d97706; }
    .route-title {
      font-size: 22px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 12px 0;
    }
    .route-desc {
      font-size: 14px;
      color: #64748b;
      margin-bottom: 20px;
      line-height: 1.5;
    }
    .route-meta {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
      margin-bottom: 20px;
    }
    .route-meta.emerald { color: #059669; }
    .route-meta.amber { color: #d97706; }

    .btn-outline,
    .btn-yellow {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 12px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 14px;
      text-decoration: none;
      margin-top: auto;
      box-sizing: border-box;
    }
    .btn-outline {
      background: white;
      border: 1px solid #e2e8f0;
      color: #334155;
    }
    .btn-yellow {
      background: #FDE68A;
      color: #92400e;
      border: 1px solid #fcd34d;
    }

    /* ---- RESPONSIVE ---- */
    @media (max-width: 1024px) {
      .hero-title { font-size: 34px; }
      .hero-banner { padding: 32px; }
    }

    @media (max-width: 768px) {
      .page-header { flex-direction: column; align-items: stretch; }
      .hero-title { font-size: 28px; }
      .hero-desc { font-size: 15px; }
      .hero-banner { padding: 24px; border-radius: 18px; }
      .hero-image { margin: 0 auto; }
      .cube-wrapper { width: 180px; height: 180px; }
      .page-title { font-size: 26px; }
    }

    @media (max-width: 480px) {
      .hero-title { font-size: 24px; }
      .hero-actions { flex-direction: column; align-items: stretch; }
      .btn-primary, .btn-secondary { justify-content: center; }
      .page-title { font-size: 22px; }
      .page-subtitle { font-size: 14px; }
      .stat-card { padding: 16px; }
      .stat-value { font-size: 18px; }
      .route-card { padding: 20px; }
    }
  `]
})
export class DashboardComponent {
  auth = inject(AuthService);
}