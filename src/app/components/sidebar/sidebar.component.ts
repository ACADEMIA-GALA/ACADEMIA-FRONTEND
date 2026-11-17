import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <!-- LOGO -->
      <div class="logo-section">
        <div class="logo-top">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
          <span class="logo-tag">ACADEMIA DE CUBOS</span>
        </div>
        <h1 class="logo-title">GALA</h1>
        <p class="logo-sub">APRENDE. PRACTICA.<br>SUPÉRATE.</p>
      </div>

      <!-- MENÚ -->
      <nav class="nav-menu">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
          Mi academia
        </a>
        <a routerLink="/principiante" routerLinkActive="active" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
          Método principiante
        </a>
        <a routerLink="/fridrich" routerLinkActive="active" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          Fridrich · CFOP
        </a>
        <a routerLink="/movimientos" routerLinkActive="active" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          Guía de movimientos
        </a>
        <a routerLink="/practica" routerLinkActive="active" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Zona de práctica
        </a>
        <a routerLink="/acceso" routerLinkActive="active" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
          Acceso por etapas
        </a>
        <a routerLink="/pagos" routerLinkActive="active" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          Mis pagos
        </a>
        <a routerLink="/progreso" routerLinkActive="active" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
          Mi progreso
        </a>
      </nav>

      <!-- TARJETA INFERIOR -->
      <div class="bottom-card">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        </div>
        <h4 class="card-title">Un giro cada día.</h4>
        <p class="card-desc">Empieza por comprender. La velocidad llegará con la práctica.</p>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 256px;
      background: #ffffff;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      border-right: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      padding: 24px;
      box-sizing: border-box;
      z-index: 20;
    }

    /* --- LOGO --- */
    .logo-section {
      margin-bottom: 32px;
    }
    .logo-top {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .logo-tag {
      font-size: 10px;
      font-weight: 700;
      color: #94a3b8;
      letter-spacing: 1.5px;
    }
    .logo-title {
      font-size: 26px;
      font-weight: 900;
      color: #4338ca;
      letter-spacing: -1px;
      margin: 0;
    }
    .logo-sub {
      font-size: 10px;
      color: #94a3b8;
      margin: 8px 0 0 0;
      font-weight: 600;
      letter-spacing: 0.5px;
      line-height: 1.4;
    }

    /* --- MENÚ --- */
    .nav-menu {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      overflow-y: auto;
    }
    .nav-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      font-size: 13px;
      font-weight: 500;
      color: #475569;
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.2s ease;
    }
    .nav-link:hover {
      background: #f8fafc;
      color: #1e293b;
    }
    .nav-link.active {
      background: #eef2ff;
      color: #4338ca;
      font-weight: 600;
    }
    .nav-link svg {
      flex-shrink: 0;
    }

    /* --- TARJETA INFERIOR --- */
    .bottom-card {
      margin-top: auto;
      padding-top: 24px;
      border-top: 1px solid #f1f5f9;
    }
    .card-icon {
      margin-bottom: 6px;
    }
    .card-title {
      font-size: 12px;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
    }
    .card-desc {
      font-size: 11px;
      color: #64748b;
      margin: 4px 0 0 0;
      line-height: 1.4;
    }
  `]
})
export class SidebarComponent {
  auth = inject(AuthService);
}