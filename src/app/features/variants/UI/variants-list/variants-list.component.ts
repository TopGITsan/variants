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
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-variants-list',
  standalone: true,
  styleUrls: ['./variants-list.component.scss'],
  templateUrl: './variants-list.component.html',
  imports: [MatListModule, NgIf, ScrollingModule],
})
export class VariantsListComponent {
  @Input() data: Variant[] = [];
  @Output() select = new EventEmitter<Variant>();

  trackVariantBy(index: number, variant: Variant) {
    return variant.id ?? String(index);
  }
}
