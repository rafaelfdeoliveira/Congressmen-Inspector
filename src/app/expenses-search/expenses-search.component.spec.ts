import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesSearchComponent } from './expenses-search.component';

describe('ExpensesSearchComponent', () => {
  let component: ExpensesSearchComponent;
  let fixture: ComponentFixture<ExpensesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
