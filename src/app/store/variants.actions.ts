import { ChangeClassification } from '../features/variants/interface/variant.interface';
import { Variant } from './variants.state';

// demo action
export class DummyAction {
  static readonly type = '[Variants] Dummy action';
  constructor() {}
}
// variant actions
export class LoadVariants {
  static readonly type = '[Variants] Load variants action';
  constructor() {}
}

export class LoadVariantsSuccess {
  static readonly type = '[Variants] Load variants success action';
  constructor(
    public payload: {
      variantsRecord: Record<string, Variant>;
    }
  ) {}
}

export class LoadVariantsFailure {
  static readonly type = '[Variants] Load variants failure action';
  constructor() {}
}

export class SelectVariantId {
  static readonly type = '[Variants] Selected variant id action';
  constructor(public payload: { selectedVariantId: string }) {}
}

export class ChangeVariantClassification {
  static readonly type = '[Variants] Update variant classification action';
  constructor(
    public payload: { changeVariantClassification: ChangeClassification }
  ) {}
}

export class SearchText {
  static readonly type = '[Variants] Search text';
  constructor(public payload: { searchText: string }) {}
}
