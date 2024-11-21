import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchInputComponent } from 'src/app/shared/UI/search-input/search-input.component';
import { VariantDetailsComponent } from './UI/variant-details/variant-details.component';
import { VariantsListComponent } from './UI/variants-list/variants-list.component';
import { ChangeClassification } from './interface/variant.interface';
import { Variant, VariantsState } from 'src/app/store/variants.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DummyAction } from 'src/app/store/variants.actions';

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
    AsyncPipe,
  ],
})
export class VariantsComponent {
  @Select(VariantsState.dummySelector) variants$:
    | Observable<Variant[]>
    | undefined;

  constructor(private readonly store: Store) {
    this.store.dispatch(new DummyAction());
  }

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
