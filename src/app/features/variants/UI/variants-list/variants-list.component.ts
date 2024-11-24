import { ScrollingModule } from '@angular/cdk/scrolling';
import { KeyValuePipe, NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { FuzzyPipe } from 'src/app/shared/pipe/fuzzy-search.pipe';
import { isEmptyObject } from 'src/app/shared/utils/empty-object.function';
import { Variant } from 'src/app/store/variants.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-variants-list',
  standalone: true,
  styleUrls: ['./variants-list.component.scss'],
  templateUrl: './variants-list.component.html',
  imports: [
    MatListModule,
    NgIf,
    ScrollingModule,
    NgClass,
    KeyValuePipe,
    FuzzyPipe,
  ],
})
export class VariantsListComponent {
  @Input() data?: Record<string, Variant> | null;

  @Input() selectedVariantId?: string | null;
  @Input() loading: boolean | null = false;
  @Input() searchText: string | null = '';

  @Output() select = new EventEmitter<string>();

  isEmpty = isEmptyObject;

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
