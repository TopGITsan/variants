import { ScrollingModule } from '@angular/cdk/scrolling';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ScrollIntoViewDirective } from 'src/app/shared/directives/scroll-into-view.directive';
import { Variant } from 'src/app/store/variants.state';
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-variants-list',
  standalone: true,
  styleUrls: ['./variants-list.component.scss'],
  templateUrl: './variants-list.component.html',
  imports: [
    AsyncPipe,
    MatListModule,
    NgClass,
    NgIf,
    ScrollingModule,
    ScrollIntoViewDirective,
    SearchPipe,
  ],
})
export class VariantsListComponent {
  @Input() data: Variant[] | null = [];
  @Input() selectedVariantId?: string | null;
  @Input() searchText?: string | null = '';
  @Input() loading: boolean | null = false;

  @Output() select = new EventEmitter<string>();
  @Output() loadMoreVariants = new EventEmitter<void>();

  trackVariantBy(index: number, variant: Variant) {
    return variant.id ?? String(index);
  }

  onSelectVariant(variant: Variant) {
    this.select.emit(variant.id);
  }

  onScrollLastIntoView(what: any) {
    this.loadMoreVariants.emit();
  }
}
