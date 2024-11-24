import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Variant } from 'src/app/store/variants.state';

@Pipe({
  name: 'fuzzy',
  standalone: true,
})
export class FuzzyPipe implements PipeTransform {
  transform(
    variants: KeyValue<string, Variant>[] | null,
    ...args: string[]
  ): KeyValue<string, Variant>[] {
    const filterTerm = args[0];
    if (!variants) {
      return [];
    }
    return filterTerm
      ? variants.filter(
          (variantRecord: KeyValue<string, Variant>) =>
            !!variantRecord.value.name
              .toLowerCase()
              .includes(filterTerm.toLowerCase())
        )
      : variants;
  }
}
