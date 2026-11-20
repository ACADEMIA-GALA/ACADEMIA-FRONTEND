import { Component, NgZone, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div class="tag-indigo">GUÍA DE MOVIMIENTOS</div>
      <h1 class="page-title">Una letra. Un movimiento.</h1>
      <p class="page-subtitle">
        Haz clic en el botón para observar un giro, su inverso y un medio giro. El frente inicial es rojo y la cara superior es amarilla.
      </p>

      <div class="info-box">
        <strong>Regla básica:</strong> una letra sola gira 90° en sentido horario, mirando directamente la cara indicada. Una prima (′) invierte el giro; un 2 indica 180°. Las minúsculas giran dos capas y x, y, z rotan todo el cubo.
      </div>
    </div>

    <!-- TABLA DE NOTACIÓN COMPLETA -->
    <div class="table-card">
      <table class="guide-table">
        <thead>
          <tr>
            <th>Movimiento</th>
            <th>Cara o capa</th>
            <th>Explorar</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let move of moves">
            <td class="move-name">{{ move.name }}</td>
            <td>{{ move.desc }}</td>
            <td><button class="btn-play" (click)="abrirModal(move.base)" aria-label="Ver movimiento">▶</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="info-box mt-4">
      <strong>Notación para CFOP:</strong> En algunas guías Rw significa lo mismo que r: derecha y centro juntos. M gira como L; E, como D; S, como F. Las rotaciones x, y y z cambian la orientación de todo el cubo.
    </div>

    <!-- MODAL / VISOR 3D -->
    <div class="modal-overlay" [class.active]="modalOpen" (click)="cerrarModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <button class="btn-close" (click)="cerrarModal()" aria-label="Cerrar">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        <div class="tag-indigo mb-2">NOTACIÓN</div>
        <h2 class="modal-title">Movimiento {{ currentMove }}</h2>

        <div class="modal-body">
          <!-- CUBO 3D -->
          <div class="cube-container">
            <div class="scene">
              <!-- 🔧 transition aplicada al cubo para que la animación sea fluida -->
              <div class="cube"
                   [style.transform]="'rotateX(-25deg) rotateY(-35deg) ' + rotationState"
                   [style.transition-duration]="transitionDuration">
                <div class="face front" [class.highlight]="highlightSet === 'F'">
                  <div class="sticker" *ngFor="let i of [1,2,3,4,5,6,7,8,9]"></div>
                </div>
                <div class="face back" [class.highlight]="highlightSet === 'B'">
                  <div class="sticker" *ngFor="let i of [1,2,3,4,5,6,7,8,9]"></div>
                </div>
                <div class="face right" [class.highlight]="highlightSet === 'R'">
                  <div class="sticker" *ngFor="let i of [1,2,3,4,5,6,7,8,9]"></div>
                </div>
                <div class="face left" [class.highlight]="highlightSet === 'L'">
                  <div class="sticker" *ngFor="let i of [1,2,3,4,5,6,7,8,9]"></div>
                </div>
                <div class="face top" [class.highlight]="highlightSet === 'U'">
                  <div class="sticker" *ngFor="let i of [1,2,3,4,5,6,7,8,9]"></div>
                </div>
                <div class="face bottom" [class.highlight]="highlightSet === 'D'">
                  <div class="sticker" *ngFor="let i of [1,2,3,4,5,6,7,8,9]"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- CONTROLES -->
          <div class="modal-controls">
            <p class="modal-desc">Observa {{ currentMove }}, su inverso y dos medios giros. La secuencia termina como empezó.</p>

            <div class="sequence-box">
              <span *ngFor="let step of sequence; let i = index; trackBy: trackByStep"
                    [class.active-step]="currentStepIndex === i"
                    class="step-text">
                {{ step }}
              </span>
            </div>

            <div class="sequence-meta">
              Movimiento {{ displayStep }} / 4 ·
              {{ statusText }}
            </div>

            <div class="control-actions">
              <button class="btn-icon" (click)="reset()" title="Reiniciar" [disabled]="playing" aria-label="Reiniciar">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </button>
              <button class="btn-play-large" (click)="reproducirSecuencia()" [disabled]="playing">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                {{ playing ? 'Reproduciendo...' : 'Reproducir' }}
              </button>
              <!-- 🔧 select conectado con [(ngModel)] -->
              <select class="speed-select" [(ngModel)]="speed">
                <option value="slow">Lento</option>
                <option value="normal">Normal</option>
                <option value="fast">Rápido</option>
              </select>
            </div>

            <p class="modal-footer-text">Selecciona una letra para ver el cubo después de ese movimiento. El frente inicial es rojo; arriba, amarillo.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    * { box-sizing: border-box; }

    .page-header { margin-bottom: 32px; }
    .tag-indigo { font-size: 12px; font-weight: 700; color: #4f46e5; letter-spacing: 1.5px; margin-bottom: 4px; text-transform: uppercase; }
    .page-title { font-size: 32px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; line-height: 1.2; }
    .page-subtitle { font-size: 15px; color: #64748b; margin: 0; max-width: 800px; line-height: 1.6; }

    .info-box { background: #eef2ff; color: #334155; padding: 16px; border-radius: 12px; font-size: 14px; margin-top: 24px; border-left: 4px solid #4f46e5; line-height: 1.6; }
    .mt-4 { margin-top: 16px; }

    /* --- TABLA --- */
    .table-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; overflow-x: auto; }
    .guide-table { width: 100%; border-collapse: collapse; text-align: left; min-width: 480px; }
    .guide-table th { background: #f8fafc; padding: 14px 16px; font-size: 13px; font-weight: 700; color: #64748b; border-bottom: 1px solid #e2e8f0; }
    .guide-table td { padding: 14px 16px; font-size: 14px; color: #334155; border-bottom: 1px solid #f1f5f9; }
    .move-name { font-weight: 700; color: #4f46e5; font-family: monospace; font-size: 15px; }
    .btn-play {
      background: #eef2ff; color: #4f46e5; border: none;
      width: 32px; height: 32px; border-radius: 50%;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      font-size: 12px; transition: background 0.15s, transform 0.15s;
    }
    .btn-play:hover { background: #e0e7ff; transform: scale(1.08); }

    /* --- MODAL --- */
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(15, 23, 42, 0.5);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; pointer-events: none; z-index: 100;
      padding: 16px; box-sizing: border-box;
      transition: opacity 0.2s ease;
    }
    .modal-overlay.active { opacity: 1; pointer-events: auto; }

    .modal-content {
      background: white; border-radius: 16px; width: 100%; max-width: 960px;
      padding: 28px; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      max-height: 92vh; overflow-y: auto; box-sizing: border-box;
    }
    .btn-close {
      position: absolute; top: 20px; right: 20px;
      background: #f1f5f9; border: none; width: 36px; height: 36px;
      border-radius: 50%; cursor: pointer; color: #64748b;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s;
    }
    .btn-close:hover { background: #e2e8f0; }

    .modal-title { font-size: 26px; font-weight: 800; color: #0f172a; margin: 0 0 28px 0; }
    .mb-2 { margin-bottom: 8px; }

    .modal-body { display: flex; gap: 32px; align-items: flex-start; }

    /* --- CUBO 3D --- */
    .cube-container {
      flex: 1 1 320px;
      background: #f8fafc; border-radius: 16px;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 32px; min-height: 300px;
      perspective: 1200px;
    }
    .scene { width: 180px; height: 180px; perspective: 1200px; }

    /* 🔧 CLAVE: transition para que el cubo gire suavemente */
    .cube {
      width: 100%; height: 100%; position: relative;
      transform-style: preserve-3d;
      transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
      transition-property: transform;
    }

    .face {
      position: absolute; width: 180px; height: 180px;
      display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr);
      gap: 4px; padding: 4px; background: #1e293b; border-radius: 8px; box-sizing: border-box;
      transition: outline-color 0.2s;
    }
    .sticker { border-radius: 6px; box-shadow: inset 0 0 4px rgba(0,0,0,0.2); }

    .front .sticker  { background: #f87171; }
    .top .sticker    { background: #fcd34d; }
    .right .sticker  { background: #60a5fa; }
    .left .sticker   { background: #34d399; }
    .back .sticker   { background: #fb923c; }
    .bottom .sticker { background: #f8fafc; }

    .front  { transform: rotateY(0deg) translateZ(90px); }
    .back   { transform: rotateY(180deg) translateZ(90px); }
    .right  { transform: rotateY(90deg) translateZ(90px); }
    .left   { transform: rotateY(-90deg) translateZ(90px); }
    .top    { transform: rotateX(90deg) translateZ(90px); }
    .bottom { transform: rotateX(-90deg) translateZ(90px); }

    .face.highlight { outline: 3px solid #4f46e5; outline-offset: 2px; }
    .face.highlight .sticker { filter: brightness(1.2); }

    /* --- CONTROLES --- */
    .modal-controls { flex: 1 1 320px; display: flex; flex-direction: column; justify-content: center; }
    .modal-desc { font-size: 15px; color: #475569; line-height: 1.6; margin: 0 0 16px 0; }

    .sequence-box {
      background: #eef2ff; color: #94a3b8;
      padding: 14px 20px; border-radius: 12px;
      font-family: monospace; font-size: 17px; font-weight: 600;
      letter-spacing: 3px; margin-bottom: 12px;
      display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
    }
    .step-text { transition: color 0.2s; }
    .active-step {
      color: #4f46e5; background: white;
      padding: 2px 8px; border-radius: 6px; font-weight: 700;
    }

    .sequence-meta { font-size: 13px; color: #64748b; margin-bottom: 20px; min-height: 18px; }
    .control-actions { display: flex; align-items: center; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }

    .btn-icon {
      background: white; border: 1px solid #e2e8f0;
      width: 44px; height: 44px; border-radius: 10px;
      cursor: pointer; color: #475569;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s;
    }
    .btn-icon:hover:not(:disabled) { background: #f1f5f9; }
    .btn-icon:disabled, .btn-play-large:disabled { opacity: 0.5; cursor: not-allowed; }

    .btn-play-large {
      background: #4f46e5; color: white; border: none;
      padding: 0 22px; height: 44px; border-radius: 10px;
      font-weight: 600; font-size: 15px; cursor: pointer;
      display: flex; align-items: center; gap: 8px;
      transition: background 0.15s;
    }
    .btn-play-large:hover:not(:disabled) { background: #4338ca; }

    .speed-select {
      border: 1px solid #e2e8f0; padding: 0 14px;
      height: 44px; border-radius: 10px;
      background: white; color: #475569;
      font-size: 14px; outline: none; cursor: pointer; font-weight: 500;
      font-family: inherit;
    }
    .speed-select:focus { border-color: #a5b4fc; }

    .modal-footer-text {
      font-size: 12px; color: #94a3b8; line-height: 1.5;
      margin: 0; padding-top: 16px; border-top: 1px solid #f1f5f9;
    }

    /* --- RESPONSIVE --- */
    @media (max-width: 900px) {
      .modal-body { flex-direction: column; gap: 24px; }
      .cube-container { padding: 24px; min-height: 260px; width: 100%; }
      .modal-controls { width: 100%; }
    }

    @media (max-width: 600px) {
      .page-title { font-size: 24px; }
      .page-subtitle { font-size: 14px; }
      .modal-content { padding: 20px; border-radius: 12px; }
      .modal-title { font-size: 22px; }
      .scene { width: 150px; height: 150px; }
      .face { width: 150px; height: 150px; }
      .front  { transform: rotateY(0deg) translateZ(75px); }
      .back   { transform: rotateY(180deg) translateZ(75px); }
      .right  { transform: rotateY(90deg) translateZ(75px); }
      .left   { transform: rotateY(-90deg) translateZ(75px); }
      .top    { transform: rotateX(90deg) translateZ(75px); }
      .bottom { transform: rotateX(-90deg) translateZ(75px); }
      .sequence-box { font-size: 15px; letter-spacing: 2px; padding: 12px 16px; }
      .control-actions { gap: 6px; }
      .btn-play-large { padding: 0 16px; font-size: 14px; }
    }
  `]
})
export class GuideComponent implements OnDestroy {
  modalOpen = false;
  currentMove = 'R';
  highlightSet = '';

  // 🔧 Estado de rotación acumulada (no string de un solo paso)
  rotationState = '';
  transitionDuration = '600ms';

  sequence: string[] = [];
  currentStepIndex = 0;
  playing = false;

  // 🔧 Velocidad conectada al select
  speed: 'slow' | 'normal' | 'fast' = 'normal';

  private timers: any[] = [];

  moves = [
    { name: 'R / R′ / R2', desc: 'Derecha', base: 'R' },
    { name: 'L / L′ / L2', desc: 'Izquierda', base: 'L' },
    { name: 'U / U′ / U2', desc: 'Arriba', base: 'U' },
    { name: 'D / D′ / D2', desc: 'Abajo', base: 'D' },
    { name: 'F / F′ / F2', desc: 'Frente', base: 'F' },
    { name: 'B / B′ / B2', desc: 'Atrás', base: 'B' },
    { name: 'r / r′ / r2', desc: 'Derecha + capa central (Rw)', base: 'r' },
    { name: 'u / u′ / u2', desc: 'Arriba + capa central (Uw)', base: 'u' },
    { name: 'f / f′ / f2', desc: 'Frente + capa central (Fw)', base: 'f' },
    { name: 'l / l′ / l2', desc: 'Izquierda + capa central (Lw)', base: 'l' },
    { name: 'd / d′ / d2', desc: 'Abajo + capa central (Dw)', base: 'd' },
    { name: 'b / b′ / b2', desc: 'Atrás + capa central (Bw)', base: 'b' },
    { name: 'M / M′ / M2', desc: 'Capa central, en el sentido de L', base: 'M' },
    { name: 'E / E′ / E2', desc: 'Capa central, en el sentido de D', base: 'E' },
    { name: 'S / S′ / S2', desc: 'Capa central, en el sentido de F', base: 'S' },
    { name: 'x / x′ / x2', desc: 'Todo el cubo, en el sentido de R', base: 'x' },
    { name: 'y / y′ / y2', desc: 'Todo el cubo, en el sentido de U', base: 'y' },
    { name: 'z / z′ / z2', desc: 'Todo el cubo, en el sentido de F', base: 'z' },
  ];

  constructor(private ngZone: NgZone) {}

  ngOnDestroy() {
    this.clearTimers();
  }

  // ============ GETTERS DE UI ============

  get displayStep(): number {
    if (this.currentStepIndex >= 4) return 4;
    if (this.playing) return this.currentStepIndex + 1;
    return 0;
  }

  get statusText(): string {
    if (this.playing) return 'Reproduciendo...';
    if (this.currentStepIndex >= 4) return 'Secuencia terminada';
    return 'Caso inicial';
  }

  trackByStep(index: number, step: string): string {
    return index + '-' + step;
  }

  // ============ MODAL ============

  abrirModal(move: string) {
    this.currentMove = move;
    this.sequence = [`${move}`, `${move}'`, `${move}2`, `${move}2`];
    this.currentStepIndex = 0;
    this.rotationState = '';
    this.highlightSet = move;
    this.playing = false;
    this.clearTimers();
    this.modalOpen = true;
  }

  cerrarModal() {
    this.modalOpen = false;
    this.playing = false;
    this.clearTimers();
  }

  reset() {
    this.clearTimers();
    this.rotationState = '';
    this.highlightSet = this.currentMove;
    this.currentStepIndex = 0;
    this.playing = false;
  }

  // ============ REPRODUCCIÓN ============

  reproducirSecuencia() {
    if (this.playing) return;
    this.clearTimers();
    this.rotationState = '';
    this.highlightSet = this.currentMove;
    this.currentStepIndex = 0;
    this.playing = true;

    // pequeña pausa para que el reset se vea antes de empezar
    this.scheduleNext(0, 200);
  }

  private scheduleNext(index: number, delay: number) {
    const t = setTimeout(() => {
      this.ngZone.run(() => this.ejecutarPaso(index));
    }, delay);
    this.timers.push(t);
  }

  private ejecutarPaso(index: number) {
    if (index >= this.sequence.length) {
      this.playing = false;
      this.currentStepIndex = 4;
      this.highlightSet = this.currentMove;
      return;
    }

    this.currentStepIndex = index;
    this.highlightSet = this.currentMove;

    // 🔧 Calculamos el ángulo acumulado según el paso
    const { axis, angle } = this.getRotationForStep(index);

    // 🔧 Aplicamos la rotación ACUMULADA sobre el estado actual
    // (no reemplazamos el transform, sumamos)
    this.rotationState = this.buildRotationState(axis, angle);

    const speedMs = this.getSpeedMs();
    this.transitionDuration = `${Math.max(150, speedMs)}ms`;

    // Espera a que termine la animación + un pequeño margen
    this.scheduleNext(index + 1, speedMs + 250);
  }

  /**
   * Devuelve el eje y el ángulo (en grados) para el paso i de la secuencia.
   * La secuencia es: [base, base', base2, base2]
   *   - base  → +90° (o -90° según la cara)
   *   - base' → vuelve a 0°  (es el inverso, -90°)
   *   - base2 → +180° (desde 0)
   *   - base2 → vuelve a 0° (segundo medio giro)
   */
  private getRotationForStep(index: number): { axis: string; angle: number } {
    const baseMove = this.currentMove.toUpperCase();
    let axis = '';
    let sign = 1;

    if (['R', 'L', 'M', 'X'].includes(baseMove)) {
      axis = 'rotateY';
      sign = baseMove === 'R' || baseMove === 'X' ? -1 : 1;
      if (baseMove === 'M') sign = 1;
    } else if (['U', 'D', 'E', 'Y'].includes(baseMove)) {
      axis = 'rotateX';
      sign = baseMove === 'U' || baseMove === 'Y' ? -1 : 1;
      if (baseMove === 'E') sign = 1;
    } else if (['F', 'B', 'S', 'Z'].includes(baseMove)) {
      axis = 'rotateZ';
      sign = baseMove === 'F' || baseMove === 'Z' ? -1 : 1;
      if (baseMove === 'S') sign = 1;
    }

    // Ángulo absoluto del paso i (acumulado desde 0)
    // i=0: +90° (base)
    // i=1: 0°   (vuelve, porque base' es -90°)
    // i=2: +180° (base2 es +180° desde 0, no desde 90 → pero visualmente queremos que gire)
    // i=3: 0°   (segundo base2 vuelve a 0)
    //
    // Para que la animación se vea bien, en i=2 usamos 180° acumulado.
    // En i=3 volvemos a 0.

    const cumulativeAngles = [1, 0, 2, 0]; // en múltiplos de 90°
    const angle = sign * 90 * cumulativeAngles[index];

    return { axis, angle };
  }

  /**
   * Construye el string de transform. La rotación base de vista
   * (rotateX(-25deg) rotateY(-35deg)) la aplica el template fuera de rotationState.
   */
  private buildRotationState(axis: string, angle: number): string {
    if (!axis || angle === 0) return '';
    return `${axis}(${angle}deg)`;
  }

  private getSpeedMs(): number {
    switch (this.speed) {
      case 'slow': return 1200;
      case 'fast': return 350;
      default: return 600;
    }
  }

  private clearTimers() {
    this.timers.forEach(t => clearTimeout(t));
    this.timers = [];
  }
}