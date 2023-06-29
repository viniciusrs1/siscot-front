import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsService } from '../patients.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-patient',
  templateUrl: './form-patient.component.html',
  styleUrls: ['./form-patient.component.scss'],
})
export class FormPatientComponent implements OnInit, OnChanges, OnDestroy {
  @Input() item: any = null;
  @Input() disabled: any = null;
  addPatientForm: FormGroup = Object.create(null);
  loading: boolean = false;
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private patientsService: PatientsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnChanges(): void {
    if (this.addPatientForm && this.item) {
      this.populateForm();
    }
  }

  createForm(): void {
    this.addPatientForm = new FormGroup({
      nome: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),

      genero: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),

      data_nascimento: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),
      endereco: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),

      numero: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),

      telefone: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),

      email: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required, Validators.email]
      ),

      informacoes: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        []
      ),
    });
  }

  populateForm(): void {
    this.addPatientForm.setValue({
      nome: this.item?.nome,
      genero: this.item?.genero,
      data_nascimento: this.item?.data_nascimento,
      endereco: this.item?.endereco,
      numero: this.item?.numero,
      telefone: this.item?.telefone,
      email: this.item?.email,
      informacoes: this.item?.informacoes,
    });
  }

  onSubmit(): void {
    const data: any = { ...this.addPatientForm.value };
    if (this.addPatientForm.valid) {
      this.loading = true;
      if (this.route.snapshot.params['id']) {
        data.id = this.route.snapshot.params['id'];
        this.editPatient(data);
      } else {
        this.addPatient(data);
      }
    } else {
      this.addPatientForm.markAllAsTouched();
    }
  }

  addPatient(data: any): void {
    this.patientsService
      .addPatient(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.openSnackBar(
            'Paciente cadastrado com sucesso!',
            'Fechar',
            'success-message'
          );
          this.router.navigate(['/patients/list']);
        },
        error: (error: any) => {
          this.openSnackBar(
            'Erro ao cadastrar paciente.',
            'Fechar',
            'error-message'
          );
          this.loading = false;
        },
      });
  }

  editPatient(data: any): void {
    this.patientsService
      .updatePatient(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.openSnackBar(
            'Paciente editado com sucesso!',
            'Fechar',
            'success-message'
          );
          this.router.navigate(['/patients/list']);
        },
        error: (error: any) => {
          this.openSnackBar(
            'Erro ao editar paciente.',
            'Fechar',
            'error-message'
          );
          this.loading = false;
        },
      });
  }

  backPage(): void {
    this.router.navigateByUrl('/patients/list');
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
