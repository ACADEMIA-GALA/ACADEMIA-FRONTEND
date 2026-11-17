import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [CommonModule],
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
            <td><button class="btn-play" (click)="abrirModal(move.base)">▶</button></td>
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
        <button class="btn-close" (click)="cerrarModal()">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        
        <div class="tag-indigo mb-2">NOTACIÓN</div>
        <h2 class="modal-title">Movimiento {{ currentMove }}</h2>

        <div class="modal-body">
          <!-- CUBO 3D ANIMADO -->
          <div class="cube-container">
            <div class="scene">
              <!-- Aquí se aplica la rotación dinámica -->
              <div class="cube" [ngStyle]="{'transform': 'rotateX(-25deg) rotateY(-35deg) ' + rotationState}">
                <!-- Caras del cubo -->
                <div class="face front" [ngClass]="{'highlight': highlightSet === 'F'}">
                  <div class="sticker" *ngFor="let i of [1,2,3,4,5,6,7,8,9]"></div>
                </div>
                <div class="face back" [ngClass]="{'highlight': highlightSet === 'B'}">
                  <div class="sticker" *ngFor="let i of [1,2,3,4,5,6,7,8,9]"></div>
                </div>
                <div class="face right" [ngClass]="{'highlight': highlightSet === 'R'}">
                  <div class="sticker" *ngFor="let i of [1,2,3,4,5,6,7,8,9]"></div>
                </div>
                <div class="face left" [ngClass]="{'highlight': highlightSet === 'L'}">
                  <div class="sticker" *ngFor="let i of [1,2,3,4,5,6,7,8,9]"></div>
                </div>
                <div class="face top" [ngClass]="{'highlight': highlightSet === 'U'}">
                  <div class="sticker" *ngFor="let i of [1,2,3,4,5,6,7,8,9]"></div>
                </div>
                <div class="face bottom" [ngClass]="{'highlight': highlightSet === 'D'}">
                  <div class="sticker" *ngFor="let i of [1,2,3,4,5,6,7,8,9]"></div>
                </div>
              </div>
            </div>
            <p class="hint">Arrastra para cambiar la vista</p>
          </div>

          <!-- CONTROLES -->
          <div class="modal-controls">
            <p class="modal-desc">Observa {{ currentMove }}, su inverso y dos medios giros. La secuencia termina como empezó.</p>
            
            <div class="sequence-box">
              <span *ngFor="let step of sequence; let i = index" 
                    [class.active-step]="currentStepIndex === i"
                    class="step-text">
                {{ step }}
              </span>
            </div>
            
            <div class="sequence-meta">
              Movimiento {{ currentStepIndex >= 0 && playing ? currentStepIndex + 1 : currentStepIndex === 4 ? 4 : 0 }} / 4 · 
              {{ playing ? 'Reproduciendo...' : (currentStepIndex === 4 ? 'Secuencia terminada' : 'Caso inicial') }}
            </div>

            <div class="control-actions">
              <button class="btn-icon" (click)="reset()" title="Reiniciar" [disabled]="playing">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </button>
              <button class="btn-play-large" (click)="reproducirSecuencia()" [disabled]="playing">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                {{ playing ? 'Reproduciendo...' : 'Reproducir' }}
              </button>
              <select class="speed-select">
                <option>Normal</option>
                <option>Lento</option>
                <option>Rápido</option>
              </select>
            </div>

            <p class="modal-footer-text">Selecciona una letra para ver el cubo después de ese movimiento. El frente inicial es rojo; arriba, amarillo.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* --- ESTILOS BASE --- */
    .page-header { margin-bottom: 32px; }
    .tag-indigo { font-size: 12px; font-weight: 700; color: #4f46e5; letter-spacing: 1.5px; margin-bottom: 4px; text-transform: uppercase; }
    .page-title { font-size: 36px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; }
    .page-subtitle { font-size: 16px; color: #64748b; margin: 0; max-width: 800px; line-height: 1.6; }
    
    .info-box { background: #eef2ff; color: #334155; padding: 16px; border-radius: 12px; font-size: 14px; margin-top: 24px; border-left: 4px solid #4f46e5; }
    .mt-4 { margin-top: 16px; }

    /* --- TABLA --- */
    .table-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
    .guide-table { width: 100%; border-collapse: collapse; text-align: left; }
    .guide-table th { background: #f8fafc; padding: 16px; font-size: 13px; font-weight: 700; color: #64748b; border-bottom: 1px solid #e2e8f0; }
    .guide-table td { padding: 16px; font-size: 14px; color: #334155; border-bottom: 1px solid #f1f5f9; }
    .move-name { font-weight: 700; color: #4f46e5; font-family: monospace; font-size: 15px; }
    .btn-play { background: #eef2ff; color: #4f46e5; border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; transition: background 0.2s; display: flex; align-items: center; justify-content: center; }
    .btn-play:hover { background: #e0e7ff; }

    /* --- MODAL --- */
    .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.3s ease; z-index: 100; }
    .modal-overlay.active { opacity: 1; pointer-events: auto; }
    
    .modal-content { background: white; border-radius: 16px; width: 1000px; max-width: 95%; padding: 32px; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
    .btn-close { position: absolute; top: 24px; right: 24px; background: #f1f5f9; border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; color: #64748b; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
    .btn-close:hover { background: #e2e8f0; color: #0f172a; }
    
    .modal-title { font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 32px 0; }
    .mb-2 { margin-bottom: 8px; }

    .modal-body { display: flex; gap: 40px; }
    
    /* --- CUBO 3D --- */
    .cube-container { flex: 1; background: #f8fafc; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; min-height: 350px; perspective: 1000px; }
    .scene { width: 180px; height: 180px; perspective: 1200px; }
    
    /* Transición suave para que el giro se vea fluido */
    .cube { 
      width: 100%; 
      height: 100%; 
      position: relative; 
      transform-style: preserve-3d; 
      transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); /* Efecto rebote */
    }
    
    .face { 
      position: absolute; 
      width: 180px; 
      height: 180px; 
      display: grid; 
      grid-template-columns: repeat(3, 1fr); 
      grid-template-rows: repeat(3, 1fr); 
      gap: 4px; 
      padding: 4px; 
      background: #1e293b; 
      border-radius: 8px; 
      box-sizing: border-box;
      transition: box-shadow 0.3s;
    }
    .sticker { border-radius: 6px; box-shadow: inset 0 0 4px rgba(0,0,0,0.2); }

    .front .sticker  { background: #f87171; } /* Rojo */
    .top .sticker    { background: #fcd34d; } /* Amarillo */
    .right .sticker  { background: #60a5fa; } /* Azul */
    .left .sticker   { background: #34d399; } /* Verde */
    .back .sticker   { background: #fb923c; } /* Naranja */
    .bottom .sticker { background: #f8fafc; } /* Blanco */

    /* Posicionamiento 3D */
    .front  { transform: rotateY(0deg) translateZ(90px); }
    .back   { transform: rotateY(180deg) translateZ(90px); }
    .right  { transform: rotateY(90deg) translateZ(90px); }
    .left   { transform: rotateY(-90deg) translateZ(90px); }
    .top    { transform: rotateX(90deg) translateZ(90px); }
    .bottom { transform: rotateX(-90deg) translateZ(90px); }

    /* Efecto de resaltado de la cara */
    .face.highlight {
      box-shadow: 0 0 30px 10px rgba(79, 70, 229, 0.6);
      z-index: 10;
    }
    .face.highlight .sticker {
      filter: brightness(1.3);
      animation: pulse-glow 0.8s infinite alternate;
    }

    @keyframes pulse-glow {
      0% { filter: brightness(1.1); box-shadow: inset 0 0 5px rgba(0,0,0,0.2); }
      100% { filter: brightness(1.5); box-shadow: 0 0 15px rgba(255,255,255,0.8), inset 0 0 5px rgba(0,0,0,0.2); }
    }

    .hint { font-size: 12px; color: #94a3b8; margin-top: 32px; font-weight: 500; }

    /* --- CONTROLES --- */
    .modal-controls { flex: 1; display: flex; flex-direction: column; justify-content: center; }
    .modal-desc { font-size: 15px; color: #475569; line-height: 1.6; margin: 0 0 16px 0; }
    
    .sequence-box { background: #eef2ff; color: #94a3b8; padding: 16px 24px; border-radius: 12px; font-family: monospace; font-size: 18px; font-weight: 600; letter-spacing: 4px; margin-bottom: 12px; display: flex; align-items: center; gap: 12px; }
    .step-text { transition: all 0.2s; }
    .active-step { color: #4f46e5; background: white; padding: 2px 8px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); transform: scale(1.1); }
    
    .sequence-meta { font-size: 13px; color: #64748b; margin-bottom: 24px; height: 18px; }
    .control-actions { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; }
    .btn-icon { background: white; border: 1px solid #e2e8f0; width: 44px; height: 44px; border-radius: 10px; cursor: pointer; font-size: 16px; color: #475569; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .btn-icon:hover:not(:disabled) { background: #f8fafc; border-color: #cbd5e1; }
    .btn-icon:disabled, .btn-play-large:disabled { opacity: 0.5; cursor: not-allowed; }
    
    .btn-play-large { background: #4f46e5; color: white; border: none; padding: 0 24px; height: 44px; border-radius: 10px; font-weight: 600; font-size: 15px; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: background 0.2s; }
    .btn-play-large:hover:not(:disabled) { background: #4338ca; }
    
    .speed-select { border: 1px solid #e2e8f0; padding: 0 16px; height: 44px; border-radius: 10px; background: white; color: #475569; font-size: 14px; outline: none; cursor: pointer; font-weight: 500; }
    .modal-footer-text { font-size: 12px; color: #94a3b8; line-height: 1.5; margin: 0; padding-top: 16px; border-top: 1px solid #f1f5f9; }
  `]
})
export class GuideComponent {
  modalOpen = false;
  currentMove = 'R';
  highlightSet = '';
  
  // Estado de rotación visual
  rotationState = '';
  
  sequence: string[] = [];
  currentStepIndex = 0;
  playing = false;

  // Lista COMPLETA de movimientos (incluye minúsculas, M, E, S, x, y, z)
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

  abrirModal(move: string) {
    this.currentMove = move;
    this.sequence = [`${move}`, `${move}'`, `${move}2`, `${move}2`];
    this.currentStepIndex = 0;
    this.rotationState = ''; // Reinicia rotación
    this.highlightSet = move;
    this.playing = false;
    this.modalOpen = true;
  }

  cerrarModal() {
    this.modalOpen = false;
    this.playing = false;
  }

  reset() {
    this.rotationState = '';
    this.highlightSet = this.currentMove;
    this.currentStepIndex = 0;
  }

  reproducirSecuencia() {
    if (this.playing) return;
    this.reset();
    this.playing = true;
    
    // Inicia la animación
    this.ejecutarPaso(0);
  }

  ejecutarPaso(index: number) {
    if (index >= this.sequence.length) {
      this.playing = false;
      this.currentStepIndex = 4;
      this.highlightSet = this.currentMove;
      return;
    }

    this.currentStepIndex = index;
    this.highlightSet = this.currentMove;
    
    // Aplica la rotación correspondiente según la letra base (sin importar prima o 2)
    // Usamos la letra base para calcular el eje y el ángulo
    const baseMove = this.currentMove.toUpperCase();
    let axis = '';
    let angle = 0;

    // Mapeo de letras a ejes y ángulos (90 grados)
    if (['R', 'L', 'M', 'X'].includes(baseMove)) {
      axis = 'rotateY';
      angle = baseMove === 'R' || baseMove === 'X' ? -90 : 90;
      if (baseMove === 'M') angle = 90; // M va en sentido L
    } else if (['U', 'D', 'E', 'Y'].includes(baseMove)) {
      axis = 'rotateX';
      angle = baseMove === 'U' || baseMove === 'Y' ? -90 : 90;
      if (baseMove === 'E') angle = 90; // E va en sentido D
    } else if (['F', 'B', 'S', 'Z'].includes(baseMove)) {
      axis = 'rotateZ';
      angle = baseMove === 'F' || baseMove === 'Z' ? -90 : 90;
      if (baseMove === 'S') angle = 90; // S va en sentido F
    }

    // Si es minúscula, la animación es la misma (simulamos que gira una capa)
    // Pero para el cubo visual, rotamos todo el cubo como demostración
    if (index === 0) {
      // Primer paso: Girar 90 grados en el eje
      this.rotationState = `${axis}(${angle}deg)`;
    } else if (index === 1) {
      // Segundo paso: Volver a 0
      this.rotationState = `${axis}(0deg)`;
    } else if (index === 2) {
      // Tercer paso: Girar 180 grados
      this.rotationState = `${axis}(${angle * 2}deg)`;
    } else if (index === 3) {
      // Cuarto paso: Volver a 0
      this.rotationState = `${axis}(0deg)`;
    }

    // Espera 800ms y pasa al siguiente paso
    setTimeout(() => {
      this.ngZone.run(() => {
        this.highlightSet = '';
        setTimeout(() => {
          this.ngZone.run(() => {
            this.ejecutarPaso(index + 1);
          });
        }, 200);
      });
    }, 800);
  }
}