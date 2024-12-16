import { Injectable } from '@angular/core';
import { fromEvent, map, Subject, takeUntil, tap } from 'rxjs';
import { injectDestroy } from 'src/app/shared/utils/inject-destroy';
import { Variant } from 'src/app/store/variants.state';

@Injectable({
  providedIn: 'root',
})
export class VariantsWorkerService {
  private readonly worker = new Worker(
    new URL('../variants.worker.ts', import.meta.url)
  );
  private readonly filteredVariantsSubject = new Subject<Variant[]>();
  readonly filteredVariants$ = this.filteredVariantsSubject.asObservable();
  private readonly destroy$ = injectDestroy();

  constructor() {
    this.setupService();
  }

  private waitForMessage() {
    return fromEvent<MessageEvent>(this.worker, 'message').pipe(
      map((msg) => msg.data), // get data from event
      tap((result: Variant[]) =>
        console.log('[Worker service] message event length: ', result.length)
      )
    );
  }

  sendMessage(data: { variants: Variant[] | null; searchText: string }) {
    this.worker.postMessage(data);
  }

  private setupService() {
    this.waitForMessage()
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.filteredVariantsSubject);
  }
}
