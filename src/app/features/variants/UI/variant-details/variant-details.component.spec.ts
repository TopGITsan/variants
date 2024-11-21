import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantDetailsComponent } from './variant-details.component';

describe('VariantDetailsComponent', () => {
  let component: VariantDetailsComponent;
  let fixture: ComponentFixture<VariantDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VariantDetailsComponent]
    });
    fixture = TestBed.createComponent(VariantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
