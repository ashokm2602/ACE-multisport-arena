import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Role } from '../shared/models/arena.models';

export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService); const router = inject(Router);
  return auth.isAuthenticated() || router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
export const roleGuard: CanActivateFn = route => {
  const auth = inject(AuthService); const router = inject(Router);
  const allowed = route.data['roles'] as Role[] | undefined;
  const user = auth.currentUser();
  if (!user) return router.createUrlTree(['/login']);
  return !allowed || allowed.includes(user.role) || router.createUrlTree(['/']);
};
