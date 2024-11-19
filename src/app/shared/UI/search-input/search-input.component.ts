import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [MatInputModule, FormsModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  @Input() placeholder = 'Search';
  @Output() search = new EventEmitter<string>();
  label = '';

  handleKey(event: any) {
    if (event.keyCode === 13) {
      this.search.emit(this.label);
      // this.label = '';
    }
  }
}
