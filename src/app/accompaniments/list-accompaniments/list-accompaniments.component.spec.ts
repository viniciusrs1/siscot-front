import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccompanimentsComponent } from './list-accompaniments.component';

describe('ListAccompanimentsComponent', () => {
  let component: ListAccompanimentsComponent;
  let fixture: ComponentFixture<ListAccompanimentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAccompanimentsComponent]
    });
    fixture = TestBed.createComponent(ListAccompanimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
