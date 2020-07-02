import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductspecificationComponent } from './productspecification.component';

describe('ProductspecificationComponent', () => {
  let component: ProductspecificationComponent;
  let fixture: ComponentFixture<ProductspecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductspecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductspecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
