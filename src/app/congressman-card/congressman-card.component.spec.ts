import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongressmanCardComponent } from './congressman-card.component';

describe('CongressmanCardComponent', () => {
  let component: CongressmanCardComponent;
  let fixture: ComponentFixture<CongressmanCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongressmanCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongressmanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
