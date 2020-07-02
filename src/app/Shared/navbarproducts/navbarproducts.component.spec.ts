import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarproductsComponent } from './navbarproducts.component';

describe('NavbarproductsComponent', () => {
  let component: NavbarproductsComponent;
  let fixture: ComponentFixture<NavbarproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
