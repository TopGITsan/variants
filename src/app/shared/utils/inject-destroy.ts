import {
  assertInInjectionContext,
  DestroyRef,
  inject,
  Injector,
  runInInjectionContext,
} from '@angular/core';
import { ReplaySubject } from 'rxjs';

export const injectDestroy = (): ReplaySubject<void> & {
  onDestroy: DestroyRef['onDestroy'];
} => {
  assertInInjectionContext(injectDestroy);

  const injector = inject(Injector);

  return runInInjectionContext(injector, () => {
    const destroyRef = inject(DestroyRef);
    const subject$ = new ReplaySubject<void>(1);

    destroyRef.onDestroy(() => {
      subject$.next();
      subject$.complete();
    });

    Object.assign(subject$, {
      onDestroy: destroyRef.onDestroy.bind(destroyRef),
    });

    return subject$ as ReplaySubject<void> & {
      onDestroy: DestroyRef['onDestroy'];
    };
  });
};
