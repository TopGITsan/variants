import { inject, Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Variant } from 'src/app/store/variants.state';
import { VariantsWorkerService } from '../service/variants-worker.service';

@Pipe({
  name: 'appSearch',
  standalone: true,
  pure: true,
})
export class SearchPipe implements PipeTransform {
  /**
   * Use worker for parallel processing (background processing) without freezing the UI thread
   */
  private readonly variantsWorkerService = inject(VariantsWorkerService);

  transform(value: Variant[] | null, ...args: string[]): Observable<Variant[]> {
    const searchText = args[0];

    this.variantsWorkerService.sendMessage({ variants: value, searchText });
    return this.variantsWorkerService.filteredVariants$;
  }
}
