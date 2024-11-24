import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { combineLatest, map, Observable } from 'rxjs';
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
  ],
})
export class VariantsComponent implements OnInit {
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

  filteredVariants$: Observable<Variant[]> | undefined;

  #store: Store = inject(Store);

  ngOnInit(): void {
    if (this.variants$ && this.searchText$) {
      this.filteredVariants$ = combineLatest([
        this.variants$,
        this.searchText$,
      ]).pipe(
        map(([variants, searchText]) =>
          searchText
            ? variants?.filter((variant) =>
                variant.name.toLowerCase().includes(searchText)
              )
            : variants
        )
      );
    }
  }

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
