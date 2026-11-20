import { Component, OnInit, inject, ElementRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="admin-container">

      <!-- BARRA SUPERIOR -->
      <div class="admin-topbar">
        <a routerLink="/" class="btn-back">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Volver al dashboard
        </a>
        <div class="topbar-right">
          <span class="admin-user">{{ auth.currentUser()?.name }}</span>
          <button class="btn-logout" (click)="auth.logout()">Salir</button>
        </div>
      </div>

      <!-- ENCABEZADO -->
      <div class="page-header">
        <h1 class="page-title">Vídeos por etapa</h1>
        <p class="page-subtitle">Sube vídeos a Cloudinary y asígnalos a una etapa de Fridrich.</p>
      </div>

      <!-- FORMULARIO DE SUBIDA -->
      <div class="card form-card">
        <h3 class="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Subir nuevo vídeo
        </h3>

        <div class="form-grid">
          <div class="field">
            <label class="label">Etapa</label>
            <select [(ngModel)]="selectedStage" class="input">
              <option value="Cruz eficiente">Cruz eficiente</option>
              <option value="F2L">F2L</option>
              <option value="OLL">OLL</option>
              <option value="PLL">PLL</option>
            </select>
          </div>

          <div class="field">
            <label class="label">Título del vídeo</label>
            <input [(ngModel)]="videoTitle" class="input" placeholder="Ej. Introducción a la cruz" />
          </div>
        </div>

        <div class="field">
          <label class="label">Archivo de vídeo</label>
          <label class="file-input">
            <input #fileInput type="file" accept="video/*" (change)="onFileSelected($event)" />
            <span class="file-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              {{ selectedFile ? selectedFile.name : 'Seleccionar archivo' }}
            </span>
          </label>
        </div>

        <button (click)="uploadVideo()" [disabled]="uploading" class="btn-primary">
          <svg *ngIf="!uploading" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
          {{ uploading ? 'Subiendo...' : 'Subir vídeo' }}
        </button>

        <div *ngIf="uploadStatus" [class]="uploadStatus.startsWith('Error') ? 'status error' : 'status success'">
          {{ uploadStatus }}
        </div>
      </div>

      <!-- LISTA DE VÍDEOS POR ETAPA -->
      <div class="stages-grid">
        <div class="card stage-card" *ngFor="let stage of stages">
          <h3 class="stage-title">
            {{ stage }}
            <span class="stage-count">{{ videosByStage[stage]?.length || 0 }}</span>
          </h3>

          <div *ngIf="loadingVideos && !videosByStage[stage]" class="empty">
            Cargando...
          </div>

          <div *ngIf="!loadingVideos && (videosByStage[stage]?.length || 0) === 0" class="empty">
            Sin vídeos aún
          </div>

          <div *ngFor="let v of videosByStage[stage]" class="video-item">
            <div class="video-info">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="video-icon"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
              <span class="video-title">{{ v.title }}</span>
            </div>

            <div class="video-actions">
              <a [href]="v.url" target="_blank" class="btn-view" title="Ver vídeo">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                <span>Ver</span>
              </a>

              <button (click)="deleteVideo(v.id)" class="btn-delete" title="Eliminar">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                <span>Eliminar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; box-sizing: border-box; }
    * { box-sizing: border-box; }

    .admin-container {
      padding: 24px 32px;
      max-width: 1200px;
      margin: 0 auto;
      font-family: 'Inter', sans-serif;
    }

    .admin-topbar {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 28px; flex-wrap: wrap; gap: 12px;
    }
    .btn-back {
      display: inline-flex; align-items: center; gap: 6px;
      background: white; color: #4338ca; border: 1px solid #c7d2fe;
      padding: 8px 14px; border-radius: 8px;
      font-weight: 600; font-size: 13px; text-decoration: none;
    }
    .btn-back:hover { background: #eef2ff; }
    .topbar-right { display: flex; align-items: center; gap: 12px; }
    .admin-user {
      font-size: 13px; font-weight: 500; color: #334155;
      max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .btn-logout {
      background: #f1f5f9; color: #334155; border: 1px solid #e2e8f0;
      padding: 8px 14px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer;
      font-family: inherit;
    }
    .btn-logout:hover { background: #e2e8f0; }

    .page-header { margin-bottom: 24px; }
    .page-title { font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0; line-height: 1.2; }
    .page-subtitle { font-size: 14px; color: #64748b; margin: 0; line-height: 1.5; }

    .card {
      background: white; border: 1px solid #e2e8f0;
      border-radius: 16px; padding: 24px; margin-bottom: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .card-title {
      display: flex; align-items: center; gap: 8px;
      font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 20px 0;
    }

    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
    .field { display: flex; flex-direction: column; margin-bottom: 16px; }
    .label { font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px; }
    .input {
      width: 100%; padding: 11px 14px;
      border: 1px solid #cbd5e1; border-radius: 10px;
      font-size: 14px; color: #0f172a; background: white;
      outline: none; font-family: inherit;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    .input:focus {
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
    }

    .file-input { display: block; cursor: pointer; position: relative; }
    .file-input input[type="file"] {
      position: absolute; inset: 0; opacity: 0; cursor: pointer;
    }
    .file-label {
      display: flex; align-items: center; gap: 8px;
      padding: 12px 16px; background: #f8fafc;
      border: 2px dashed #cbd5e1; border-radius: 10px;
      font-size: 13px; color: #475569; font-weight: 500;
      transition: background 0.15s, border-color 0.15s;
    }
    .file-input:hover .file-label {
      background: #eef2ff; border-color: #a5b4fc; color: #4338ca;
    }

    .btn-primary {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      width: 100%; padding: 12px;
      background: #4f46e5; color: white; border: none;
      border-radius: 10px; font-weight: 700; font-size: 14px;
      cursor: pointer; transition: background 0.15s; margin-top: 8px;
      font-family: inherit;
    }
    .btn-primary:hover:not(:disabled) { background: #4338ca; }
    .btn-primary:disabled { background: #a5b4fc; cursor: not-allowed; }

    .status {
      padding: 10px 14px; border-radius: 8px;
      font-size: 13px; font-weight: 500; margin-top: 12px;
    }
    .status.success { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
    .status.error { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

    .stages-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }
    .stage-card { margin-bottom: 0; }
    .stage-title {
      display: flex; align-items: center; justify-content: space-between;
      font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 16px 0;
    }
    .stage-count {
      background: #eef2ff; color: #4338ca;
      font-size: 12px; font-weight: 700;
      padding: 2px 10px; border-radius: 999px;
    }

    .empty { color: #94a3b8; font-size: 13px; font-style: italic; padding: 12px 0; }

    .video-item {
      display: flex; justify-content: space-between; align-items: center;
      gap: 12px; padding: 10px 0; border-bottom: 1px solid #f1f5f9;
    }
    .video-item:last-child { border-bottom: none; }

    .video-info { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; }
    .video-icon { flex-shrink: 0; }
    .video-title {
      font-size: 13px; color: #0f172a;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }

    .video-actions {
      display: flex; gap: 8px; align-items: center;
    }

    .btn-view {
      display: inline-flex; align-items: center; gap: 4px;
      background: #eef2ff; color: #4338ca; border: 1px solid #c7d2fe;
      padding: 6px 10px; border-radius: 6px;
      font-size: 12px; font-weight: 600; text-decoration: none;
      flex-shrink: 0; transition: background 0.15s; font-family: inherit;
    }
    .btn-view:hover { background: #e0e7ff; }

    .btn-delete {
      display: inline-flex; align-items: center; gap: 4px;
      background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca;
      padding: 6px 10px; border-radius: 6px;
      font-size: 12px; font-weight: 600; cursor: pointer;
      flex-shrink: 0; transition: background 0.15s; font-family: inherit;
    }
    .btn-delete:hover { background: #fee2e2; }

    @media (max-width: 768px) {
      .admin-container { padding: 16px; }
      .card { padding: 18px; }
      .form-grid { grid-template-columns: 1fr; gap: 0; }
      .page-title { font-size: 22px; }
      .page-subtitle { font-size: 13px; }
      .admin-user { display: none; }
    }

    @media (max-width: 480px) {
      .page-title { font-size: 20px; }
      .card { padding: 16px; border-radius: 12px; }
      .btn-delete span, .btn-view span { display: none; }
      .btn-delete, .btn-view { padding: 6px; }
      .stage-title { font-size: 15px; }
    }
  `]
})
export class AdminVideosComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  auth = inject(AuthService);
  private apiUrl = 'http://localhost:3000/api';

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  stages = ['Cruz eficiente', 'F2L', 'OLL', 'PLL'];
  selectedStage = 'Cruz eficiente';
  videoTitle = '';
  selectedFile: File | null = null;
  uploading = false;
  uploadStatus = '';
  videosByStage: { [key: string]: any[] | undefined } = {};
  loadingVideos = false;

  private retryTimeout: any = null;
  private subs: Subscription[] = [];

  ngOnInit() {
    // Inicializa las claves para que el template no rompa
    for (const stage of this.stages) {
      this.videosByStage[stage] = [];
    }
    this.waitForSessionAndLoad();
  }

  ngOnDestroy() {
    if (this.retryTimeout) clearTimeout(this.retryTimeout);
    this.subs.forEach(s => s.unsubscribe());
  }

  private waitForSessionAndLoad(attempt = 0) {
    // CLAVE: solo exigimos token, no currentUser (que puede tardar en hidratar)
    const token = this.auth.getToken();
    if (token) {
      this.loadAllVideos();
      return;
    }

    if (attempt >= 30) {
      console.error('[AdminVideos] No se pudo obtener token tras 3s');
      this.loadingVideos = false;
      return;
    }

    this.retryTimeout = setTimeout(() => this.waitForSessionAndLoad(attempt + 1), 100);
  }

  private headers(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      this.selectedFile = input.files[0];
      console.log('[AdminVideos] Archivo seleccionado:', this.selectedFile.name);
    }
  }

  async uploadVideo() {
    if (!this.selectedFile) {
      this.uploadStatus = 'Error: Por favor selecciona un archivo de vídeo.';
      return;
    }
    if (!this.videoTitle.trim()) {
      this.uploadStatus = 'Error: Escribe un título para el vídeo.';
      return;
    }

    this.uploading = true;
    this.uploadStatus = 'Obteniendo firma...';

    try {
      const signData: any = await firstValueFrom(
        this.http.post(`${this.apiUrl}/admin/sign-upload`, { folder: 'gala/videos' }, { headers: this.headers() })
      );

      if (!signData?.signature) throw new Error('Firma inválida del servidor');

      this.uploadStatus = 'Subiendo a Cloudinary...';
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('api_key', signData.api_key);
      formData.append('timestamp', String(signData.timestamp));
      formData.append('signature', signData.signature);
      formData.append('folder', signData.folder);

      const cloudRes: any = await fetch(`https://api.cloudinary.com/v1_1/${signData.cloud_name}/video/upload`, {
        method: 'POST', body: formData
      }).then(r => r.json());

      if (cloudRes.error) throw new Error(cloudRes.error.message);

      this.uploadStatus = 'Guardando en base de datos...';
      await firstValueFrom(
        this.http.post(`${this.apiUrl}/admin/stage-videos`, {
            stage: this.selectedStage,
            title: this.videoTitle.trim(),
            publicId: cloudRes.public_id,
            url: cloudRes.secure_url
          }, { headers: this.headers() })
      );

      this.uploadStatus = '¡Vídeo subido correctamente!';

      this.videoTitle = '';
      this.selectedFile = null;
      if (this.fileInput) {
        this.fileInput.nativeElement.value = '';
      }

      // Recarga forzada tras subir
      this.loadAllVideos();

      setTimeout(() => { this.uploadStatus = ''; }, 2000);

    } catch (err: any) {
      console.error('[AdminVideos] Error:', err);
      let msg = 'Error desconocido';
      if (err?.error?.message) msg = err.error.message;
      else if (err?.message) msg = err.message;
      this.uploadStatus = 'Error: ' + msg;
    } finally {
      this.uploading = false;
    }
  }

  loadAllVideos() {
    const token = this.auth.getToken();
    if (!token) {
      console.warn('[AdminVideos] loadAllVideos sin token, reintentando...');
      this.retryTimeout = setTimeout(() => this.loadAllVideos(), 200);
      return;
    }

    this.loadingVideos = true;
    let completed = 0;

    // Cancela suscripciones previas para evitar carreras
    this.subs.forEach(s => s.unsubscribe());
    this.subs = [];

    for (const stage of this.stages) {
      const sub = this.http.get<any[]>(
        `${this.apiUrl}/stage-videos/${encodeURIComponent(stage)}`,
        { headers: this.headers() }
      ).subscribe({
        next: (data) => {
          this.videosByStage[stage] = Array.isArray(data) ? data : [];
          completed++;
          if (completed === this.stages.length) {
            this.loadingVideos = false;
            this.cdr.detectChanges();
          }
        },
        error: (err) => {
          // NO borramos datos previos: solo dejamos [] si no había nada
          console.error(`[AdminVideos] Error cargando "${stage}":`, err?.status, err?.message);
          if (!this.videosByStage[stage]) this.videosByStage[stage] = [];
          completed++;
          if (completed === this.stages.length) {
            this.loadingVideos = false;
            this.cdr.detectChanges();
          }
        }
      });
      this.subs.push(sub);
    }
  }

  deleteVideo(id: number) {
    if (!confirm('¿Eliminar este vídeo?')) return;
    this.http.delete(`${this.apiUrl}/admin/stage-videos/${id}`, { headers: this.headers() })
      .subscribe({
        next: () => this.loadAllVideos(),
        error: (err) => alert('Error al eliminar: ' + (err.error?.message || err.message))
      });
  }
}