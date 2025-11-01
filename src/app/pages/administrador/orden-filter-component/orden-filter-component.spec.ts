import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenFilterComponent } from './orden-filter-component';

describe('OrdenFilterComponent', () => {
  let component: OrdenFilterComponent;
  let fixture: ComponentFixture<OrdenFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
