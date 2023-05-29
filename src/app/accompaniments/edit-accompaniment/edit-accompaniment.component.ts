import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PatientsService } from 'src/app/patients/patients.service';
import { AccompanimentsService } from '../accompaniments.service';

@Component({
  selector: 'app-edit-accompaniment',
  templateUrl: './edit-accompaniment.component.html',
  styleUrls: ['./edit-accompaniment.component.scss'],
})
export class EditAccompanimentComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  item: any = null;
  disabledForm: boolean | null = null;

  constructor(
    private route: ActivatedRoute,
    private accompanimentsService: AccompanimentsService
  ) {}

  ngOnInit(): void {
    this.disabledForm =
      this.route.snapshot.params['action'] === 'edit'
        ? false
        : this.route.snapshot.params['action'] === 'view'
        ? true
        : null;

    this.getAccompanimentByID();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getAccompanimentByID(): void {
    const id: number = this.route.snapshot.params['id'];

    if (id) {
      this.accompanimentsService
        .getAccompanimentById(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.item = res ? res : null;
          },
          error: (error) => {},
        });
    }
  }
}
