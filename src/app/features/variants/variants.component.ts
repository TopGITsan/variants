import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest } from 'rxjs';
import { SearchInputComponent } from 'src/app/shared/UI/search-input/search-input.component';
import { StoreFacadeService } from 'src/app/store/store-facade.service';
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
  private readonly variantsWorkerService = inject(VariantsWorkerService);
  filteredVariants$ = this.variantsWorkerService.filteredVariants$;

  private readonly storeFacade = inject(StoreFacadeService);
  private readonly destroyRef = inject(DestroyRef);
  readonly variants$ = this.storeFacade.variants$;

  readonly selectedVariantId$ = this.storeFacade.selectedVariantId$;

  readonly selectedVariant$ = this.storeFacade.selectedVariant$;

  readonly loading$ = this.storeFacade.loading$;
  readonly searchText$ = this.storeFacade.searchText$;

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
          this.variantsWorkerService.sendMessage({ variants, searchText });
        });
    }
  }

  onSearch(searchText: string) {
    this.storeFacade.onSearch(searchText);
  }

  onChangeClassification(changeVariantClassification: ChangeClassification) {
    this.storeFacade.onChangeClassification(changeVariantClassification);
  }

  onSelectVariant(selectedVariantId: string) {
    this.storeFacade.onSelectVariant(selectedVariantId);
  }

  onLoadMoreVariants(): void {
    this.storeFacade.onLoadVariants();
  }
}
