import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsAreaComponent } from './results-area.component';

describe('ResultsAreaComponent', () => {
  let component: ResultsAreaComponent;
  let fixture: ComponentFixture<ResultsAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
