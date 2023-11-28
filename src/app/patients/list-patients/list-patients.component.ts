import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PatientsService } from '../patients.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss'],
})
export class ListPatientsComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  rows: any = null;
  temp: any = [];
  filter: string = '';
  maxRows: number = 10;
  loading: boolean = false;

  constructor(
    private route: Router,
    private patientsService: PatientsService,
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
    this.patientsService
      .getPatients()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          res.map((item: any) => {
            item.enderecoFormatado = `${item.endereco}, ${item.numero}`;
            item.telefoneFormatado = this.formatPhone(item.telefone);
          });

          this.rows = res ? res : [];
          this.temp = this.rows ? [...this.rows] : [];
          this.loading = false;
        },
        error: (error) => {
          this.openSnackBar(
            'Erro ao carregar a lista de pacientes.',
            'Fechar',
            'error-message'
          );
          this.loading = false;
        },
      });
  }

  addPatient() {
    this.route.navigateByUrl('patients/form/add');
  }

  viewPatient(id: number): void {
    this.route.navigate(['/patients/form/', 'view', id]);
  }

  editPatient(id: number): void {
    this.route.navigate(['/patients/form/', 'edit', id]);
  }

  deletePatient(id: any): void {
    this.loading = true;
    this.patientsService
      .deletePatient(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.openSnackBar(
            'Paciente deletado com sucesso.',
            'Fechar',
            'success-message'
          );

          this.getPatients();
        },
        error: (error) => {
          this.openSnackBar(
            'Erro ao deletar o paciente.',
            'Fechar',
            'error-message'
          );
          this.loading = false;
        },
      });
  }

  confirmDeletePatient(id: any): void {
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
        this.deletePatient(id);
      }
    });
  }

  formatPhone(phone: string) {
    const ddd = phone.slice(0, 2);
    let parte1: string;
    let parte2: string;

    if (phone.length === 11) {
      parte1 = phone.slice(2, 3) + ' ' + phone.slice(3, 7);
      parte2 = phone.slice(7);
    } else {
      parte1 = phone.slice(2, 6);
      parte2 = phone.slice(6);
    }

    return `(${ddd}) ${parte1}-${parte2}`;
  }

  openSnackBar(message: string, action: string, panelClass: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: [panelClass],
    });
  }

  createPDF(): void {
    const pdf = new jsPDF();
    pdf.text('Lista de Pacientes', 14, 14);

    autoTable(pdf, {
      head: [['Nome', 'Endereço', 'Telefone', 'Email']],
      body: this.rows.map((row: any) => [
        row.nome,
        row.enderecoFormatado,
        row.telefoneFormatado,
        row.email,
      ]),
      startY: 24,
    });
    pdf.save('Siscot - Lista de Pacientes.pdf');
  }
}
