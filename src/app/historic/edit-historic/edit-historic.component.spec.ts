import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHistoricComponent } from './edit-historic.component';

describe('EditHistoricComponent', () => {
  let component: EditHistoricComponent;
  let fixture: ComponentFixture<EditHistoricComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditHistoricComponent]
    });
    fixture = TestBed.createComponent(EditHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
