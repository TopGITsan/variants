import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { StoreFacadeService } from '../store/store-facade.service';

export const canActivateVariantsGuard: CanActivateFn = (route, state) => {
  const storeFacade = inject(StoreFacadeService);
  storeFacade.onLoadVariants();

  return true;
};
