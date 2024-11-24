import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Variant } from 'src/app/store/variants.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-variants-list',
  standalone: true,
  styleUrls: ['./variants-list.component.scss'],
  templateUrl: './variants-list.component.html',
  imports: [MatListModule, NgIf, ScrollingModule, NgClass],
})
export class VariantsListComponent {
  @Input() data: Variant[] | null = [];
  @Input() selectedVariantId?: string | null;
  @Output() select = new EventEmitter<string>();

  trackVariantBy(index: number, variant: Variant) {
    return variant.id ?? String(index);
  }

  onSelectVariant(variant: Variant) {
    if (!variant.id) {
      return;
    }

    this.select.emit(variant.id);
  }
}
