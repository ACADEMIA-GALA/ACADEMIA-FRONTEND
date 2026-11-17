import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Encabezado -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Tu primer giro empieza aquí.</h1>
        <p class="page-subtitle">De tu primera cruz a tu próxima mejor marca.</p>
      </div>
      <div class="welcome-badge">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
        </svg>
        Bienvenido a GALA
      </div>
    </div>

    <!-- Banner Principal -->
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
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
          </a>
          <a routerLink="/fridrich" class="btn-secondary">
            Ya sé resolverlo 
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
      
      <!-- Imagen del Cubo (Adaptable) -->
      <div class="hero-image">
        <div class="cube-wrapper">
          <img src="assets/cubo1.png" alt="Cubo Rubik" class="cube-img" />
        </div>
        <div class="cube-caption">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
          Tu cubo. Tu ritmo. Tu siguiente logro.
        </div>
      </div>
    </div>

    <!-- Tarjetas de Estadísticas -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon indigo">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        </div>
        <div>
          <div class="stat-value">2 métodos</div>
          <div class="stat-label">Principiante y Fridrich</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon amber">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
        </div>
        <div>
          <div class="stat-value">0 / 13</div>
          <div class="stat-label">Lecciones completadas</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon emerald">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
        </div>
        <div>
          <div class="stat-value">78 casos</div>
          <div class="stat-label">57 OLL + 21 PLL</div>
        </div>
      </div>
    </div>

    <!-- Sección de Rutas -->
    <div class="section-header">
      <h3 class="section-title">Elige tu ruta de aprendizaje</h3>
      <span class="section-sub">Un espacio para cada nivel</span>
    </div>

    <div class="routes-grid">
      <!-- Ruta Principiante -->
      <div class="route-card">
        <div class="route-tag indigo">01 · EMPIEZA DESDE CERO</div>
        <h4 class="route-title">Método principiante</h4>
        <p class="route-desc">Resuelve tu primer 3×3 por capas, con instrucciones claras y ejemplos de cada paso.</p>
        <div class="route-meta emerald">GRATIS · 9 lecciones paso a paso</div>
        <a routerLink="/principiante" class="btn-outline">
          Aprender desde cero 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>

      <!-- Ruta Fridrich -->
      <div class="route-card yellow">
        <div class="route-tag amber">02 · LLEVA TU TÉCNICA MÁS LEJOS</div>
        <h4 class="route-title">Fridrich · CFOP</h4>
        <p class="route-desc">Cruz eficiente, parejas F2L y los catálogos completos de OLL y PLL para seguir mejorando.</p>
        <div class="route-meta amber">S/ 1 por etapa · 4 etapas independientes</div>
        <a routerLink="/fridrich" class="btn-yellow">
          Explorar Fridrich 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  `,
  styles: [`
    /* --- ENCABEZADO --- */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 32px;
    }
    .page-title {
      font-size: 36px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 8px 0;
    }
    .page-subtitle {
      font-size: 18px;
      color: #64748b;
      margin: 0;
    }
    .welcome-badge {
      background: #eef2ff;
      color: #4f46e5;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* --- BANNER PRINCIPAL --- */
    .hero-banner {
      background: #F4F1FF;
      border-radius: 32px;
      padding: 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      gap: 32px;
    }
    .hero-content {
      max-width: 550px;
      flex: 1;
    }
    .hero-tag {
      font-size: 12px;
      font-weight: 700;
      color: #4f46e5;
      letter-spacing: 1.5px;
      margin-bottom: 16px;
    }
    .hero-title {
      font-size: 52px;
      font-weight: 900;
      color: #0f172a;
      line-height: 1.1;
      margin: 0 0 24px 0;
    }
    .hero-desc {
      font-size: 18px;
      color: #475569;
      line-height: 1.6;
      margin-bottom: 32px;
    }
    .hero-actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    .btn-primary {
      background: #4f46e5;
      color: white;
      padding: 14px 28px;
      border-radius: 12px;
      font-weight: 500;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: background 0.2s;
    }
    .btn-primary:hover { background: #4338ca; }
    .btn-secondary {
      background: white;
      color: #4f46e5;
      border: 1px solid #e0e7ff;
      padding: 14px 28px;
      border-radius: 12px;
      font-weight: 500;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: background 0.2s;
    }
    .btn-secondary:hover { background: #eef2ff; }

    /* --- IMAGEN DEL CUBO (ADAPTABLE) --- */
    .hero-image {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 300px;
      min-width: 300px;
    }
    .cube-wrapper {
      width: 280px;
      height: 280px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .cube-img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      filter: drop-shadow(0 20px 30px rgba(79, 70, 229, 0.25));
      transition: transform 0.3s ease;
    }
    .cube-img:hover {
      transform: scale(1.05) rotate(-3deg);
    }
    .cube-caption {
      background: white;
      padding: 10px 20px;
      border-radius: 999px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      font-size: 12px;
      font-weight: 600;
      color: #334155;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 12px;
      white-space: nowrap;
    }

    /* --- ESTADÍSTICAS --- */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-bottom: 40px;
    }
    .stat-card {
      background: white;
      padding: 24px;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .stat-icon {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .stat-icon.indigo { background: #eef2ff; color: #4f46e5; }
    .stat-icon.amber { background: #fffbeb; color: #d97706; }
    .stat-icon.emerald { background: #ecfdf5; color: #059669; }
    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: #0f172a;
    }
    .stat-label {
      font-size: 14px;
      color: #64748b;
      margin-top: 2px;
    }

    /* --- SECCIÓN RUTAS --- */
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 24px;
    }
    .section-title {
      font-size: 24px;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }
    .section-sub {
      font-size: 14px;
      color: #94a3b8;
    }

    .routes-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    .route-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 24px;
      padding: 32px;
      display: flex;
      flex-direction: column;
      transition: box-shadow 0.2s;
    }
    .route-card:hover {
      box-shadow: 0 10px 25px rgba(0,0,0,0.05);
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
      font-size: 24px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 12px 0;
    }
    .route-desc {
      font-size: 15px;
      color: #64748b;
      margin-bottom: 24px;
      line-height: 1.5;
    }
    .route-meta {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
      margin-bottom: 24px;
    }
    .route-meta.emerald { color: #059669; }
    .route-meta.amber { color: #d97706; }
    
    .btn-outline {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      text-align: center;
      width: 100%;
      background: white;
      border: 1px solid #e2e8f0;
      color: #334155;
      padding: 12px;
      border-radius: 12px;
      font-weight: 500;
      text-decoration: none;
      transition: background 0.2s;
      box-sizing: border-box;
      margin-top: auto;
    }
    .btn-outline:hover { background: #f8fafc; }

    .btn-yellow {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      text-align: center;
      width: 100%;
      background: #FDE68A;
      color: #92400e;
      padding: 12px;
      border-radius: 12px;
      font-weight: 500;
      text-decoration: none;
      transition: background 0.2s;
      box-sizing: border-box;
      margin-top: auto;
    }
    .btn-yellow:hover { background: #FCD34D; }
  `]
})
export class DashboardComponent {
  auth = inject(AuthService);
}