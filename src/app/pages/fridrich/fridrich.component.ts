import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

interface StageVideo {
  id: number;
  stage: string;
  title: string;
  url: string;
  publicId: string;
}

@Component({
  selector: 'app-fridrich',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-header">
      <div class="tag-amber">FRIDRICH · S/ 1 POR ETAPA</div>
      <h1 class="page-title">Fridrich · CFOP</h1>
      <p class="page-subtitle">
        Cruz, F2L, OLL y PLL. Cada etapa se adquiere por separado mediante Yape, con validación manual del pago.
      </p>
    </div>

    <!-- TABS DE ETAPAS (DINÁMICAS) -->
    <div class="stages-tabs">
      <div
        class="stage-tab"
        *ngFor="let stage of stages"
        [class.active]="selectedStage === stage.name"
        [class.unlocked]="isUnlocked(stage.name)"
        (click)="selectStage(stage.name)"
      >
        <div class="stage-name">{{ stage.short }}</div>
        <div class="stage-lock" *ngIf="!isUnlocked(stage.name)">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          S/ 1 · Bloqueada
        </div>
        <div class="stage-lock unlocked-text" *ngIf="isUnlocked(stage.name)">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Desbloqueada
        </div>
      </div>
    </div>

    <div class="main-layout">
      <!-- CONTENIDO DE LA ETAPA ACTUAL -->
      <div class="lesson-card">
        <div class="lesson-tag">ETAPA · FRIDRICH</div>
        <h2 class="lesson-title">{{ currentStageData.name }}</h2>
        <p class="lesson-desc">{{ currentStageData.desc }}</p>

        <!-- BLOQUEADO -->
        <ng-container *ngIf="!isUnlocked(currentStageData.name)">
          <div class="price-box">
            <div class="price">S/ 1</div>
            <div class="price-note">Un solo pago por esta etapa</div>
          </div>

          <a routerLink="/pagos" class="btn-pay">
            Pagar con Yape
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>

          <p class="lock-note">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 4px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            El contenido se habilita cuando la academia verifica el abono real.
          </p>
        </ng-container>

        <!-- DESBLOQUEADO: VÍDEOS -->
        <ng-container *ngIf="isUnlocked(currentStageData.name)">
          <div class="unlocked-banner">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Etapa desbloqueada · Contenido disponible
          </div>

          <div *ngIf="loadingVideos" class="loading-text">Cargando vídeos...</div>

          <div *ngIf="!loadingVideos && videos.length === 0" class="empty-videos">
            Aún no hay vídeos para esta etapa. El administrador los subirá pronto.
          </div>

          <div class="video-list" *ngIf="!loadingVideos && videos.length > 0">
            <div class="video-card" *ngFor="let v of videos">
              <h4 class="video-title">{{ v.title }}</h4>
              <video
                [src]="v.url"
                controls
                preload="metadata"
                class="video-player">
              </video>
            </div>
          </div>
        </ng-container>
      </div>

      <!-- INFORMACIÓN ADICIONAL -->
      <div class="info-card">
        <h3 class="info-title">Aprende a tu ritmo.</h3>
        <ul class="features-list">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Explicación paso a paso de esta etapa.
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Vídeos exclusivos subidos por el administrador.
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Acceso vinculado a tu cuenta después de aprobar el pago.
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Las otras etapas se adquieren por separado.
          </li>
        </ul>
      </div>
    </div>

    <!-- PROCESO DE PAGO -->
    <div class="payment-section">
      <div class="payment-content">
        <h3 class="payment-title">Pago en dos momentos</h3>
        <p class="payment-desc">
          Primero yapea S/ 1 al QR indicado. Luego registra el número de operación para que la academia pueda comprobarlo.
        </p>
        <a routerLink="/pagos" class="btn-secondary">
          Ir a registrar pago →
        </a>
      </div>

      <div class="qr-container">
        <img src="assets/pago/pago.jpg" alt="QR de Yape" class="qr-image" />
        <p class="qr-note">Escanea o yapea al +51 957 771 432</p>
      </div>
    </div>

    <div class="footer-note">
      © 2026 ACADEMIA DE CUBOS - GALA<br>
      Academia independiente · Tu progreso se guarda en este navegador
    </div>
  `,
  styles: [`
    /* --- ESTILOS BASE --- */
    .page-header { margin-bottom: 32px; }
    .tag-amber { font-size: 12px; font-weight: 700; color: #d97706; letter-spacing: 1.5px; margin-bottom: 8px; text-transform: uppercase; }
    .page-title { font-size: 32px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; line-height: 1.2; }
    .page-subtitle { font-size: 15px; color: #64748b; margin: 0; max-width: 700px; line-height: 1.6; }

    /* --- TABS DE ETAPAS --- */
    .stages-tabs {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
      margin-bottom: 32px;
    }
    .stage-tab {
      background: white;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      cursor: pointer;
    }
    .stage-tab.active {
      border-color: #d97706;
      background: #fffbeb;
    }
    .stage-tab.unlocked {
      border-color: #34d399;
    }
    .stage-tab.unlocked.active {
      border-color: #059669;
      background: #ecfdf5;
    }
    .stage-name {
      font-size: 16px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 4px;
    }
    .stage-lock {
      font-size: 11px;
      font-weight: 600;
      color: #64748b;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }
    .unlocked-text { color: #059669; }

    /* --- LAYOUT PRINCIPAL --- */
    .main-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 32px;
    }

    /* --- TARJETA DE LECCIÓN --- */
    .lesson-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 32px;
      display: flex;
      flex-direction: column;
    }
    .lesson-tag { font-size: 11px; font-weight: 700; color: #d97706; letter-spacing: 1px; margin-bottom: 8px; text-transform: uppercase; }
    .lesson-title { font-size: 24px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; }
    .lesson-desc { font-size: 15px; color: #64748b; margin: 0 0 24px 0; line-height: 1.6; }

    .price-box { margin-bottom: 24px; }
    .price { font-size: 32px; font-weight: 800; color: #0f172a; line-height: 1; }
    .price-note { font-size: 12px; color: #94a3b8; margin-top: 4px; }

    .btn-pay {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      background: #d97706;
      color: white;
      padding: 14px;
      border-radius: 12px;
      font-weight: 700;
      text-decoration: none;
      margin-bottom: 16px;
      box-sizing: border-box;
    }

    .lock-note {
      font-size: 12px;
      color: #64748b;
      text-align: center;
      line-height: 1.5;
      margin: 0;
    }

    /* --- DESBLOQUEADO --- */
    .unlocked-banner {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      color: #047857;
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 20px;
    }

    .loading-text {
      color: #64748b;
      font-size: 14px;
      padding: 20px 0;
    }
    .empty-videos {
      color: #94a3b8;
      font-size: 14px;
      padding: 20px 0;
      font-style: italic;
    }

    .video-list { display: flex; flex-direction: column; gap: 20px; }
    .video-card {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px;
      background: #f8fafc;
    }
    .video-title {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 12px 0;
    }
    .video-player {
      width: 100%;
      border-radius: 10px;
      background: black;
      max-height: 320px;
    }

    /* --- TARJETA DE INFORMACIÓN --- */
    .info-card {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-radius: 16px;
      padding: 32px;
    }
    .info-title { font-size: 18px; font-weight: 800; color: #92400e; margin: 0 0 16px 0; }
    .features-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .features-list li {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 14px;
      color: #78350f;
      line-height: 1.5;
    }
    .features-list svg { flex-shrink: 0; margin-top: 2px; }

    /* --- SECCIÓN DE PAGO --- */
    .payment-section {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 32px;
      margin-bottom: 32px;
      flex-wrap: wrap;
    }
    .payment-content { flex: 1 1 300px; }
    .payment-title { font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; }
    .payment-desc { font-size: 14px; color: #64748b; line-height: 1.6; margin: 0 0 16px 0; }

    .btn-secondary {
      display: inline-block;
      background: white;
      color: #4f46e5;
      border: 1px solid #e0e7ff;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      font-size: 14px;
    }

    .qr-container { text-align: center; flex-shrink: 0; }
    .qr-image {
      width: 160px;
      height: auto;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      margin-bottom: 8px;
    }
    .qr-note { font-size: 12px; color: #64748b; margin: 0; font-weight: 500; }

    /* --- FOOTER --- */
    .footer-note {
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
      line-height: 1.6;
      padding-bottom: 32px;
    }

    /* --- RESPONSIVE --- */
    @media (max-width: 900px) {
      .main-layout { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      .page-title { font-size: 24px; }
      .lesson-card { padding: 20px; }
      .info-card { padding: 20px; }
      .payment-section { padding: 20px; }
      .stages-tabs { grid-template-columns: repeat(2, 1fr); }
    }
  `]
})
export class FridrichComponent implements OnInit {
  auth = inject(AuthService);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  // Etapas con su short, nombre real (usado en pagos) y descripción
  stages = [
    { short: 'CRUZ', name: 'Cruz eficiente', desc: 'Planificación y cruz blanca. Lección y ejemplo animado.' },
    { short: 'F2L', name: 'F2L', desc: 'Las dos primeras capas emparejando esquinas y aristas sin romper la cruz.' },
    { short: 'OLL', name: 'OLL', desc: 'Orientación de la última capa. Lleva todas las caras superiores a amarillo.' },
    { short: 'PLL', name: 'PLL', desc: 'Permutación de la última capa. El paso final para resolver el cubo.' }
  ];

  selectedStage: string = 'Cruz eficiente';
  videos: StageVideo[] = [];
  loadingVideos = false;

  ngOnInit() {
    // Etapa inicial: la primera desbloqueada; si no hay, la primera
    const primeraDesbloqueada = this.stages.find(s => this.isUnlocked(s.name));
    this.selectedStage = primeraDesbloqueada ? primeraDesbloqueada.name : this.stages[0].name;
    this.loadVideosIfUnlocked();
  }

  get currentStageData() {
    return this.stages.find(s => s.name === this.selectedStage)!;
  }

  selectStage(stageName: string) {
    if (this.selectedStage === stageName) return;
    this.selectedStage = stageName;
    this.videos = [];
    this.loadVideosIfUnlocked();
  }

  isUnlocked(stageName: string): boolean {
    return this.auth.payments().some(
      p => p.stage === stageName && p.status === 'aprobado'
    );
  }

  private headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
  }

  loadVideosIfUnlocked() {
    if (!this.isUnlocked(this.selectedStage)) {
      this.videos = [];
      return;
    }

    this.loadingVideos = true;
    this.http.get<StageVideo[]>(
      `${this.apiUrl}/stage-videos/${encodeURIComponent(this.selectedStage)}`,
      { headers: this.headers() }
    ).subscribe({
      next: (data) => {
        this.videos = data;
        this.loadingVideos = false;
      },
      error: () => {
        this.videos = [];
        this.loadingVideos = false;
      }
    });
  }
}