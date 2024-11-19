import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantsListComponent } from './variants-list.component';

describe('VariantsListComponent', () => {
  let component: VariantsListComponent;
  let fixture: ComponentFixture<VariantsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VariantsListComponent]
    });
    fixture = TestBed.createComponent(VariantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
