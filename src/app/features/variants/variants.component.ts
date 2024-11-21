import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchInputComponent } from 'src/app/shared/UI/search-input/search-input.component';
import { VariantDetailsComponent } from './UI/variant-details/variant-details.component';
import { VariantsListComponent } from './UI/variants-list/variants-list.component';
import { ChangeClassification } from './interface/variant.interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-variants',
  standalone: true,
  styleUrls: ['./variants.component.scss'],
  templateUrl: './variants.component.html',
  imports: [
    SearchInputComponent,
    VariantDetailsComponent,
    VariantsListComponent,
  ],
})
export class VariantsComponent {
  onSearch(text: string) {
    console.log('>>>>>>>>>>>> search for ', text);
  }

  onChangeClassification(newVariantClassification: ChangeClassification) {
    console.log(
      '>>>>>>>>>>>> change variant classificaton',
      newVariantClassification
    );
  }
}
