import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '../patients.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss'],
})
export class EditPatientComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  item: any = null;
  disabledForm: boolean | null = null;

  constructor(
    private route: ActivatedRoute,
    private patientsService: PatientsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.disabledForm =
      this.route.snapshot.params['action'] === 'edit'
        ? false
        : this.route.snapshot.params['action'] === 'view'
        ? true
        : null;

    this.getPatientByID();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getPatientByID(): void {
    const id: number = this.route.snapshot.params['id'];

    if (id) {
      this.patientsService
        .getPatientsById(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.item = res ? res : null;
          },
          error: (error) => {
            this.openSnackBar(
              'Erro ao carregar os dados do paciente.',
              'Fechar'
            );
          },
        });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
}
