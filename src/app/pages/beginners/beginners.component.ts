import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-beginners',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <div class="tag-indigo">DESDE CERO · CUBO 3×3</div>
      <h1 class="page-title">Método principiante</h1>
      <p class="page-subtitle">
        Un recorrido completo para resolver el cubo por capas. Lee, observa los movimientos y practica con tu cubo antes de avanzar.
      </p>
      <div class="progress-text">0 de 9 lecciones completadas</div>
    </div>

    <div class="course-layout">
      <!-- SIDEBAR -->
      <aside class="syllabus">
        <h2 class="syllabus-title">CONTENIDO DEL CURSO</h2>
        <ul class="lesson-list">
          <li *ngFor="let lesson of lessons; let i = index" 
              class="lesson-item" 
              [class.active]="currentLesson === i"
              (click)="selectLesson(i)">
            <span class="lesson-number" [class.active]="currentLesson === i">{{ (i + 1).toString().padStart(2, '0') }}</span>
            <span class="lesson-name">{{ lesson.title }}</span>
          </li>
        </ul>
      </aside>

      <!-- MAIN CONTENT -->
      <main class="lesson-content">
        <div class="lesson-header">
          <div class="lesson-tag">{{ lessons[currentLesson].tag }}</div>
          <h2 class="current-title">{{ lessons[currentLesson].title }}</h2>
          <p class="current-desc">{{ lessons[currentLesson].description }}</p>
        </div>

        <!-- RENDERIZADO DINÁMICO -->
        <ng-container *ngFor="let step of lessons[currentLesson].steps">
          
          <div class="content-section">
            <h3 class="section-title">{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </div>

          <!-- CAJA DE SECUENCIA (SI EXISTE) -->
          <div class="sequence-preview" *ngIf="step.sequence">
            <div class="sequence-header">
              <span class="sequence-label">{{ step.sequence.label }}</span>
            </div>
            <div class="sequence-code">{{ step.sequence.code }}</div>
            <button class="btn-play-seq">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Ver movimientos
            </button>
            <p class="sequence-desc" *ngIf="step.sequence.desc">{{ step.sequence.desc }}</p>
          </div>

        </ng-container>

        <!-- CAJAS DE AVISO -->
        <div class="info-callout" *ngIf="lessons[currentLesson].note">
          <h3 class="section-title">Tenlo en cuenta</h3>
          <p>{{ lessons[currentLesson].note }}</p>
        </div>

        <div class="goal-box" *ngIf="lessons[currentLesson].goal">
          <h3 class="section-title">Tu meta en este paso</h3>
          <p>{{ lessons[currentLesson].goal }}</p>
        </div>

        <!-- ACCIONES -->
        <div class="lesson-actions">
          <button class="btn-primary">Marcar lección completada</button>
          <button class="btn-secondary" *ngIf="currentLesson < lessons.length - 1" (click)="nextLesson()">
            Siguiente lección →
          </button>
          <button class="btn-secondary" *ngIf="currentLesson === lessons.length - 1" routerLink="/fridrich">
            Continuar con Fridrich →
          </button>
        </div>
      </main>
    </div>

    <div class="footer-note">
      Referencia del recorrido por capas: tutorial de KubeKings. Explicaciones y diagramas propios de GALA.
      <br>© 2026 ACADEMIA DE CUBOS - GALA
    </div>
  `,
  styles: [`
    /* --- ESTILOS BASE --- */
    .page-header { margin-bottom: 32px; }
    .tag-indigo { font-size: 12px; font-weight: 700; color: #4f46e5; letter-spacing: 1.5px; margin-bottom: 8px; text-transform: uppercase; }
    .page-title { font-size: 36px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; }
    .page-subtitle { font-size: 16px; color: #64748b; margin: 0 0 12px 0; max-width: 700px; line-height: 1.6; }
    .progress-text { font-size: 14px; font-weight: 600; color: #94a3b8; }

    /* --- LAYOUT --- */
    .course-layout { display: grid; grid-template-columns: 280px 1fr; gap: 32px; align-items: start; }

    /* --- SIDEBAR --- */
    .syllabus { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 24px; position: sticky; top: 96px; }
    .syllabus-title { font-size: 11px; font-weight: 800; color: #64748b; letter-spacing: 1px; margin: 0 0 16px 0; text-transform: uppercase; }
    .lesson-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px; }
    .lesson-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 10px; cursor: pointer; transition: background 0.2s; }
    .lesson-item:hover { background: #f8fafc; }
    .lesson-item.active { background: #eef2ff; }
    .lesson-number { width: 28px; height: 28px; border-radius: 50%; background: #f1f5f9; color: #64748b; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .lesson-number.active { background: #4f46e5; color: white; }
    .lesson-name { font-size: 13px; font-weight: 500; color: #334155; line-height: 1.3; }
    .lesson-item.active .lesson-name { font-weight: 600; color: #4338ca; }

    /* --- CONTENIDO --- */
    .lesson-content { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 40px; }
    .lesson-header { margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #f1f5f9; }
    .lesson-tag { font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
    .current-title { font-size: 32px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0; }
    .current-desc { font-size: 16px; color: #475569; line-height: 1.6; margin: 0; }

    /* --- SECCIONES --- */
    .content-section { margin-bottom: 24px; }
    .section-title { font-size: 17px; font-weight: 700; color: #0f172a; margin: 0 0 8px 0; }
    .content-section p { font-size: 15px; color: #475569; line-height: 1.7; margin: 0; }

    /* --- CAJA DE SECUENCIA --- */
    .sequence-preview { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 24px 0; }
    .sequence-header { margin-bottom: 8px; }
    .sequence-label { font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
    .sequence-code { font-family: monospace; font-size: 20px; font-weight: 700; color: #4f46e5; letter-spacing: 2px; margin-bottom: 12px; }
    .sequence-desc { font-size: 13px; color: #64748b; margin-top: 12px; font-style: italic; }
    .btn-play-seq { display: inline-flex; align-items: center; gap: 6px; background: white; border: 1px solid #cbd5e1; color: #334155; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
    .btn-play-seq:hover { background: #f1f5f9; border-color: #94a3b8; }

    /* --- CAJAS DESTACADAS --- */
    .info-callout { background: #fffbeb; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 0 12px 12px 0; margin: 32px 0; }
    .info-callout .section-title { font-size: 15px; color: #92400e; }
    .info-callout p { font-size: 14px; color: #78350f; }

    .goal-box { background: #eef2ff; border: 1px solid #e0e7ff; padding: 24px; border-radius: 16px; margin: 32px 0; }
    .goal-box .section-title { font-size: 15px; color: #4338ca; margin-bottom: 4px; }
    .goal-box p { font-size: 15px; color: #3730a3; font-weight: 500; }

    /* --- ACCIONES --- */
    .lesson-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 40px; padding-top: 32px; border-top: 1px solid #f1f5f9; }
    .btn-primary { background: #4f46e5; color: white; padding: 12px 24px; border-radius: 10px; font-weight: 600; border: none; cursor: pointer; transition: background 0.2s; }
    .btn-primary:hover { background: #4338ca; }
    .btn-secondary { background: white; color: #4f46e5; border: 1px solid #e0e7ff; padding: 12px 24px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
    .btn-secondary:hover { background: #eef2ff; }

    /* --- FOOTER --- */
    .footer-note { margin-top: 32px; font-size: 12px; color: #94a3b8; text-align: center; line-height: 1.6; }
  `]
})
export class BeginnersComponent {
  currentLesson = 0;

  lessons = [
    {
      title: 'Conoce las piezas',
      tag: 'Antes de empezar',
      description: 'Un cubo 3×3 se entiende mejor cuando observas piezas, no pegatinas sueltas.',
      steps: [
        { title: 'Tres tipos de piezas', text: '6 centros: tienen un color y definen el color de cada cara. Sus posiciones relativas no cambian. 12 aristas: tienen dos colores. Van entre dos centros. 8 esquinas: tienen tres colores. Van entre tres centros.' },
        { title: 'Resolvemos capas, no caras aisladas', text: 'Completar una cara no basta: también deben coincidir sus laterales con los centros. En esta ruta empezaremos por el blanco, completaremos dos capas y terminaremos el amarillo.' }
      ],
      note: 'Si tu cubo tiene otro esquema de colores, usa sus centros como referencia. Las secuencias no dependen del color de las pegatinas.',
      goal: 'Encuentra la arista blanca-roja y la esquina blanca-roja-azul. Señala su lugar correcto comparando sus colores con los centros.'
    },
    {
      title: 'Lee los movimientos',
      tag: 'Tu primer algoritmo',
      description: 'Cada letra indica qué capa debes girar. El sentido horario se interpreta mirando directamente la cara indicada.',
      steps: [
        { title: 'Un giro, su inverso y un giro doble', text: 'R gira la derecha 90° en sentido horario. R′ hace el giro contrario. R2 gira 180°. Un apóstrofo normal (\') y el símbolo prima (′) significan lo mismo.' },
        { title: 'Lee de izquierda a derecha', text: 'Una secuencia como R U R′ U′ se ejecuta movimiento por movimiento. Mantén la misma cara frontal, salvo que una rotación x, y o z te indique lo contrario.', sequence: { label: 'Tu primera secuencia', code: 'R U R\' U\'', desc: 'Ejercicio libre desde el cubo resuelto. Seis repeticiones devuelven el cubo al estado inicial.' } }
      ],
      note: '',
      goal: ''
    },
    {
      title: 'Construye la cruz blanca',
      tag: 'Paso 01 · Primera capa',
      description: 'Vamos a colocar las cuatro aristas blancas junto al centro blanco, respetando también los centros laterales.',
      steps: [
        { title: '1. Crea una margarita', text: 'Sostén el centro amarillo arriba. Lleva las cuatro aristas blancas a su alrededor, con la pegatina blanca mirando arriba. Si un lugar está ocupado, gira U para dejar un hueco antes de subir otra arista.' },
        { title: '2. Alinea y baja cada arista', text: 'Observa el otro color de una arista de la margarita. Gira solo U hasta que ese color coincida con el centro lateral. Gira esa cara lateral 180° para llevar el blanco abajo. Repite con las cuatro aristas.' },
        { title: '3. Comprueba los laterales', text: 'Mira el blanco abajo: debe formar una cruz. En cada lateral, la pegatina de la arista blanca debe coincidir con el centro. Si no coincide, sube esa arista con medio giro, alinéala arriba y vuelve a bajarla.', sequence: { label: 'Ejemplo: bajar una arista alineada', code: 'F2', desc: 'La arista blanca-roja está arriba y alineada con el centro frontal rojo. F2 la coloca abajo.' } }
      ],
      note: 'La margarita es una ayuda de aprendizaje. Más adelante podrás construir la cruz directamente abajo, sin este paso intermedio.',
      goal: 'Cruz blanca completa y cuatro aristas alineadas con sus centros laterales.'
    },
    {
      title: 'Inserta las esquinas blancas',
      tag: 'Paso 02 · Primera capa',
      description: 'Mantén el blanco abajo. Cada esquina debe quedar entre los tres centros de sus colores.',
      steps: [
        { title: '1. Colócala sobre su destino', text: 'Busca una esquina con blanco en la capa superior. Gira U hasta situarla sobre su hueco. Gira todo el cubo horizontalmente si hace falta para que ese hueco quede delante y a la derecha.' },
        { title: '2. Inserta sin cambiar el frente', text: 'Repite R U R′ U′ hasta que esa esquina entre con el blanco hacia abajo. El color blanco puede mirar a un lado o arriba; conserva la esquina sobre su destino y repite la secuencia completa, sin interrumpirla.' },
        { title: '3. Si una esquina está atrapada abajo', text: 'Coloca el hueco incorrecto delante y a la derecha y ejecuta una secuencia R U R′ U′ para sacar la esquina. Después alinéala arriba con su destino y vuelve a insertarla. Repite para las cuatro esquinas.', sequence: { label: 'Insertar esquina frontal derecha', code: 'R U R\' U\'', desc: 'El reproductor muestra un ejemplo concreto que se resuelve en una repetición. Otros casos requieren repetir.' } }
      ],
      note: 'No avances si solo el blanco está completo: revisa también los colores laterales de las esquinas.',
      goal: 'Cara blanca completa y primera fila de cada lateral del mismo color que su centro.'
    },
    {
      title: 'Completa la segunda capa',
      tag: 'Paso 03 · Dos capas completas',
      description: 'Ahora colocaremos las aristas que no tienen amarillo en los cuatro huecos de la capa central.',
      steps: [
        { title: '1. Busca una arista sin amarillo', text: 'Con blanco abajo y amarillo arriba, elige en U una arista sin amarillo. Gira U hasta que su pegatina frontal coincida con el centro frontal.' },
        { title: '2. Decide a qué lado va', text: 'Mira el color que apunta arriba. Si coincide con el centro derecho, usa la inserción a la derecha. Si coincide con el centro izquierdo, usa la inserción a la izquierda. Conserva el frente elegido durante todo el algoritmo.' },
        { title: '3. Corrige una arista mal colocada', text: 'Si arriba solo quedan aristas amarillas y la segunda capa no está completa, hay una arista atrapada en un hueco incorrecto. Inserta una arista superior en ese hueco para extraerla. Luego alinea la arista recuperada y colócala correctamente.', sequence: { label: 'Insertar hacia la derecha', code: 'U R U\' R\' U\' F\' U F', desc: 'Alinea primero el color frontal con el centro F; el color superior debe pertenecer a R.' } },
        { title: '', text: '', sequence: { label: 'Insertar hacia la izquierda', code: 'U\' L\' U L U F U\' F\'', desc: 'Alinea primero el color frontal con el centro F; el color superior debe pertenecer a L.' } }
      ],
      note: '',
      goal: 'Las dos capas inferiores están resueltas en las cuatro caras laterales.'
    },
    {
      title: 'Forma la cruz amarilla',
      tag: 'Paso 04 · Última capa',
      description: 'Mantén amarillo arriba. En este paso solo importa orientar las aristas amarillas; las esquinas y los colores laterales se resolverán después.',
      steps: [
        { title: 'Reconoce el dibujo de arriba', text: 'Línea: coloca las dos aristas amarillas de forma horizontal, de izquierda a derecha. Forma de L: coloca los brazos amarillo-amarillo hacia atrás y hacia la izquierda. Punto: ninguna arista apunta arriba. Ejecuta una vez desde cualquier frente y vuelve a identificar el dibujo. Cruz: este paso ya está terminado.' },
        { title: 'Aplica y vuelve a observar', text: 'Ejecuta F R U R′ U′ F′. Si aún no tienes la cruz, vuelve a colocar el nuevo dibujo como se explica arriba y repite. No gires todo el cubo verticalmente: el amarillo permanece arriba.', sequence: { label: 'De línea horizontal a cruz', code: 'F R U R\' U\' F\'', desc: 'Observa la línea amarilla inicial y la cruz final. Los laterales aún pueden estar permutados.' } }
      ],
      note: 'En un 3×3 correctamente montado no aparece exactamente una o tres aristas amarillas orientadas en esta etapa.',
      goal: 'Las cuatro aristas amarillas apuntan arriba formando una cruz.'
    },
    {
      title: 'Ordena las aristas amarillas',
      tag: 'Paso 05 · Última capa',
      description: 'La cruz ya es amarilla. Ahora haremos que sus cuatro colores laterales coincidan con los centros.',
      steps: [
        { title: '1. Busca dos coincidencias', text: 'Gira U y observa los laterales. Busca una posición con al menos dos aristas alineadas. Si las cuatro coinciden, continúa al siguiente paso.' },
        { title: '2. Dos coincidencias adyacentes', text: 'Coloca las dos aristas correctas atrás y a la derecha. Aplica el algoritmo que aparece abajo. Después comprueba los cuatro laterales; ajusta U si hace falta.' },
        { title: '3. Dos coincidencias opuestas', text: 'Ejecuta el algoritmo una vez desde cualquier frente. Vuelve a girar U hasta encontrar dos coincidencias adyacentes. Ponlas atrás y a la derecha y aplica de nuevo.', sequence: { label: 'Permutar las aristas de la cruz', code: 'R U R\' U R U2 R\' U', desc: 'Antes de aplicarlo a tu cubo, identifica las aristas correctas y orienta el caso como se indica.' } }
      ],
      note: '',
      goal: 'La cruz amarilla está orientada y sus cuatro aristas coinciden con los centros laterales.'
    },
    {
      title: 'Coloca las esquinas amarillas',
      tag: 'Paso 06 · Última capa',
      description: 'Una esquina está en su posición cuando sus tres colores pertenecen a los tres centros que la rodean, aunque esté girada.',
      steps: [
        { title: 'Encuentra una esquina en su sitio', text: 'Compara los tres colores de cada esquina con los centros vecinos. Si una es correcta, gira todo el cubo horizontalmente para colocarla arriba, delante y a la derecha. Mantén el amarillo arriba.' },
        { title: 'Cicla las otras tres esquinas', text: 'Aplica U R U′ L′ U R′ U′ L. Revisa si todas las esquinas ya están en su posición; si no, repite desde el mismo frente. Todavía no necesitas que el amarillo apunte arriba.', sequence: { label: 'Colocar tres esquinas', code: 'U R U\' L\' U R\' U\' L', desc: 'La esquina de arriba-delante-derecha permanece en su sitio; las otras tres cambian de posición.' } },
        { title: 'Si ninguna está en su sitio', text: 'Aplica el algoritmo una vez desde cualquier frente. Ahora identifica una esquina correcta, colócala arriba, delante y a la derecha y continúa.' }
      ],
      note: '',
      goal: 'Las cuatro esquinas están entre los centros que corresponden a sus colores. No importa todavía su orientación.'
    },
    {
      title: 'Orienta y termina tu cubo',
      tag: 'Paso 07 · Tu primer cubo resuelto',
      description: 'Este último paso parece desordenar el cubo temporalmente. Sigue el procedimiento completo para recuperar las capas inferiores.',
      steps: [
        { title: '1. Elige una esquina por orientar', text: 'Con amarillo arriba, coloca una esquina que aún no tenga amarillo arriba en la posición superior-frontal-derecha. Fija el frente del cubo y no lo cambies durante todo este paso.' },
        { title: '2. Completa cada ciclo', text: 'Repite R′ D′ R D hasta que el amarillo de esa esquina mire arriba. Haz siempre los cuatro movimientos completos, incluso si el amarillo parece orientarse antes del último giro.' },
        { title: '3. Trae la siguiente con U', text: 'Gira solo la capa U para llevar otra esquina pendiente al mismo lugar superior-frontal-derecho. No gires el cubo entero. Vuelve a repetir el ciclo hasta orientarla. Continúa hasta completar las cuatro esquinas.', sequence: { label: 'Ciclo para girar una esquina', code: 'R\' D\' R D', desc: 'Demostración de un ciclo desde un cubo resuelto. En tu resolución se repite sobre cada esquina pendiente; un solo ciclo NO resuelve la última capa.' } },
        { title: '4. Alinea la última capa', text: 'Cuando todas las esquinas miren arriba, ajusta U para alinear los laterales. Comprueba las seis caras: ¡lo has conseguido!' }
      ],
      note: 'Si cambias de frente o dejas un ciclo incompleto, no se recuperan las capas inferiores. No corrijas las piezas sueltas a mitad del procedimiento.',
      goal: 'Las seis caras del cubo están completas. Practica de nuevo o empieza la ruta Fridrich.'
    }
  ];

  selectLesson(index: number) {
    this.currentLesson = index;
  }

  nextLesson() {
    if (this.currentLesson < this.lessons.length - 1) {
      this.currentLesson++;
    }
  }
}