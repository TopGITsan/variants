import { Classification } from 'src/app/store/variants.state';

export interface ChangeClassification {
  id: string;
  classification: Classification | undefined;
}
