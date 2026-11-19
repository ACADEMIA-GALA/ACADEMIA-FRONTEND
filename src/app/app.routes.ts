import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BeginnersComponent } from './pages/beginners/beginners.component';
import { FridrichComponent } from './pages/fridrich/fridrich.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { GuideComponent } from './pages/guide/guide.component';
import { PracticeComponent } from './pages/practice/practice.component';
import { AccessComponent } from './pages/access/access.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { AdminPagosComponent } from './pages/admin/admin-pagos.component';
import { AdminVideosComponent } from './pages/admin/admin-videos.component';

import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  // ============================================================
  // PÚBLICAS SIN LAYOUT (pantalla completa)
  // ============================================================
  { path: 'login',    component: LoginComponent,    canActivate: [guestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },

  // ============================================================
  // CON LAYOUT (sidebar + header)
  // ============================================================
  {
    path: '',
    component: LayoutComponent,
    children: [

      // ---------- PÚBLICAS ----------
      { path: '',              component: DashboardComponent },
      { path: 'principiante',  component: BeginnersComponent },
      { path: 'movimientos',   component: GuideComponent },
      { path: 'practica',      component: PracticeComponent },

      // ---------- REQUIEREN LOGIN (usuario) ----------
      { path: 'fridrich',      component: FridrichComponent, canActivate: [authGuard] },
      { path: 'acceso',        component: AccessComponent,   canActivate: [authGuard] },
      { path: 'progreso',      component: ProgressComponent, canActivate: [authGuard] },

      // ---------- REGISTRAR PAGO (cualquier logueado) ----------
      { path: 'pagos',         component: PaymentsComponent, canActivate: [authGuard] },

      // ---------- SOLO ADMIN ----------
      { path: 'admin/pagos',   component: AdminPagosComponent,  canActivate: [authGuard, adminGuard] },
      { path: 'admin/videos',  component: AdminVideosComponent, canActivate: [authGuard, adminGuard] },
    ]
  },

  // ============================================================
  // COMODÍN
  // ============================================================
  { path: '**', redirectTo: '' }
];