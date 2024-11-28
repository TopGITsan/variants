import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, map, Subject, takeUntil, tap } from 'rxjs';
import { Variant } from 'src/app/store/variants.state';

@Injectable({
  providedIn: 'root',
})
export class VariantsWorkerService implements OnDestroy {
  private readonly worker = new Worker(
    new URL('../variants.worker.ts', import.meta.url)
  );
  private readonly filteredVariantsSubject = new Subject<Variant[]>();
  readonly filteredVariants$ = this.filteredVariantsSubject.asObservable();
  private readonly destroy$ = new Subject<void>();

  constructor() {
    this.setupService();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private waitForMessage() {
    return fromEvent<MessageEvent>(this.worker, 'message').pipe(
      map((msg) => msg.data), // get data from event
      tap((result: Variant[]) =>
        console.log('[Worker service] message event: ', result)
      )
    );
  }

  sendMessage(data: { variants: Variant[]; searchText: string }) {
    this.worker.postMessage(data);
  }

  private setupService() {
    this.waitForMessage()
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.filteredVariantsSubject);
  }
}
