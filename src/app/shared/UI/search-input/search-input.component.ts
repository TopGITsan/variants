import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { injectDestroy } from '../../utils/inject-destroy';
@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent implements OnInit {
  private readonly destroy$ = injectDestroy();
  private readonly fb = inject(NonNullableFormBuilder);
  searchFormControl = this.fb.control('');
  @Input() placeholder = 'Search';
  @Output() search = new EventEmitter<string>();

  ngOnInit(): void {
    this.searchFormControl.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(500), distinctUntilChanged())
      .subscribe((text) => this.search.emit(text));
  }
}
