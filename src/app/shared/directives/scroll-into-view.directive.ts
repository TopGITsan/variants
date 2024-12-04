import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appScrollIntoView]',
  standalone: true,
})
export class ScrollIntoViewDirective implements OnInit, OnDestroy {
  @Output()
  appScrollIntoView = new EventEmitter<void>();

  elRef = inject(ElementRef);
  observer: IntersectionObserver | undefined;

  ngOnInit(): void {
    this.initObserver();
  }
  ngOnDestroy(): void {
    //  disconnect the observer
    this.observer?.disconnect();
  }

  private initObserver() {
    // we create an IntersectionObserver instance
    this.observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        // we listen to all of its changes
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.appScrollIntoView.emit();
          }
        });
      }
    );
    // If the target element is intersecting with the viewport, we emit a scrollIntoView event
    this.observer.observe(this.elRef.nativeElement);
  }
}
