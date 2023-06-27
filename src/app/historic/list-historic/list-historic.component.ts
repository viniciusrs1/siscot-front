import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { HistoricService } from '../historic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-historic',
  templateUrl: './list-historic.component.html',
  styleUrls: ['./list-historic.component.scss']
})
export class ListHistoricComponent implements OnInit, OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  rows: any = null;
  temp: any = [];
  filter: string = '';
  maxRows: number = 10;
  loading: boolean = false;

  constructor(
    private route: Router,
    private historicService:HistoricService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPatients();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  updateFilter(event: any): void {
    const val = event.toLowerCase();

    if (this.temp?.length > 0) {
      const filter = this.temp.filter(
        (item: any) => item.nome.toLowerCase().indexOf(val) !== -1 || !val
      );

      this.rows = filter;
    }
  }

  getPatients(): void {
    // this.patientsService
    //   .getPatients()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (res: any) => {
    //       res.map((item: any) => {
    //         item.enderecoFormatado = `${item.endereco}, ${item.numero}`;
    //         item.telefoneFormatado = this.formatPhone(item.telefone);
    //       });

    //       this.rows = res ? res : [];
    //       this.temp = this.rows ? [...this.rows] : [];
    //       this.loading = false;
    //     },
    //     error: (error) => {
    //       this.openSnackBar(
    //         'Erro ao carregar a lista de pacientes.',
    //         'Fechar',
    //         'error-message'
    //       );
    //       this.loading = false;
    //     },
    //   });
  }

  addHistoric() {
    this.route.navigateByUrl('historic/form/add');
  }

  viewHistoric(id: number): void {
    this.route.navigate(['/historic/form/', 'view', id]);
  }

  editHistoric(id: number): void {
    this.route.navigate(['/historic/form/', 'edit', id]);
  }

  deleteHistoric(id: any): void {
    this.loading = true;
    // this.patientsService
    //   .deletePatient(id)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (res) => {
    //       this.openSnackBar(
    //         'Paciente deletado com sucesso.',
    //         'Fechar',
    //         'success-message'
    //       );

    //       this.getPatients();
    //     },
    //     error: (error) => {
    //       this.openSnackBar(
    //         'Erro ao deletar o paciente.',
    //         'Fechar',
    //         'error-message'
    //       );
    //       this.loading = false;
    //     },
    //   });
  }

  confirmDeleteHistoric(id: any): void {
    // Swal.fire({
    //   title: 'Tem certeza?',
    //   text: 'Esta ação não poderá ser revertida.',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: 'green',
    //   cancelButtonColor: 'red',
    //   confirmButtonText: 'Deletar',
    //   cancelButtonText: 'Cancelar',
    //   reverseButtons: true,
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.deletePatient(id);
    //   }
    // });
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
