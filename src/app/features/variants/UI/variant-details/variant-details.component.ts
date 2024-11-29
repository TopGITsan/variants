import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import {
  Classification,
  classificatonArray,
  Variant,
} from 'src/app/store/variants.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDividerModule,
    MatRadioModule,
    NgClass,
    NgFor,
    NgIf,
    ReactiveFormsModule,
  ],
  selector: 'app-variant-details',
  standalone: true,
  styleUrls: ['./variant-details.component.scss'],
  templateUrl: './variant-details.component.html',
})
export class VariantDetailsComponent implements OnChanges {
  classificationFormControl = new FormControl<Classification | null>(null);
  @Input() variant?: Variant | null;

  @Output() changeClassification =
    this.classificationFormControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((classification) => ({
        id: this.variant?.id ?? null,
        classification: classification ?? undefined,
      }))
    );
  classificatonValues = classificatonArray;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['variant']) {
      this.classificationFormControl.setValue(
        this.variant?.classification ?? null
      );
    }
  }
}
