import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Axis = 'x' | 'y' | 'z';
type Mat3 = number[][];

interface MoveDef {
  axis: Axis;
  layers: number[]; // capas afectadas (coordenada -1, 0, 1 sobre el eje)
  dir: 1 | -1;      // -1 = horario visto desde la cara +eje
  label: string;
}

interface Face {
  name: string;
  color: string | null;
}

interface Cubie {
  id: number;
  R: Mat3;
  p: number[];
  css: string;
  active: boolean;
  faces: Face[];
}

const S = 60; // tamaño de cada cubito en px

/**
 * Sistema lógico: x → derecha, y → arriba, z → hacia el observador (mano derecha).
 * Giro horario visto desde la cara +eje = -90° sobre ese eje.
 */
const MOVE_DEFS: Record<string, MoveDef> = {
  R: { axis: 'x', layers: [1],        dir: -1, label: 'Capa derecha' },
  L: { axis: 'x', layers: [-1],       dir:  1, label: 'Capa izquierda' },
  U: { axis: 'y', layers: [1],        dir: -1, label: 'Capa superior' },
  D: { axis: 'y', layers: [-1],       dir:  1, label: 'Capa inferior' },
  F: { axis: 'z', layers: [1],        dir: -1, label: 'Capa frontal' },
  B: { axis: 'z', layers: [-1],       dir:  1, label: 'Capa trasera' },

  r: { axis: 'x', layers: [1, 0],     dir: -1, label: 'Derecha + centro' },
  l: { axis: 'x', layers: [-1, 0],    dir:  1, label: 'Izquierda + centro' },
  u: { axis: 'y', layers: [1, 0],     dir: -1, label: 'Arriba + centro' },
  d: { axis: 'y', layers: [-1, 0],    dir:  1, label: 'Abajo + centro' },
  f: { axis: 'z', layers: [1, 0],     dir: -1, label: 'Frente + centro' },
  b: { axis: 'z', layers: [-1, 0],    dir:  1, label: 'Atrás + centro' },

  M: { axis: 'x', layers: [0],        dir:  1, label: 'Capa central (sentido de L)' },
  E: { axis: 'y', layers: [0],        dir:  1, label: 'Capa central (sentido de D)' },
  S: { axis: 'z', layers: [0],        dir: -1, label: 'Capa central (sentido de F)' },

  x: { axis: 'x', layers: [-1, 0, 1], dir: -1, label: 'Todo el cubo (sentido de R)' },
  y: { axis: 'y', layers: [-1, 0, 1], dir: -1, label: 'Todo el cubo (sentido de U)' },
  z: { axis: 'z', layers: [-1, 0, 1], dir: -1, label: 'Todo el cubo (sentido de F)' },
};

const AXIS_INDEX: Record<Axis, number> = { x: 0, y: 1, z: 2 };

const STEP_FACTORS = [1, -1, 2, 2];
const STEP_DESC = [
  'Giro de 90° en sentido horario',
  'Su inverso: 90° antihorario',
  'Medio giro: 180°',
  'Otro medio giro: vuelve al inicio',
];

