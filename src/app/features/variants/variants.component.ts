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

  filteredVariants$: Observable<[Variant[], string]> | undefined;
  filteredVariantsSubject$ = new Subject<Variant[]>();

  #store: Store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.initWorker();
  }

  private initWorker() {
    const worker = new Worker(new URL('./variants.worker.ts', import.meta.url));

    if (this.variants$ && this.searchText$) {
      combineLatest([this.variants$, this.searchText$])
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(([variants, searchText]) => {
          worker.postMessage({ variants, searchText });
        });
    }
    worker.onmessage = ({ data }) => {
      // console.log('page got message from worker: ', data);
      this.filteredVariantsSubject$.next(data);
    };
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
