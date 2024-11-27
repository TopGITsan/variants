import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { of, tap } from 'rxjs';
import {
  ChangeVariantClassification,
  DummyAction,
  LoadVariants,
  LoadVariantsFailure,
  LoadVariantsSuccess,
  SearchText,
  SelectVariantId,
} from './variants.actions';

// interfaces
export interface Variant {
  id: string;
  name: string;
  gene: string;
  location: string;
  variantType: string;
  frequency: string;
  pathogenicity: string;
  exon?: number;
  clinicalSignificance?: string;
  references?: string[];
  classification?: Classification;
}

export enum Classification {
  'Benign',
  'Likely Benign',
  'Uncertain Significance',
  'Likely Pathogenic',
  'Pathogenic',
}
export type ClassificationKey = keyof typeof Classification;
export const classificatonArray: Array<ClassificationKey> = Object.values(
  Classification
).filter((val): val is ClassificationKey => typeof val === 'string');

export interface VariantsStateModel {
  variants: Variant[];
  // for fast lookups when selecting a variant
  variantsArrayPos: Record<string, number>;
  selectedVariantId: string | null;
  loading: boolean;
  searchText: string;
}
// state
@Injectable()
@State<VariantsStateModel>({
  name: 'variants',
  defaults: {
    variants: [],
    variantsArrayPos: {},
    selectedVariantId: null,
    loading: false,
    searchText: '',
  },
})
export class VariantsState {
  constructor(private store: Store) {
    // console.log(this.generateVariantBatch());
    console.log('>>>>>>> Store init');
  }
  // Memoized selectors
  @Selector()
  static dummySelector(state: VariantsStateModel): Variant[] {
    // demo selector
    return state.variants;
  }
  @Selector()
  static variantsSelector(state: VariantsStateModel): Variant[] {
    return state.variants;
  }
  @Selector()
  static selectedVariantIdSelector(state: VariantsStateModel): string | null {
    return state.selectedVariantId;
  }