const IDENTITY = (): Mat3 => [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

function matMul(A: Mat3, B: Mat3): Mat3 {
  const out: Mat3 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      for (let k = 0; k < 3; k++) out[i][j] += A[i][k] * B[k][j];
  return out;
}

function matVec(A: Mat3, v: number[]): number[] {
  return [0, 1, 2].map(i => A[i][0] * v[0] + A[i][1] * v[1] + A[i][2] * v[2]);
}

function rotMat(axis: Axis, rad: number): Mat3 {
  const c = Math.cos(rad), s = Math.sin(rad);
  if (axis === 'x') return [[1, 0, 0], [0, c, -s], [0, s, c]];
  if (axis === 'y') return [[c, 0, s], [0, 1, 0], [-s, 0, c]];
  return [[c, -s, 0], [s, c, 0], [0, 0, 1]];
}

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
          <!-- CUBO 3D (arrastrable, pero se mueve solo al reproducir) -->
          <div class="cube-container"
               (pointerdown)="onPointerDown($event)"
               (pointermove)="onPointerMove($event)"
               (pointerup)="onPointerUp($event)"
               (pointercancel)="onPointerUp($event)">
            <div class="scene">
              <div class="cube-view" [style.transform]="viewTransform">
                <div class="cubie"
                     *ngFor="let c of cubies; trackBy: trackCubie"
                     [class.dim]="!c.active"
                     [class.active]="c.active"
                     [style.transform]="c.css">
                  <div class="face" *ngFor="let f of c.faces" [ngClass]="f.name">
                    <div class="sticker" *ngIf="f.color" [style.background]="f.color"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="drag-hint">↻ Opcional: arrastra para ver el cubo desde otro ángulo</div>
          </div>

          <!-- CONTROLES -->
          <div class="modal-controls">
            <p class="modal-desc">Observa {{ currentMove }}, su inverso y dos medios giros. La secuencia termina como empezó.</p>

            <div class="layer-badge">
              <span class="dot"></span>
              Se mueve: <strong>{{ layerLabel }}</strong>
            </div>

            <div class="sequence-box">
              <span *ngFor="let step of sequence; let i = index; trackBy: trackByStep"
                    [class.active-step]="playing && currentStepIndex === i"
                    [class.done-step]="(playing && currentStepIndex > i) || finished"
                    class="step-text">
                {{ step }}
              </span>
            </div>

            <div class="sequence-meta">
              Movimiento {{ displayStep }} / 4 · {{ statusText }}
            </div>

            <div class="control-actions">
              <button class="btn-icon" (click)="reset()" title="Reiniciar" [disabled]="playing" aria-label="Reiniciar">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </button>
              <button class="btn-play-large" (click)="reproducirSecuencia()" [disabled]="playing">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                {{ playing ? 'Reproduciendo...' : 'Reproducir' }}
              </button>
              <select class="speed-select" [(ngModel)]="speed">
                <option value="slow">Lento</option>
                <option value="normal">Normal</option>
                <option value="fast">Rápido</option>
              </select>
            </div>

            <p class="modal-footer-text">Las piezas con borde índigo son las que giran; las atenuadas se quedan quietas. El frente inicial es rojo; arriba, amarillo.</p>
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
      padding: 32px; min-height: 340px;
      perspective: 900px;
      cursor: grab; touch-action: none; user-select: none;
    }
    .cube-container:active { cursor: grabbing; }

    .scene { width: 180px; height: 180px; position: relative; transform-style: preserve-3d; }
    .cube-view {
      position: absolute; inset: 0;
      transform-style: preserve-3d;
    }

    .cubie {
      position: absolute; left: 50%; top: 50%;
      width: 60px; height: 60px; margin: -30px 0 0 -30px;
      transform-style: preserve-3d;
    }

    .face {
      position: absolute; width: 60px; height: 60px;
      background: #0f172a; padding: 3px;
      border-radius: 4px;
      backface-visibility: hidden;
    }
    .sticker {
      width: 100%; height: 100%; border-radius: 6px;
      box-shadow: inset 0 0 6px rgba(0,0,0,0.25);
    }

    .face.front  { transform: rotateY(0deg)   translateZ(30px); }
    .face.back   { transform: rotateY(180deg) translateZ(30px); }
    .face.right  { transform: rotateY(90deg)  translateZ(30px); }
    .face.left   { transform: rotateY(-90deg) translateZ(30px); }
    .face.top    { transform: rotateX(90deg)  translateZ(30px); }
    .face.bottom { transform: rotateX(-90deg) translateZ(30px); }

    /* Los filtros van en el sticker (no en el cubito) para no romper el 3D */
    .cubie.dim .sticker { opacity: 0.35; filter: grayscale(0.7); }
    .cubie.active .sticker { box-shadow: inset 0 0 0 3px #4f46e5; }

    .drag-hint { margin-top: 28px; font-size: 12px; color: #94a3b8; text-align: center; }

    /* --- CONTROLES --- */
    .modal-controls { flex: 1 1 320px; display: flex; flex-direction: column; justify-content: center; }
    .modal-desc { font-size: 15px; color: #475569; line-height: 1.6; margin: 0 0 16px 0; }

    .layer-badge {
      display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;
      background: #eef2ff; color: #4338ca; font-size: 13px;
      padding: 6px 12px; border-radius: 999px; margin-bottom: 14px;
    }
    .layer-badge .dot { width: 8px; height: 8px; border-radius: 50%; background: #4f46e5; }

    .sequence-box {
      background: #eef2ff; color: #94a3b8;
      padding: 14px 20px; border-radius: 12px;
      font-family: monospace; font-size: 17px; font-weight: 600;
      letter-spacing: 3px; margin-bottom: 12px;
      display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
    }
    .step-text { transition: color 0.2s, background 0.2s; padding: 2px 8px; border-radius: 6px; }
    .done-step { color: #6366f1; }
    .active-step {
      color: #4f46e5; background: white; font-weight: 700;
      box-shadow: 0 1px 4px rgba(79, 70, 229, 0.3);
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
      .cube-container { padding: 24px; min-height: 300px; width: 100%; }
      .modal-controls { width: 100%; }
    }

    @media (max-width: 600px) {
      .page-title { font-size: 24px; }
      .page-subtitle { font-size: 14px; }
      .modal-content { padding: 20px; border-radius: 12px; }
      .modal-title { font-size: 22px; }
      .scene { transform: scale(0.8); }
      .sequence-box { font-size: 15px; letter-spacing: 2px; padding: 12px 16px; }
      .control-actions { gap: 6px; }
      .btn-play-large { padding: 0 16px; font-size: 14px; }
    }
  `]
})
export class GuideComponent implements OnDestroy {
  modalOpen = false;
  currentMove = 'R';

  cubies: Cubie[] = [];
  sequence: string[] = [];
  currentStepIndex = 0;
  playing = false;
  finished = false;
  speed: 'slow' | 'normal' | 'fast' = 'normal';

  // Vista (arrastrable)
  viewX = -25;
  viewY = -35;
  private dragging = false;
  private lastX = 0;
  private lastY = 0;

  private timers: any[] = [];
  private rafId: number | null = null;
  private destroyed = false;

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

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnDestroy() {
    this.destroyed = true;
    this.stopAll();
  }

  /** Fuerza el repintado (funciona con zone.js y también sin zone). */
  private refresh() {
    if (!this.destroyed) this.cdr.detectChanges();
  }

  // ============ GETTERS DE UI ============

  get viewTransform(): string {
    return `rotateX(${this.viewX}deg) rotateY(${this.viewY}deg)`;
  }

  get layerLabel(): string {
    return MOVE_DEFS[this.currentMove]?.label ?? '';
  }

  get displayStep(): number {
    if (this.finished) return 4;
    if (this.playing) return this.currentStepIndex + 1;
    return 0;
  }

  get statusText(): string {
    if (this.playing) return STEP_DESC[this.currentStepIndex] ?? 'Reproduciendo...';
    if (this.finished) return 'Secuencia terminada';
    return 'Caso inicial';
  }

  trackByStep(index: number, step: string): string {
    return index + '-' + step;
  }

  trackCubie(_: number, c: Cubie): number {
    return c.id;
  }

  // ============ ARRASTRE (VISTA 3D, OPCIONAL) ============

  onPointerDown(e: PointerEvent) {
    this.dragging = true;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  }

  onPointerMove(e: PointerEvent) {
    if (!this.dragging) return;
    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.viewY += dx * 0.5;
    this.viewX = Math.max(-89, Math.min(89, this.viewX - dy * 0.5));
  }

  onPointerUp(e: PointerEvent) {
    this.dragging = false;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  }

  // ============ MODAL ============

  abrirModal(move: string) {
    this.stopAll();
    this.currentMove = move;
    this.sequence = [`${move}`, `${move}′`, `${move}2`, `${move}2`];
    this.setBestView();
    this.buildCube();
    this.modalOpen = true;
  }

  cerrarModal() {
    this.modalOpen = false;
    this.stopAll();
  }

  reset() {
    this.stopAll();
    this.buildCube();
  }

  /** Orienta la cámara para que la capa que se mueve quede a la vista. */
  private setBestView() {
    const def = MOVE_DEFS[this.currentMove];
    const sign = def.layers.includes(1) ? 1 : def.layers.includes(-1) ? -1 : 0;
    let vx = -25;
    let vy = -35;

    if (def.axis === 'x' && sign === -1) vy = 35;     // izquierda visible
    if (def.axis === 'y' && sign === -1) vx = 25;     // abajo visible
    if (def.axis === 'z' && sign === -1) vy = 145;    // atrás visible

    this.viewX = vx;
    this.viewY = vy;
  }

  // ============ MODELO DEL CUBO ============

  private buildCube() {
    const def = MOVE_DEFS[this.currentMove];
    const ai = AXIS_INDEX[def.axis];
    const cubies: Cubie[] = [];
    let id = 0;

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const p = [x, y, z];
          const cubie: Cubie = {
            id: id++,
            R: IDENTITY(),
            p,
            css: '',
            active: def.layers.includes(p[ai]),
            faces: [
              { name: 'front',  color: z ===  1 ? '#f87171' : null }, // rojo
              { name: 'back',   color: z === -1 ? '#fb923c' : null }, // naranja
              { name: 'right',  color: x ===  1 ? '#60a5fa' : null }, // azul
              { name: 'left',   color: x === -1 ? '#34d399' : null }, // verde
              { name: 'top',    color: y ===  1 ? '#fcd34d' : null }, // amarillo
              { name: 'bottom', color: y === -1 ? '#f8fafc' : null }, // blanco
            ],
          };
          this.updateCss(cubie, cubie.R, cubie.p);
          cubies.push(cubie);
        }
      }
    }

    this.cubies = cubies;
    this.currentStepIndex = 0;
    this.playing = false;
    this.finished = false;
    this.refresh();
  }

  /** Convierte rotación/posición lógicas (y arriba) a matrix3d de CSS (y abajo). */
  private updateCss(c: Cubie, R: Mat3, p: number[]) {
    const f = [1, -1, 1];
    const m = (i: number, j: number) => {
      const v = f[i] * R[i][j] * f[j];
      return Math.abs(v) < 1e-9 ? 0 : v;
    };
    const tx = p[0] * S;
    const ty = -p[1] * S;
    const tz = p[2] * S;
    c.css =
      `matrix3d(${m(0, 0)},${m(1, 0)},${m(2, 0)},0,` +
      `${m(0, 1)},${m(1, 1)},${m(2, 1)},0,` +
      `${m(0, 2)},${m(1, 2)},${m(2, 2)},0,` +
      `${tx},${ty},${tz},1)`;
  }

  // ============ REPRODUCCIÓN AUTOMÁTICA ============

  reproducirSecuencia() {
    if (this.playing) return;
    this.stopAll();
    this.buildCube();
    this.playing = true;
    this.refresh();
    // Pequeña pausa para ver el cubo quieto y luego empieza solo
    this.schedule(() => this.ejecutarPaso(0), 400);
  }

  private ejecutarPaso(index: number) {
    if (index >= STEP_FACTORS.length) {
      this.playing = false;
      this.finished = true;
      this.refresh();
      return;
    }

    this.currentStepIndex = index;
    this.refresh();

    const def = MOVE_DEFS[this.currentMove];
    const ai = AXIS_INDEX[def.axis];
    const moving = this.cubies.filter(c => def.layers.includes(c.p[ai]));

    const factor = STEP_FACTORS[index];
    const angleDeg = def.dir * 90 * factor;
    const duration = this.getSpeedMs() * (Math.abs(factor) === 2 ? 1.4 : 1);

    this.animateLayer(def.axis, moving, angleDeg, duration, () => {
      // Pausa entre movimientos y pasa solo al siguiente
      this.schedule(() => this.ejecutarPaso(index + 1), this.getPauseMs());
    });
  }

  private animateLayer(axis: Axis, moving: Cubie[], angleDeg: number, duration: number, done: () => void) {
    const start = performance.now();
    const snapshot = moving.map(c => ({ c, R: c.R, p: c.p.slice() }));
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const frame = (now: number) => {
      if (this.destroyed) return;
      const t = Math.min(1, (now - start) / duration);
      const phi = (angleDeg * ease(t) * Math.PI) / 180;
      const Rot = rotMat(axis, phi);

      for (const s of snapshot) {
        this.updateCss(s.c, matMul(Rot, s.R), matVec(Rot, s.p));
      }
      this.refresh();

      if (t < 1) {
        this.rafId = requestAnimationFrame(frame);
      } else {
        // Estado final con enteros exactos (sin errores de coma flotante)
        const Fin = rotMat(axis, (angleDeg * Math.PI) / 180);
        for (const s of snapshot) {
          const R = matMul(Fin, s.R).map(row => row.map(v => Math.round(v) + 0));
          const p = matVec(Fin, s.p).map(v => Math.round(v) + 0);
          s.c.R = R;
          s.c.p = p;
          this.updateCss(s.c, R, p);
        }
        this.rafId = null;
        this.refresh();
        done();
      }
    };

    this.rafId = requestAnimationFrame(frame);
  }

  private getSpeedMs(): number {
    switch (this.speed) {
      case 'slow': return 1200;
      case 'fast': return 350;
      default: return 650;
    }
  }

  private getPauseMs(): number {
    switch (this.speed) {
      case 'slow': return 700;
      case 'fast': return 250;
      default: return 450;
    }
  }

  private schedule(fn: () => void, delay: number) {
    this.timers.push(setTimeout(() => {
      if (!this.destroyed) fn();
    }, delay));
  }

  private stopAll() {
    this.timers.forEach(t => clearTimeout(t));
    this.timers = [];
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.playing = false;
  }
}