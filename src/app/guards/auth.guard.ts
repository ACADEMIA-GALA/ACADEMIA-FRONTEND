import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.currentUser()) {
    return true;
  }

  // Redirige al login recordando la ruta a la que quería ir
  router.navigate(['/login'], { queryParams: { returnUrl: router.url } });
  return false;
};