  @Selector()
  static loadingSelector(state: VariantsStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static selectedVariantSelector(state: VariantsStateModel): Variant | null {
    if (!state.selectedVariantId) {
      return null;
    }
    const position = state.variantsArrayPos[state.selectedVariantId];
    if (isNaN(position)) {
      return null;
    }

    return state.variants.at(position) ?? null;
  }

  @Selector()
  static searchTextSelector(state: VariantsStateModel): string {
    return state.searchText;
  }
  // listen to actions
  @Action(DummyAction)
  getData(ctx: StateContext<VariantsStateModel>) {
    return of(this.generateVariantBatch()).pipe(
      tap(([variants, variantsArrayPos]) => {
        console.log('>>>>>>>>>> tap into DummyAction', {
          variants,
          variantsArrayPos,
        });
        ctx.setState(
          patch({
            variants,
            variantsArrayPos,
          })
        );
      })
    );
  }

  @Action(LoadVariants)
  // handleLoadVariants(ctx: StateContext<VariantsStateModel>) {
  //   ctx.setState(
  //     patch({
  //       loading: true,
  //     })
  //   );
  //   return from(
  //     new Promise<[Variant[], Record<string, number>]>((resolve, reject) => {
  //       try {
  //         const [variants, variantsArrayPos] = this.generateVariantBatch();
  //         resolve([variants, variantsArrayPos]);
  //       } catch (error) {
  //         reject('Create batch error');
  //       }
  //     })
  //   ).pipe(
  //     switchMap(([variants, variantsArrayPos]) =>
  //       ctx.dispatch(new LoadVariantsSuccess({ variants, variantsArrayPos }))
  //     ),
  //     catchError((_) => ctx.dispatch(new LoadVariantsFailure()))
  //   );
  // }
  handleLoadVariants(ctx: StateContext<VariantsStateModel>) {
    ctx.setState(
      patch({
        loading: true,
      })
    );
    try {
      // simulate a backend call
      setTimeout(() => {
        const startTime = performance.now();

        const [variants, variantsArrayPos] = this.generateVariantBatch();
        const endTime = performance.now();
        console.log(
          `>>>> Creating a batch of variants took ${endTime - startTime} ms`
        );
        ctx.dispatch(new LoadVariantsSuccess({ variants, variantsArrayPos }));
      }, 1000);
    } catch (error) {
      ctx.dispatch(new LoadVariantsFailure());
    }
  }

  @Action(LoadVariantsSuccess)
  handleLoadVariantsSuccess(
    ctx: StateContext<VariantsStateModel>,
    { payload }: LoadVariantsSuccess
  ) {
    ctx.setState(
      patch({
        variants: payload.variants,
        variantsArrayPos: payload.variantsArrayPos,
        loading: false,
      })
    );
  }

  @Action(LoadVariantsFailure)
  handleLoadVariantsFailure(ctx: StateContext<VariantsStateModel>) {
    ctx.setState(
      patch({
        loading: false,
      })
    );
  }

  @Action(SelectVariantId)
  handleSelectVariatId(
    ctx: StateContext<VariantsStateModel>,
    { payload }: SelectVariantId
  ) {
    ctx.setState(
      patch({
        selectedVariantId: payload.selectedVariantId,
      })
    );
  }

  @Action(ChangeVariantClassification)
  handleUpdateVariantClassification(
    ctx: StateContext<VariantsStateModel>,
    { payload }: ChangeVariantClassification
  ) {
    const startTime = performance.now();

    const variants = ctx.getState().variants;
    const position =
      ctx.getState().variantsArrayPos[payload.changeVariantClassification.id];

    const variant: Variant | undefined = variants.at(position);
    if (!variant) {
      return;
    }
    const updatedVariant = {
      ...variant,
      classification: payload.changeVariantClassification.classification,
    };
    const updatedVariants = [
      ...variants.slice(0, position),
      updatedVariant,
      ...variants.slice(position + 1),
    ];
    const endTime = performance.now();
    console.log(
      `>>>> Updating a variant from the batch took ${endTime - startTime} ms`
    );

    ctx.setState(
      patch({
        // variants.map((item, index) => index === position ? updatedVariant : item); // O(n)
        variants: updatedVariants,
      })
    );
  }

  @Action(SearchText)
  handleSeachText(
    ctx: StateContext<VariantsStateModel>,
    { payload }: SearchText
  ) {
    ctx.setState(
      patch({
        searchText: payload.searchText.toLowerCase(),
      })
    );
  }

  private generateVariantBatch(): [Variant[], Record<string, number>] {
    const variants: Variant[] = [];
    const variantsArrayPos: Record<string, number> = {};
    for (let i = 0; i < 100000; i++) {
      const variant = this.generateVariant();
      variants.push(variant);
      variantsArrayPos[variant.id] = i;
    }
    return [variants, variantsArrayPos];
  }

  private generateVariant(): Variant {
    return {
      id: faker.string.uuid(),
      name: `Variant ${faker.lorem.word()}`,
      gene: faker.lorem.word(),
      location: `Chromosome ${faker.number.int(22)}:${faker.number.int(
        1000000
      )}`,
      variantType: faker.helpers.arrayElement([
        'Missense Mutation',
        'Frameshift Deletion',
        'Insertion',
      ]),
      frequency: `${faker.number.int({ min: 1, max: 10 }) / 100}%`,
      pathogenicity: faker.helpers.arrayElement([
        'Benign',
        'Likely Benign',
        'Uncertain Significance',
        'Likely Pathogenic',
        'Pathogenic',
      ]),
      exon: faker.number.int({ min: 1, max: 20 }),
      clinicalSignificance: faker.lorem.sentence(),
      references: [faker.string.uuid(), faker.string.uuid()],
    };
  }
}
