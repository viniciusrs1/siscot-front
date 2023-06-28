import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AccompanimentsService } from '../accompaniments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-accompaniments',
  templateUrl: './list-accompaniments.component.html',
  styleUrls: ['./list-accompaniments.component.scss'],
})
export class ListAccompanimentsComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  rows: any = null;
  temp: any = [];
  filter: string = '';
  maxRows: number = 10;
  loading: boolean = false;

  constructor(
    private route: Router,
    private accompanimentsService: AccompanimentsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAccompaniments();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  updateFilter(event: any): void {
    const val = event.toLowerCase();

    if (this.temp?.length > 0) {
      const filter = this.temp.filter(
        (item: any) =>
          item.pacienteData.name.toLowerCase().indexOf(val) !== -1 || !val
      );

      this.rows = filter;
    }
  }

  getAccompaniments(): void {
    this.accompanimentsService
      .getAccompaniments()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          res.map(
            (item: any) =>
              (item.dataFormatada = moment(item.data)
                .utc()
                .format('DD/MM/yyyy'))
          );

          this.rows = res ? res : [];
          this.temp = this.rows ? [...this.rows] : [];
          this.loading = false;
        },
        error: (error) => {
          this.openSnackBar(
            'Erro ao carregar a lista de acompanhamentos.',
            'Fechar',
            'error-message'
          );
          this.loading = false;
        },
      });
  }

  addAccompaniment() {
    this.route.navigateByUrl('accompaniments/form/add');
  }

  viewAccompaniment(id: number): void {
    this.route.navigate(['/accompaniments/form/', 'view', id]);
  }

  editAccompaniment(id: number): void {
    this.route.navigate(['/accompaniments/form/', 'edit', id]);
  }

  deleteAccompaniment(id: any): void {
    this.loading = true;
    this.accompanimentsService
      .deleteAccompaniment(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.openSnackBar(
            'Acompanhamento deletado com sucesso.',
            'Fechar',
            'success-message'
          );

          this.getAccompaniments();
        },
        error: (error) => {
          this.openSnackBar(
            'Erro ao deletar o acompanhamento.',
            'Fechar',
            'error-message'
          );
          this.loading = false;
        },
      });
  }

  confirmDeleteAccompaniment(id: any): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não poderá ser revertida.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAccompaniment(id);
      }
    });
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
