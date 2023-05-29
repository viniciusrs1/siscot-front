import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAccompanimentComponent } from './form-accompaniment.component';

describe('FormAccompanimentComponent', () => {
  let component: FormAccompanimentComponent;
  let fixture: ComponentFixture<FormAccompanimentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAccompanimentComponent]
    });
    fixture = TestBed.createComponent(FormAccompanimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
