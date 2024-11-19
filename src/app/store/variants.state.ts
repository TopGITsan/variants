import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { DummyAction } from './variants.actions';
import { faker } from '@faker-js/faker';

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

enum Classification {
  'Benign',
  'Likely Benign',
  'Uncertain Significance',
  'Likely Pathogenic',
  'Pathogenic',
}

export interface VariantsStateModel {
  variants: Variant[];
}

@Injectable()
@State<VariantsStateModel>({
  name: 'variants',
  defaults: {
    variants: [],
  },
})
export class VariantsState {
  constructor() {
    console.log(this.generateVariantBatch());
  }

  @Selector()
  static dummySelector(state: VariantsStateModel): Variant[] {
    return state.variants;
  }

  @Action(DummyAction)
  getData(ctx: StateContext<VariantsStateModel>): void {}

  private generateVariantBatch(): Variant[] {
    const variants: Variant[] = [];
    for (let i = 0; i < 10000; i++) {
      const variant = this.generateVariant();
      variants.push(variant);
    }
    return variants;
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
