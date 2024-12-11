import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective implements OnInit {
  private readonly elRef = inject<ElementRef<HTMLElement> | null>(ElementRef);
  private readonly defaultColor = 'yellow';
  @Input()
  appHighlight: string | undefined;

  ngOnInit(): void {
    this.highlight(this.appHighlight);
  }

  private highlight(color: string | undefined) {
    if (!this.elRef?.nativeElement) {
      return;
    }
    this.elRef.nativeElement.style.color = color || this.defaultColor;
  }
}
