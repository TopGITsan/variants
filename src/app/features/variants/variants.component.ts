import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VariantsListComponent } from './UI/variants-list/variants-list.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-variants',
  standalone: true,
  styleUrls: ['./variants.component.scss'],
  templateUrl: './variants.component.html',
  imports: [VariantsListComponent],
})
export class VariantsComponent {}
