import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, Subject } from 'rxjs';
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
import { VariantsWorkerService } from './service/variants-worker.service';

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

  private readonly variantsWorkerService = inject(VariantsWorkerService);
  filteredVariants$ = this.variantsWorkerService.filteredVariants$;

  #store: Store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.initCombineLatest();
  }
  /**
   * Use worker for parallel processing (background processing) without freezing the UI thread
   */

  initCombineLatest() {
    if (this.variants$ && this.searchText$) {
      combineLatest([this.variants$, this.searchText$])
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(([variants, searchText]) => {
          // console.log('>>>> send ', { searchText });
          this.variantsWorkerService.sendMessage({ variants, searchText });
        });
    }
  }

  onSearch(searchText: string) {
    // console.log('>>>>>>>>>>>> search for ', searchText);
    this.#store.dispatch(new SearchText({ searchText }));
  }

  onChangeClassification(changeVariantClassification: ChangeClassification) {
    // console.log(
    //   '>>>>>>>>>>>> change variant classificaton',
    //   changeVariantClassification
    // );
    this.#store.dispatch(
      new ChangeVariantClassification({ changeVariantClassification })
    );
  }

  onSelectVariant(selectedVariantId: string) {
    // console.log('>>>>>>>>>>>> select  variant id', selectedVariantId);
    this.#store.dispatch(new SelectVariantId({ selectedVariantId }));
  }
}
