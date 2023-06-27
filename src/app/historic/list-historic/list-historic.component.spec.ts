import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistoricComponent } from './list-historic.component';

describe('ListHistoricComponent', () => {
  let component: ListHistoricComponent;
  let fixture: ComponentFixture<ListHistoricComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListHistoricComponent]
    });
    fixture = TestBed.createComponent(ListHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
