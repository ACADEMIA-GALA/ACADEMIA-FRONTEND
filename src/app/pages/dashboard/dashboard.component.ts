import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="dashboard">

      <!-- ================= ENCABEZADO ================= -->
      <!-- 🔧 Se eliminó el saludo duplicado (ya está en el header) -->
      <header class="page-header">
        <div class="page-header-left">
          <div class="eyebrow">
            <span class="dot"></span>
            ACADEMIA DE CUBOS · GALA
          </div>
          <h1 class="page-title">Tu primer giro empieza aquí.</h1>
          <p class="page-subtitle">De tu primera cruz a tu próxima mejor marca.</p>
        </div>
      </header>

      <!-- ================= HERO ================= -->
      <section class="hero-banner">
        <div class="hero-content">
          <div class="hero-tag">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            DOS CAMINOS · UNA MISMA PASIÓN
          </div>

          <h2 class="hero-title">
            Aprende a resolverlo.<br>
            <span class="gradient-text">Luego, a dominarlo.</span>
          </h2>

          <p class="hero-desc">
            Empieza desde cero con el método principiante o lleva tu técnica al siguiente nivel con Fridrich (CFOP). Tú eliges el próximo giro.
          </p>

          <div class="hero-actions">
            <a routerLink="/principiante" class="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              Empezar desde cero
            </a>
            <a routerLink="/fridrich" class="btn btn-secondary">
              Ya sé resolverlo
            </a>
          </div>

          <div class="hero-badges">
            <span class="badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Sin experiencia previa
            </span>
            <span class="badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              100% online
            </span>
          </div>
        </div>

        <div class="hero-visual">
          <div class="cube-stage">
            <div class="cube-glow"></div>
            <img src="assets/cubo1.png" alt="Cubo Rubik" class="cube-img" />
          </div>
          <div class="cube-caption">
            <span class="caption-dot"></span>
            Tu cubo. Tu ritmo. Tu siguiente logro.
          </div>
        </div>
      </section>

      <!-- ================= ESTADÍSTICAS ================= -->
      <section class="stats-grid">
        <!-- ... (las mismas 4 tarjetas, sin cambios) ... -->
        <div class="stat-card">
          <div class="stat-icon indigo">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
          </div>
          <div class="stat-body">
            <div class="stat-value">2 métodos</div>
            <div class="stat-label">Principiante y Fridrich</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon amber">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <div class="stat-body">
            <div class="stat-value">0 / 13</div>
            <div class="stat-label">Lecciones completadas</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon emerald">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div class="stat-body">
            <div class="stat-value">78 casos</div>
            <div class="stat-label">57 OLL + 21 PLL</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon rose">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
          </div>
          <div class="stat-body">
            <div class="stat-value">A tu ritmo</div>
            <div class="stat-label">Sin horarios ni presión</div>
          </div>
        </div>
      </section>

      <!-- ================= RUTAS ================= -->
      <section class="section">
        <div class="section-header">
          <div>
            <h3 class="section-title">Elige tu ruta de aprendizaje</h3>
            <p class="section-sub">Un espacio pensado para cada nivel</p>
          </div>
        </div>
        <!-- ... (las mismas 2 tarjetas de ruta, sin cambios) ... -->
        <div class="routes-grid">
          <article class="route-card route-indigo">
            <div class="route-top">
              <span class="route-number">01</span>
              <span class="route-tag indigo">DESDE CERO</span>
            </div>
            <h4 class="route-title">Método principiante</h4>
            <p class="route-desc">Resuelve tu primer 3×3 por capas, con instrucciones claras y ejemplos de cada paso.</p>
            <ul class="route-features">
              <li><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> 9 lecciones paso a paso</li>
              <li><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Acceso gratuito</li>
              <li><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Ideal si nunca has resuelto un cubo</li>
            </ul>
            <div class="route-footer">
              <span class="route-price free">GRATIS</span>
              <a routerLink="/principiante" class="btn btn-route btn-route-indigo">Aprender desde cero <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
            </div>
          </article>
          <article class="route-card route-amber">
            <div class="route-top">
              <span class="route-number">02</span>
              <span class="route-tag amber">SIGUIENTE NIVEL</span>
            </div>
            <h4 class="route-title">Fridrich · CFOP</h4>
            <p class="route-desc">Cruz eficiente, parejas F2L y los catálogos completos de OLL y PLL para seguir mejorando.</p>
            <ul class="route-features">
              <li><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> 4 etapas independientes</li>
              <li><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Vídeos exclusivos por etapa</li>
              <li><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Pago único de S/ 1 por etapa</li>
            </ul>
            <div class="route-footer">
              <span class="route-price amber">S/ 1 <small>/ etapa</small></span>
              <a routerLink="/fridrich" class="btn btn-route btn-route-amber">Explorar Fridrich <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
            </div>
          </article>
        </div>
      </section>

      <!-- ================= CTA FINAL ================= -->
      <section class="cta-final">
        <div class="cta-content">
          <h3 class="cta-title">¿Listo para tu próximo giro?</h3>
          <p class="cta-desc">Elige un método y empieza hoy. Sin prisa, sin presión.</p>
        </div>
        <a routerLink="/practica" class="btn btn-cta">
          Ir a zona de práctica
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
    * { box-sizing: border-box; }

    .dashboard {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0; /* 🔧 Eliminado padding extra para evitar huecos */
      font-family: 'Inter', sans-serif;
      color: #0f172a;
    }

    /* ================= ENCABEZADO ================= */
    /* 🔧 Ahora es un bloque simple, sin flex que empuje hacia los lados */
    .page-header {
      margin-bottom: 24px; /* Espacio controlado */
    }
    .page-header-left {
      /* Sin flex, ocupa todo el ancho natural */
    }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 700;
      color: #6366f1;
      letter-spacing: 1.5px;
      margin-bottom: 8px;
    }
    .eyebrow .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    }
    .page-title {
      font-size: 28px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 6px 0;
      line-height: 1.2;
      letter-spacing: -0.5px;
    }
    .page-subtitle {
      font-size: 15px;
      color: #64748b;
      margin: 0;
      line-height: 1.5;
    }

    /* ================= HERO ================= */
    .hero-banner {
      position: relative;
      background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #fef3c7 100%);
      border-radius: 24px;
      padding: 36px;
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      align-items: center;
      gap: 24px;
      margin-bottom: 32px;
      overflow: hidden;
    }
    .hero-banner::before {
      content: '';
      position: absolute;
      top: -120px;
      right: -120px;
      width: 320px;
      height: 320px;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%);
      pointer-events: none;
    }
    .hero-banner::after {
      content: '';
      position: absolute;
      bottom: -80px;
      left: -80px;
      width: 240px;
      height: 240px;
      background: radial-gradient(circle, rgba(251, 191, 36, 0.15), transparent 70%);
      pointer-events: none;
    }
    .hero-content { position: relative; z-index: 1; min-width: 0; }
    .hero-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 700;
      color: #6d28d9;
      letter-spacing: 1.2px;
      margin-bottom: 12px;
      background: rgba(255, 255, 255, 0.7);
      padding: 5px 10px;
      border-radius: 999px;
      backdrop-filter: blur(8px);
    }
    .hero-title {
      font-size: 36px;
      font-weight: 900;
      color: #0f172a;
      line-height: 1.1;
      margin: 0 0 16px 0;
      letter-spacing: -1px;
    }
    .gradient-text {
      background: linear-gradient(135deg, #6366f1 0%, #d97706 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
    }
    .hero-desc {
      font-size: 15px;
      color: #475569;
      line-height: 1.6;
      margin: 0 0 24px 0;
      max-width: 540px;
    }
    .hero-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 20px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 14px;
      text-decoration: none;
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
      white-space: nowrap;
    }
    .btn-primary {
      background: #4f46e5;
      color: white;
      box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35);
    }
    .btn-primary:hover {
      background: #4338ca;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.9);
      color: #4338ca;
      border-color: #c7d2fe;
    }
    .btn-secondary:hover {
      background: white;
      border-color: #a5b4fc;
    }
    .hero-badges {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
      color: #334155;
    }

    /* ================= HERO VISUAL ================= */
    .hero-visual {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;
    }
    .cube-stage {
      position: relative;
      width: 240px;
      height: 240px;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 100%;
    }
    .cube-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 65%);
      animation: pulse-glow 3s ease-in-out infinite;
    }
    @keyframes pulse-glow {
      0%, 100% { transform: scale(1); opacity: 0.8; }
      50% { transform: scale(1.1); opacity: 1; }
    }
    .cube-img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      position: relative;
      z-index: 1;
      filter: drop-shadow(0 20px 30px rgba(79, 70, 229, 0.3));
      animation: float 4s ease-in-out infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(-2deg); }
      50% { transform: translateY(-10px) rotate(2deg); }
    }
    .cube-caption {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.85);
      padding: 8px 16px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
      color: #334155;
      margin-top: 12px;
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
    }
    .caption-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
    }

    /* ================= ESTADÍSTICAS ================= */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 14px;
      margin-bottom: 32px;
    }
    .stat-card {
      background: white;
      padding: 16px;
      border-radius: 14px;
      border: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: all 0.2s ease;
    }
    .stat-card:hover {
      border-color: #c7d2fe;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
    }
    .stat-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .stat-icon.indigo { background: #eef2ff; color: #4f46e5; }
    .stat-icon.amber { background: #fffbeb; color: #d97706; }
    .stat-icon.emerald { background: #ecfdf5; color: #059669; }
    .stat-icon.rose { background: #fff1f2; color: #e11d48; }
    .stat-body { min-width: 0; }
    .stat-value {
      font-size: 16px;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.2;
    }
    .stat-label {
      font-size: 12px;
      color: #64748b;
      margin-top: 2px;
    }

    /* ================= SECCIONES ================= */
    .section { margin-bottom: 32px; }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 16px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .section-title {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 4px 0;
      letter-spacing: -0.3px;
    }
    .section-sub {
      font-size: 13px;
      color: #94a3b8;
      margin: 0;
    }

    /* ================= RUTAS ================= */
    .routes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }
    .route-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      transition: all 0.25s ease;
    }
    .route-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #6366f1, #8b5cf6);
    }
    .route-card.route-amber::before {
      background: linear-gradient(90deg, #f59e0b, #d97706);
    }
    .route-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
      border-color: #c7d2fe;
    }
    .route-card.route-amber:hover { border-color: #fcd34d; }
    .route-amber {
      background: linear-gradient(180deg, #fffbf0 0%, #ffffff 40%);
    }
    .route-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .route-number {
      font-size: 24px;
      font-weight: 900;
      color: #e2e8f0;
      line-height: 1;
      letter-spacing: -1px;
    }
    .route-tag {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1px;
      padding: 4px 10px;
      border-radius: 999px;
    }
    .route-tag.indigo { background: #eef2ff; color: #4338ca; }
    .route-tag.amber { background: #fef3c7; color: #b45309; }
    .route-title {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 8px 0;
      letter-spacing: -0.3px;
    }
    .route-desc {
      font-size: 13px;
      color: #64748b;
      margin: 0 0 16px 0;
      line-height: 1.55;
    }
    .route-features {
      list-style: none;
      padding: 0;
      margin: 0 0 20px 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .route-features li {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #475569;
      line-height: 1.4;
    }
    .route-features svg { flex-shrink: 0; }
    .route-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      gap: 12px;
      flex-wrap: wrap;
    }
    .route-price {
      font-size: 18px;
      font-weight: 800;
      line-height: 1;
    }
    .route-price small {
      font-size: 11px;
      font-weight: 600;
      color: #94a3b8;
    }
    .route-price.free { color: #059669; }
    .route-price.amber { color: #b45309; }
    .btn-route {
      padding: 10px 16px;
      border-radius: 10px;
      font-size: 13px;
    }
    .btn-route-indigo {
      background: #4f46e5;
      color: white;
    }
    .btn-route-indigo:hover {
      background: #4338ca;
      color: white;
    }
    .btn-route-amber {
      background: #f59e0b;
      color: white;
    }
    .btn-route-amber:hover {
      background: #d97706;
      color: white;
    }

    /* ================= CTA FINAL ================= */
    .cta-final {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      border-radius: 24px;
      padding: 24px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
      color: white;
      position: relative;
      overflow: hidden;
    }
    .cta-final::before {
      content: '';
      position: absolute;
      top: -80px;
      right: -80px;
      width: 240px;
      height: 240px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent 70%);
      pointer-events: none;
    }
    .cta-content { position: relative; z-index: 1; flex: 1 1 280px; }
    .cta-title {
      font-size: 20px;
      font-weight: 800;
      margin: 0 0 4px 0;
      letter-spacing: -0.3px;
    }
    .cta-desc {
      font-size: 13px;
      color: #cbd5e1;
      margin: 0;
      line-height: 1.5;
    }
    .btn-cta {
      background: white;
      color: #0f172a;
      position: relative;
      z-index: 1;
    }
    .btn-cta:hover {
      background: #f1f5f9;
      transform: translateY(-1px);
    }

    /* ================= RESPONSIVE ================= */
    @media (max-width: 1024px) {
      .hero-banner {
        grid-template-columns: 1fr;
        padding: 28px;
        text-align: center;
      }
      .hero-content { text-align: center; }
      .hero-desc { margin-left: auto; margin-right: auto; }
      .hero-actions { justify-content: center; }
      .hero-badges { justify-content: center; }
      .hero-title { font-size: 32px; }
      .cube-stage { width: 200px; height: 200px; }
    }

    @media (max-width: 768px) {
      .page-title { font-size: 24px; }
      .page-subtitle { font-size: 14px; }
      .hero-banner { padding: 20px; border-radius: 20px; }
      .hero-title { font-size: 26px; }
      .hero-desc { font-size: 14px; }
      .cube-stage { width: 160px; height: 160px; }
      .section-title { font-size: 18px; }
      .routes-grid { grid-template-columns: 1fr; gap: 14px; }
      .route-card { padding: 20px; border-radius: 18px; }
      .cta-final { padding: 20px; border-radius: 20px; }
      .cta-title { font-size: 18px; }
      .btn-cta { width: 100%; }
    }

    @media (max-width: 480px) {
      .page-title { font-size: 22px; }
      .page-subtitle { font-size: 13px; }
      .hero-title { font-size: 22px; }
      .hero-tag { font-size: 10px; }
      .hero-actions { flex-direction: column; align-items: stretch; }
      .btn { width: 100%; }
      .hero-badges { flex-direction: column; align-items: center; gap: 8px; }
      .cube-stage { width: 140px; height: 140px; }
      .stat-card { padding: 14px; }
      .stat-value { font-size: 15px; }
      .route-title { font-size: 18px; }
      .route-footer { flex-direction: column; align-items: stretch; }
      .btn-route { width: 100%; }
      .cta-title { font-size: 17px; }
    }
  `]
})
export class DashboardComponent {
  auth = inject(AuthService);
}