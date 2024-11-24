import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoadVariants } from '../store/variants.actions';

export const canActivateVariantsGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  store.dispatch(new LoadVariants());

  return true;
};
