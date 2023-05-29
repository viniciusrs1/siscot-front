import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccompanimentComponent } from './add-accompaniment.component';

describe('AddAccompanimentComponent', () => {
  let component: AddAccompanimentComponent;
  let fixture: ComponentFixture<AddAccompanimentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAccompanimentComponent]
    });
    fixture = TestBed.createComponent(AddAccompanimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
