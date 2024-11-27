import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [MatInputModule, FormsModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent implements AfterViewInit {
  @Input() placeholder = 'Search';
  @Output() search = new EventEmitter<string>();
  @ViewChild('inputSearchText') inputSearchText:
    | ElementRef<HTMLInputElement>
    | undefined;

  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    this.initFromEventInput();
  }

  /**
   * Using debouncing to make sure the search is performed less frequently
   */
  private initFromEventInput() {
    const inputSearchTextElement = this.inputSearchText?.nativeElement;
    if (inputSearchTextElement) {
      fromEvent(inputSearchTextElement, 'input')
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          debounceTime(650),
          map((event) => (event.target as HTMLInputElement).value),
          distinctUntilChanged()
        )
        .subscribe((value) => this.onChangeSearchText(value));
    }
  }

  onChangeSearchText(text: string): void {
    this.search.emit(text);
  }
}
