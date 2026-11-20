import { Component, inject, signal, HostListener, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="app-container">

      <!-- OVERLAY MÓVIL -->
      <div
        class="sidebar-overlay"
        [class.visible]="sidebarOpen()"
        (click)="closeSidebar()"
        aria-hidden="true">
      </div>

      <!-- ================= SIDEBAR ================= -->
      <aside class="sidebar" [class.open]="sidebarOpen()">

        <button class="sidebar-close" (click)="closeSidebar()" aria-label="Cerrar menú">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div class="sidebar-top">
          <div class="logo-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            <span class="logo-subtitle">ACADEMIA DE CUBOS</span>
          </div>
          <h1 class="logo-title">GALA</h1>
          <p class="logo-text">APRENDE. PRACTICA.<br>SUPÉRATE.</p>

          <nav class="nav-menu">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link" (click)="closeSidebar()">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
              Mi academia
            </a>
            <a routerLink="/principiante" routerLinkActive="active" class="nav-link" (click)="closeSidebar()">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
              Método principiante
            </a>
            <a routerLink="/fridrich" routerLinkActive="active" class="nav-link" (click)="closeSidebar()">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Fridrich · CFOP
            </a>
            <a routerLink="/movimientos" routerLinkActive="active" class="nav-link" (click)="closeSidebar()">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              Guía de movimientos
            </a>
            <a routerLink="/practica" routerLinkActive="active" class="nav-link" (click)="closeSidebar()">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Zona de práctica
            </a>
            <a routerLink="/acceso" routerLinkActive="active" class="nav-link" (click)="closeSidebar()">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
              Acceso por etapas
            </a>

            <a *ngIf="auth.currentUser()" routerLink="/pagos" routerLinkActive="active" class="nav-link" (click)="closeSidebar()">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              Registrar pago
            </a>

            <a *ngIf="auth.isAdmin()" routerLink="/admin/pagos" routerLinkActive="active" class="nav-link" (click)="closeSidebar()">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              Ver pagos
            </a>
            <a *ngIf="auth.isAdmin()" routerLink="/admin/videos" routerLinkActive="active" class="nav-link" (click)="closeSidebar()">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
              Subir vídeos
            </a>

            <a routerLink="/progreso" routerLinkActive="active" class="nav-link" (click)="closeSidebar()">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              Mi progreso
            </a>
          </nav>
        </div>

        <div class="sidebar-card">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </div>
          <h4 class="card-title">Un giro cada día.</h4>
          <p class="card-desc">Empieza por comprender. La velocidad llegará con la práctica.</p>
        </div>
      </aside>

      <!-- ================= CONTENIDO ================= -->
      <div class="main-wrapper">
        <header class="header">

          <button class="hamburger" (click)="toggleSidebar()" aria-label="Abrir menú">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          <div class="breadcrumb">
            Academia GALA / <span>Mi aprendizaje</span>
          </div>

          <!-- 🔧 ZONA DERECHA REORGANIZADA -->
          <div class="header-right">

            <!-- Meta (se oculta primero cuando falta espacio) -->
            <div class="meta">
              Tu próxima meta:
              <strong>resolverlo</strong>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-left: 4px;"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>

            <!-- No logueado -->
            <div class="auth-actions" *ngIf="!auth.currentUser()">
              <a routerLink="/login" class="btn-login">Iniciar sesión</a>
              <a routerLink="/register" class="btn-register">Registrarse</a>
            </div>

            <!-- 🔧 Logueado: nombre corto + avatar + salir (todo junto, sin huecos) -->
            <div class="user-block" *ngIf="auth.currentUser() as user">
              <div class="user-info">
                <div class="avatar" [title]="user.name">{{ userInitial(user.name) }}</div>
                <div class="user-text">
                  <span class="user-name" [title]="user.name">{{ shortName(user.name) }}</span>
                  <span class="user-role">{{ user.role === 'admin' ? 'Administrador' : 'Alumno' }}</span>
                </div>
              </div>
              <button class="btn-logout" (click)="auth.logout()" title="Cerrar sesión">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                <span class="logout-text">Salir</span>
              </button>
            </div>

          </div>
        </header>

        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    * { box-sizing: border-box; }

    .app-container {
      display: flex;
      min-height: 100vh;
      background-color: #f8fafc;
      font-family: 'Inter', sans-serif;
    }

    /* ================= OVERLAY ================= */
    .sidebar-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.5);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
      z-index: 25;
    }
    .sidebar-overlay.visible {
      opacity: 1;
      pointer-events: auto;
    }

    /* ================= SIDEBAR ================= */
    .sidebar {
      width: 260px;
      background: #ffffff;
      border-right: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 24px;
      position: fixed;
      height: 100vh;
      left: 0;
      top: 0;
      z-index: 30;
      overflow-y: auto;
      transition: transform 0.3s ease;
    }
    .sidebar-close {
      display: none;
      position: absolute;
      top: 12px;
      right: 12px;
      width: 36px;
      height: 36px;
      border: none;
      background: #f1f5f9;
      color: #334155;
      border-radius: 8px;
      cursor: pointer;
      align-items: center;
      justify-content: center;
    }
    .sidebar-close:hover { background: #e2e8f0; }

    .logo-container { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
    .logo-subtitle { font-size: 10px; font-weight: 700; color: #94a3b8; letter-spacing: 1px; }
    .logo-title { font-size: 28px; font-weight: 900; color: #4338ca; margin: 0 0 24px 0; letter-spacing: -1px; }
    .logo-text { font-size: 11px; font-weight: 700; color: #94a3b8; letter-spacing: 1px; margin-bottom: 32px; }

    .nav-menu { display: flex; flex-direction: column; gap: 4px; }
    .nav-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      color: #475569;
      text-decoration: none;
      transition: background 0.2s;
    }
    .nav-link:hover { background: #f1f5f9; color: #1e293b; }
    .nav-link.active { background: #eef2ff; color: #4338ca; font-weight: 600; }
    .nav-link svg { flex-shrink: 0; }

    .sidebar-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 16px;
      margin-top: 24px;
    }
    .card-icon { margin-bottom: 8px; }
    .card-title { font-size: 13px; font-weight: 700; color: #0f172a; margin: 0; }
    .card-desc { font-size: 11px; color: #64748b; margin: 4px 0 0 0; line-height: 1.4; }

    /* ================= MAIN ================= */
    .main-wrapper {
      margin-left: 260px;
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      min-height: 100vh;
    }

    /* ================= HEADER ================= */
    .header {
      height: 64px;
      background: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      position: sticky;
      top: 0;
      z-index: 10;
      gap: 16px;
    }

    .breadcrumb {
      font-size: 14px;
      color: #64748b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
      flex: 1; /* 🔧 ocupa el espacio disponible entre hamburguesa y acciones */
    }
    .breadcrumb span { color: #0f172a; font-weight: 500; }

    /* 🔧 Zona derecha SIN huecos */
    .header-right {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }

    .meta {
      font-size: 13px;
      color: #64748b;
      display: flex;
      align-items: center;
      white-space: nowrap;
    }
    .meta strong { color: #0f172a; margin: 0 2px; }

    /* ================= HAMBURGUESA ================= */
    .hamburger {
      display: none;
      background: transparent;
      border: none;
      padding: 8px;
      border-radius: 8px;
      cursor: pointer;
      color: #334155;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .hamburger:hover { background: #f1f5f9; }

    /* ================= AUTH (no logueado) ================= */
    .auth-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .btn-login {
      background: white;
      color: #4f46e5;
      border: 1px solid #c7d2fe;
      padding: 8px 14px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 13px;
      text-decoration: none;
      white-space: nowrap;
      transition: background 0.15s;
    }
    .btn-login:hover { background: #eef2ff; }
    .btn-register {
      background: #4f46e5;
      color: white;
      padding: 8px 14px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 13px;
      text-decoration: none;
      white-space: nowrap;
      transition: background 0.15s;
    }
    .btn-register:hover { background: #4338ca; }

    /* ================= USER BLOCK (logueado) ================= */
    /* 🔧 Nombre corto + avatar + rol + salir, todo compacto */
    .user-block {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-left: 12px;
      border-left: 1px solid #e2e8f0;
      flex-shrink: 0;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 15px;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
    }

    /* 🔧 Texto del usuario: 2 líneas compactas (nombre + rol) */
    .user-text {
      display: flex;
      flex-direction: column;
      min-width: 0;
      max-width: 140px; /* 🔧 ancho máximo para que no empuje botones */
    }
    .user-name {
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .user-role {
      font-size: 11px;
      color: #94a3b8;
      line-height: 1.2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* 🔧 Botón salir compacto */
    .btn-logout {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #f1f5f9;
      color: #334155;
      border: 1px solid #e2e8f0;
      padding: 7px 12px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      transition: background 0.15s;
    }
    .btn-logout:hover { background: #fee2e2; color: #b91c1c; border-color: #fecaca; }
    .btn-logout svg { flex-shrink: 0; }
    .logout-text { display: inline; }

    /* ================= CONTENT ================= */
    .content { padding: 32px; flex: 1; }

    /* ================= RESPONSIVE ================= */

    /* Tablet grande: quitamos el meta primero */
    @media (max-width: 1100px) {
      .meta { display: none; }
    }

    /* Tablet: sidebar se oculta, nombre se acorta */
    @media (max-width: 900px) {
      .hamburger { display: inline-flex; }
      .sidebar-close { display: inline-flex; }
      .sidebar { transform: translateX(-100%); box-shadow: 2px 0 12px rgba(0, 0, 0, 0.08); }
      .sidebar.open { transform: translateX(0); }
      .main-wrapper { margin-left: 0; }
      .header { padding: 0 16px; }
      .content { padding: 16px; }
      .user-text { max-width: 110px; }
    }

    /* Móvil: ocultamos rol y texto de "Salir" */
    @media (max-width: 640px) {
      .user-role { display: none; }
      .user-text { max-width: 90px; }
      .logout-text { display: none; }
      .btn-logout { padding: 8px; }
      .user-block { padding-left: 10px; gap: 8px; }
      .breadcrumb { display: none; }
    }

    /* Móvil pequeño: ocultamos el nombre, solo avatar */
    @media (max-width: 480px) {
      .user-text { display: none; }
      .user-block { padding-left: 8px; }
      .header { padding: 0 12px; gap: 8px; }
      .btn-login, .btn-register { padding: 6px 10px; font-size: 12px; }
      .auth-actions { gap: 6px; }
      .content { padding: 12px; }
    }
  `]
})
export class LayoutComponent implements OnInit, OnDestroy {
  auth = inject(AuthService);
  private router = inject(Router);

  sidebarOpen = signal(false);

  private routerSub?: Subscription;
  private resizeListener?: () => void;

  ngOnInit() {
    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.closeSidebar());

    this.resizeListener = () => {
      if (window.innerWidth > 900 && this.sidebarOpen()) {
        this.closeSidebar();
      }
    };
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
    if (this.resizeListener) window.removeEventListener('resize', this.resizeListener);
    document.body.classList.remove('menu-open');
  }

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
    if (this.sidebarOpen()) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }

  closeSidebar() {
    if (!this.sidebarOpen()) return;
    this.sidebarOpen.set(false);
    document.body.classList.remove('menu-open');
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeSidebar();
  }

  // ================= 🔧 HELPERS DE NOMBRE =================

  /**
   * Devuelve solo el primer nombre + inicial del primer apellido.
   * Ej: "VICTOR GABRIEL PINEDO RIOJA" → "Victor P."
   *     "Alumno GALA" → "Alumno G."
   *     "Juan" → "Juan"
   */
  shortName(fullName: string | undefined | null): string {
    if (!fullName) return 'Usuario';
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'Usuario';
    if (parts.length === 1) return this.capitalize(parts[0]);
    const first = this.capitalize(parts[0]);
    const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();
    return `${first} ${lastInitial}.`;
  }

  /**
   * Devuelve la inicial del nombre para el avatar.
   */
  userInitial(fullName: string | undefined | null): string {
    if (!fullName) return '?';
    const trimmed = fullName.trim();
    if (!trimmed) return '?';
    return trimmed.charAt(0).toUpperCase();
  }

  private capitalize(word: string): string {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
}