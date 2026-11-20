import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <aside class="sidebar">

      <!-- ================= LOGO ================= -->
      <div class="logo-section">
        <div class="logo-top">
          <div class="logo-mark">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <div class="logo-text">
            <span class="logo-tag">ACADEMIA DE CUBOS</span>
            <h1 class="logo-title">GALA</h1>
          </div>
        </div>
        <p class="logo-sub">APRENDE · PRACTICA · SUPÉRATE</p>
      </div>

      <!-- ================= MENÚ ================= -->
      <nav class="nav-menu">

        <!-- GRUPO: APRENDIZAJE -->
        <div class="nav-group">
          <span class="nav-group-label">APRENDIZAJE</span>

          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
            <span>Mi academia</span>
          </a>
          <a routerLink="/principiante" routerLinkActive="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
            <span>Método principiante</span>
          </a>
          <a routerLink="/fridrich" routerLinkActive="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            <span>Fridrich · CFOP</span>
          </a>
          <a routerLink="/movimientos" routerLinkActive="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            <span>Guía de movimientos</span>
          </a>
          <a routerLink="/practica" routerLinkActive="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>Zona de práctica</span>
          </a>
        </div>

        <!-- GRUPO: CUENTA -->
        <div class="nav-group">
          <span class="nav-group-label">MI CUENTA</span>

          <a routerLink="/acceso" routerLinkActive="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
            <span>Acceso por etapas</span>
          </a>

          <!-- Solo logueados -->
          <a *ngIf="auth.currentUser()" routerLink="/pagos" routerLinkActive="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            <span>Registrar pago</span>
          </a>

          <!-- Solo logueados -->
          <a *ngIf="auth.currentUser()" routerLink="/progreso" routerLinkActive="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            <span>Mi progreso</span>
          </a>

          <!-- Solo NO logueados -->
          <a *ngIf="!auth.currentUser()" routerLink="/login" routerLinkActive="active" class="nav-link nav-link-login">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
            <span>Iniciar sesión</span>
          </a>
        </div>

        <!-- GRUPO: ADMIN -->
        <div class="nav-group" *ngIf="auth.isAdmin()">
          <span class="nav-group-label">
            ADMIN
            <span class="admin-badge">ADMIN</span>
          </span>

          <a routerLink="/admin/pagos" routerLinkActive="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            <span>Ver pagos</span>
          </a>
          <a routerLink="/admin/videos" routerLinkActive="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
            <span>Subir vídeos</span>
          </a>
        </div>

      </nav>

      <!-- ================= TARJETA INFERIOR ================= -->
      <div class="bottom-card">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        </div>
        <h4 class="card-title">Un giro cada día.</h4>
        <p class="card-desc">Empieza por comprender. La velocidad llegará con la práctica.</p>
      </div>
    </aside>
  `,
  styles: [`
    :host { display: block; height: 100%; }
    * { box-sizing: border-box; }

    .sidebar {
      width: 260px;
      height: 100vh;
      background: #ffffff;
      border-right: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      padding: 24px 20px;
      font-family: 'Inter', sans-serif;
      overflow: hidden;
    }

    /* ================= LOGO ================= */
    .logo-section {
      padding-bottom: 20px;
      margin-bottom: 8px;
      border-bottom: 1px solid #f1f5f9;
    }
    .logo-top {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo-mark {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: linear-gradient(135deg, #eef2ff, #e0e7ff);
      color: #4f46e5;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .logo-text { display: flex; flex-direction: column; min-width: 0; }
    .logo-tag {
      font-size: 9px;
      font-weight: 700;
      color: #94a3b8;
      letter-spacing: 1.5px;
      line-height: 1.2;
    }
    .logo-title {
      font-size: 24px;
      font-weight: 900;
      color: #4338ca;
      letter-spacing: -1px;
      margin: 0;
      line-height: 1.1;
    }
    .logo-sub {
      font-size: 9px;
      font-weight: 700;
      color: #cbd5e1;
      letter-spacing: 1.5px;
      margin: 10px 0 0 0;
    }

    /* ================= NAV ================= */
    .nav-menu {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 0;
      margin-right: -8px;
      padding-right: 8px;
    }

    /* Scrollbar sutil */
    .nav-menu::-webkit-scrollbar { width: 4px; }
    .nav-menu::-webkit-scrollbar-track { background: transparent; }
    .nav-menu::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
    .nav-menu::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }

    .nav-group {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .nav-group-label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 9px;
      font-weight: 700;
      color: #94a3b8;
      letter-spacing: 1.2px;
      padding: 0 12px;
      margin-bottom: 6px;
    }

    .admin-badge {
      background: #fef3c7;
      color: #b45309;
      font-size: 8px;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 4px;
      letter-spacing: 0.5px;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      font-size: 13px;
      font-weight: 500;
      color: #475569;
      text-decoration: none;
      border-radius: 10px;
      position: relative;
      transition: all 0.15s ease;
      line-height: 1.3;
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
    .nav-link.active::before {
      content: '';
      position: absolute;
      left: -20px;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 20px;
      background: #4f46e5;
      border-radius: 0 3px 3px 0;
    }
    .nav-link svg { flex-shrink: 0; }
    .nav-link span { flex: 1; min-width: 0; }

    .nav-link-login {
      color: #4f46e5;
      font-weight: 600;
      background: #f5f3ff;
    }
    .nav-link-login:hover { background: #ede9fe; color: #4338ca; }

    /* ================= TARJETA INFERIOR ================= */
    .bottom-card {
      margin-top: 8px;
      padding: 14px;
      background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
      border: 1px solid #e0e7ff;
      border-radius: 14px;
      position: relative;
      overflow: hidden;
    }
    .bottom-card::before {
      content: '';
      position: absolute;
      top: -20px;
      right: -20px;
      width: 60px;
      height: 60px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 70%);
      pointer-events: none;
    }
    .card-icon {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
      box-shadow: 0 1px 3px rgba(99, 102, 241, 0.15);
    }
    .card-title {
      font-size: 12px;
      font-weight: 800;
      color: #1e293b;
      margin: 0 0 4px 0;
      letter-spacing: -0.2px;
    }
    .card-desc {
      font-size: 11px;
      color: #64748b;
      margin: 0;
      line-height: 1.45;
    }

    /* ================= RESPONSIVE ================= */
    @media (max-width: 900px) {
      .sidebar { width: 280px; }
    }
    @media (max-width: 480px) {
      .sidebar { width: 86vw; max-width: 320px; padding: 20px 16px; }
      .logo-title { font-size: 22px; }
      .nav-link { padding: 11px 12px; font-size: 13.5px; }
    }
  `]
})
export class SidebarComponent {
  auth = inject(AuthService);
}