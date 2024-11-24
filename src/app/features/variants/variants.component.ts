import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SearchInputComponent } from 'src/app/shared/UI/search-input/search-input.component';
import { SelectVariantId } from 'src/app/store/variants.actions';
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
  ],
})
export class VariantsComponent {
  @Select(VariantsState.variantsSelector) variants$:
    | Observable<Variant[]>
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

  #store: Store = inject(Store);

  onSearch(text: string) {
    console.log('>>>>>>>>>>>> search for ', text);
  }

  onChangeClassification(changeClassification: ChangeClassification) {
    console.log(
      '>>>>>>>>>>>> change variant classificaton',
      changeClassification
    );
  }

  onSelectVariant(selectedVariantId: string) {
    console.log('>>>>>>>>>>>> select  variant id', selectedVariantId);
    this.#store.dispatch(new SelectVariantId({ selectedVariantId }));
  }
}
