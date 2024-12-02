import { inject, Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { VariantsState, Variant } from './variants.state';
import {
  ChangeVariantClassification,
  LoadVariants,
  SearchText,
  SelectVariantId,
} from './variants.actions';
import { ChangeClassification } from '../features/variants/interface/variant.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreFacadeService {
  private readonly store = inject(Store);

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

  @Select(VariantsState.searchTextSelector) searchText$:
    | Observable<string>
    | undefined;

  onSearch(searchText: string): void {
    // console.log('>>>>>>>>>>>> search for ', searchText);
    this.store.dispatch(new SearchText({ searchText }));
  }

  onChangeClassification(
    changeVariantClassification: ChangeClassification
  ): void {
    // console.log(
    //   '>>>>>>>>>>>> change variant classificaton',
    //   changeVariantClassification
    // );
    if (!changeVariantClassification.id) {
      return;
    }
    this.store.dispatch(
      new ChangeVariantClassification({ changeVariantClassification })
    );
  }

  onSelectVariant(selectedVariantId: string): void {
    // console.log('>>>>>>>>>>>> select  variant id', selectedVariantId);
    this.store.dispatch(new SelectVariantId({ selectedVariantId }));
  }

  onLoadVariants(): void {
    this.store.dispatch(new LoadVariants());
  }
}
