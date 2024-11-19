import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VariantsListComponent } from './UI/variants-list/variants-list.component';
import { SearchInputComponent } from 'src/app/shared/UI/search-input/search-input.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-variants',
  standalone: true,
  styleUrls: ['./variants.component.scss'],
  templateUrl: './variants.component.html',
  imports: [VariantsListComponent, SearchInputComponent],
})
export class VariantsComponent {
  onSearch(text: string) {
    console.log('>>>>>>>>>>>> search for ', text);
  }
}
