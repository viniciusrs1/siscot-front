import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistoricService } from '../historic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-historic',
  templateUrl: './edit-historic.component.html',
  styleUrls: ['./edit-historic.component.scss']
})
export class EditHistoricComponent implements OnInit, OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  item: any = null;
  disabledForm: boolean | null = null;

  constructor(
    private route: ActivatedRoute,
    private historicService: HistoricService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.disabledForm =
      this.route.snapshot.params['action'] === 'edit'
        ? false
        : this.route.snapshot.params['action'] === 'view'
        ? true
        : null;

    this.getHistoricByID();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getHistoricByID(): void {
    // const id: number = this.route.snapshot.params['id'];

    // if (id) {
    //   this.patientsService
    //     .getPatientsById(id)
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe({
    //       next: (res) => {
    //         this.item = res ? res : null;
    //       },
    //       error: (error) => {
    //         this.openSnackBar(
    //           'Erro ao carregar os dados do paciente.',
    //           'Fechar',
    //           'error-message'
    //         );
    //       },
    //     });
    // }
  }

  openSnackBar(message: string, action: string, panelClass: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: [panelClass],
    });
  }
}
