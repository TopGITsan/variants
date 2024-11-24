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
      variants: Variant[];
      variantsArrayPos: Record<string, number>;
    }
  ) {}
}

export class LoadVariantsFailure {
  static readonly type = '[Variants] Load variants failure action';
  constructor() {}
}

export class SelectVariantId {
  static readonly type = '[Variants] Selected variat id';
  constructor(public payload: { selectedVariantId: string }) {}
}
