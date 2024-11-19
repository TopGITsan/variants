import { NgFor, NgIf } from '@angular/common';
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
  imports: [MatListModule, NgIf, NgFor],
})
export class VariantsListComponent {
  @Input() data: Variant[] = [];
  @Output() select = new EventEmitter<Variant>();

  trackVariantBy(index: number, variant: Variant) {
    return variant.id ?? index;
  }
}
