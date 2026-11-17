import { Component, HostListener, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <h1 class="page-title">Zona de práctica</h1>
      <p class="page-subtitle">Cronometra tus resoluciones y mejora tu tiempo récord.</p>
    </div>

    <!-- TEMPORIZADOR PRINCIPAL -->
    <div class="timer-card" [class.ready]="isReady" [class.running]="isRunning" (click)="toggleTimer()">
      <div class="timer-display">
        {{ formattedTime }}
      </div>
      <div class="timer-hint" *ngIf="!isRunning && !isReady">
        Haz clic o presiona <strong>Espacio</strong> para empezar
      </div>
      <div class="timer-hint" *ngIf="isReady">
        Suelta para comenzar
      </div>
      <div class="timer-hint" *ngIf="isRunning">
        Haz clic o presiona <strong>Espacio</strong> para detener
      </div>
    </div>

    <!-- HISTORIAL -->
    <div class="history-section">
      <div class="history-header">
        <h2 class="history-title">Tus últimas resoluciones</h2>
        <button class="btn-clear" (click)="clearHistory()" *ngIf="times.length > 0">
          Borrar historial
        </button>
      </div>
      
      <div class="empty-state" *ngIf="times.length === 0">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="empty-icon"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <p>Aún no has registrado ningún tiempo.</p>
        <span>¡Presiona Espacio para empezar tu primera resolución!</span>
      </div>

      <div class="history-grid" *ngIf="times.length > 0">
        <div class="history-item" *ngFor="let time of times; let i = index" [class.best]="time === bestTime">
          <div class="history-index">#{{ times.length - i }}</div>
          <div class="history-time">{{ formatMilliseconds(time) }}</div>
          <div class="history-badge" *ngIf="time === bestTime">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            Récord
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* --- ESTILOS BASE --- */
    .page-header { margin-bottom: 32px; }
    .page-title { font-size: 36px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; }
    .page-subtitle { font-size: 16px; color: #64748b; margin: 0; }

    /* --- TEMPORIZADOR --- */
    .timer-card {
      background: white;
      border-radius: 24px;
      border: 2px solid #e2e8f0;
      padding: 80px 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    
    .timer-card:hover {
      border-color: #cbd5e1;
      box-shadow: 0 10px 25px rgba(0,0,0,0.02);
    }

    .timer-card.ready {
      border-color: #10b981;
      background: #ecfdf5;
    }

    .timer-card.running {
      border-color: #4f46e5;
      background: #eef2ff;
    }

    .timer-display {
      font-size: 96px;
      font-weight: 900;
      color: #0f172a;
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      letter-spacing: -2px;
      line-height: 1;
      margin-bottom: 16px;
      transition: color 0.2s;
    }

    .timer-card.running .timer-display { color: #4f46e5; }
    .timer-card.ready .timer-display { color: #10b981; }

    .timer-hint { font-size: 15px; color: #94a3b8; font-weight: 500; }

    /* --- HISTORIAL --- */
    .history-section {
      background: white;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      padding: 32px;
    }

    .history-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .history-title { font-size: 20px; font-weight: 700; color: #0f172a; margin: 0; }

    .btn-clear {
      background: transparent; border: none; color: #ef4444;
      font-size: 14px; font-weight: 500; cursor: pointer;
      padding: 8px 12px; border-radius: 8px; transition: background 0.2s;
    }

    .btn-clear:hover { background: #fef2f2; }

    /* --- ESTADO VACÍO --- */
    .empty-state {
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; padding: 64px 0; text-align: center;
    }

    .empty-icon { margin-bottom: 16px; }
    .empty-state p { font-size: 16px; font-weight: 600; color: #64748b; margin: 0 0 4px 0; }
    .empty-state span { font-size: 14px; color: #94a3b8; }

    /* --- GRILLA DE HISTORIAL --- */
    .history-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 16px;
    }

    .history-item {
      background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;
      padding: 16px; display: flex; flex-direction: column; align-items: center;
      position: relative; transition: transform 0.2s, box-shadow 0.2s;
    }

    .history-item:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .history-item.best { background: #fffbeb; border-color: #fde68a; }

    .history-index { font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 4px; }
    .history-item.best .history-index { color: #d97706; }

    .history-time { font-size: 20px; font-weight: 800; color: #0f172a; font-family: 'JetBrains Mono', monospace; }
    .history-item.best .history-time { color: #92400e; }

    .history-badge {
      position: absolute; top: -8px; right: 8px; background: #f59e0b;
      color: white; font-size: 10px; font-weight: 700; padding: 2px 8px;
      border-radius: 999px; display: flex; align-items: center; gap: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class PracticeComponent implements OnInit {
  isRunning = false;
  isReady = false;
  startTime = 0;
  elapsedTime = 0;
  timerInterval: any;
  
  times: number[] = [];
  bestTime = 0;

  // 👇 Inyectamos NgZone para forzar la detección de cambios en el temporizador
  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    const saved = localStorage.getItem('gala_times');
    if (saved) {
      this.times = JSON.parse(saved);
      this.updateBestTime();
    }
  }

  @HostListener('window:keydown.space', ['$event'])
  handleKeyDown(event: Event) {
    event.preventDefault();
    const kbEvent = event as KeyboardEvent;
    
    if (kbEvent.repeat) return; 

    if (!this.isRunning && !this.isReady) {
      this.startTimer();
    } else if (this.isRunning) {
      this.stopTimer();
    }
  }

  toggleTimer() {
    if (this.isRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    this.isReady = true;
    setTimeout(() => {
      this.isReady = false;
      this.isRunning = true;
      this.startTime = Date.now();
      this.elapsedTime = 0;
      
      // 👇 ENVOLVEMOS EL INTERVALO EN NGZONE.RUN
      this.ngZone.runOutsideAngular(() => {
        this.timerInterval = setInterval(() => {
          this.ngZone.run(() => {
            this.elapsedTime = Date.now() - this.startTime;
          });
        }, 10);
      });
    }, 300);
  }

  stopTimer() {
    if (!this.isRunning) return;
    
    clearInterval(this.timerInterval);
    this.isRunning = false;
    
    // Guardamos el tiempo actual (no el delta de milisegundos)
    const finalTime = this.elapsedTime;
    this.times.unshift(finalTime);
    this.updateBestTime();
    this.saveHistory();
    
    // Opcional: forzamos a que el display se quede en el tiempo final
    this.elapsedTime = finalTime; 
  }

  updateBestTime() {
    if (this.times.length > 0) {
      this.bestTime = Math.min(...this.times);
    }
  }

  saveHistory() {
    localStorage.setItem('gala_times', JSON.stringify(this.times));
  }

  clearHistory() {
    if (confirm('¿Estás seguro de que quieres borrar todo tu historial?')) {
      this.times = [];
      this.bestTime = 0;
      localStorage.removeItem('gala_times');
    }
  }

  get formattedTime(): string {
    // Si está corriendo, muestra el elapsedTime, si no, muestra el último tiempo
    const timeToShow = this.isRunning ? this.elapsedTime : (this.times.length > 0 ? this.times[0] : 0);
    return this.formatMilliseconds(timeToShow);
  }

  formatMilliseconds(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    return `${minutes > 0 ? minutes + ':' : ''}${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  }
}