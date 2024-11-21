import { NgClass, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import {
  Classification,
  classificatonArray,
  Variant,
} from 'src/app/store/variants.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatDividerModule,
    MatRadioModule,
    NgClass,
    NgFor,
    ReactiveFormsModule,
  ],
  selector: 'app-variant-details',
  standalone: true,
  styleUrls: ['./variant-details.component.scss'],
  templateUrl: './variant-details.component.html',
})
export class VariantDetailsComponent {
  @Input() variant: Variant | undefined;

  @Output() changeClassification = new EventEmitter<{
    id: string;
    classification: Classification | undefined;
  }>();

  classificatonValues = classificatonArray;
  classificationValue: number | undefined;

  onChangeClassification(variant: Variant | undefined, value: number) {
    if (!variant?.id) {
      return;
    }
    this.changeClassification.emit({ id: variant.id, classification: value });
  }
}
