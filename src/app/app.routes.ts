import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { BeginnersComponent } from './pages/beginners/beginners.component';
import { FridrichComponent } from './pages/fridrich/fridrich.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { GuideComponent } from './pages/guide/guide.component';
import { PracticeComponent } from './pages/practice/practice.component'; // 👈 Importado
import { AccessComponent } from './pages/access/access.component'; // 👈 Importado

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'principiante', component: BeginnersComponent },
      { path: 'fridrich', component: FridrichComponent },
      { path: 'movimientos', component: GuideComponent },
      { path: 'practica', component: PracticeComponent }, // 👈 Ruta Zona de práctica
      { path: 'acceso', component: AccessComponent }, // 👈 Ruta Acceso por etapas
      { path: 'pagos', component: PaymentsComponent },
      { path: 'progreso', component: ProgressComponent },
    ]
  }
];