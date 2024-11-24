import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SearchInputComponent } from 'src/app/shared/UI/search-input/search-input.component';
import {
  ChangeVariantClassification,
  SearchText,
  SelectVariantId,
} from 'src/app/store/variants.actions';
import { Variant, VariantsState } from 'src/app/store/variants.state';
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
    AsyncPipe,
    JsonPipe,
  ],
})
export class VariantsComponent {
  @Select(VariantsState.variantsRecordSelector) variantsRecord$:
    | Observable<Record<string, Variant>>
    | undefined;

  @Select(VariantsState.selectedVariantIdSelector) selectedVariantId$:
    | Observable<string | null>
    | undefined;

  @Select(VariantsState.selectedVariantSelector) selectedVariant$:
    | Observable<Variant | null>
    | undefined;

  @Select(VariantsState.loadingSelector) loading$:
    | Observable<boolean>
    | undefined;

  @Select(VariantsState.searchTextSelector) searchText$:
    | Observable<string>
    | undefined;

  #store: Store = inject(Store);

  onSearch(searchText: string) {
    console.log('>>>>>>>>>>>> search for ', searchText);
    this.#store.dispatch(new SearchText({ searchText }));
  }

  onChangeClassification(changeVariantClassification: ChangeClassification) {
    console.log(
      '>>>>>>>>>>>> change variant classificaton',
      changeVariantClassification
    );
    this.#store.dispatch(
      new ChangeVariantClassification({ changeVariantClassification })
    );
  }

  onSelectVariant(selectedVariantId: string) {
    console.log('>>>>>>>>>>>> select  variant id', selectedVariantId);
    this.#store.dispatch(new SelectVariantId({ selectedVariantId }));
  }
}
