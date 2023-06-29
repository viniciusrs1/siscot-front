import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccompanimentComponent } from './edit-accompaniment.component';

describe('EditAccompanimentComponent', () => {
  let component: EditAccompanimentComponent;
  let fixture: ComponentFixture<EditAccompanimentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAccompanimentComponent]
    });
    fixture = TestBed.createComponent(EditAccompanimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
