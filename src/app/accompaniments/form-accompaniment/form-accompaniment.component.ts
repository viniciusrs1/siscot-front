import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AccompanimentsService } from '../accompaniments.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-accompaniment',
  templateUrl: './form-accompaniment.component.html',
  styleUrls: ['./form-accompaniment.component.scss'],
})
export class FormAccompanimentComponent
  implements OnInit, OnChanges, OnDestroy
{
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() item: any = null;
  @Input() disabled: any = null;
  addAccompanimentForm: FormGroup = Object.create(null);
  loading: boolean = false;
  loadingData: boolean = false;
  patients: any;
  professionals: any;
  myModel: any;
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private accompanimentsService: AccompanimentsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getPatients();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnChanges(): void {
    if (this.addAccompanimentForm && this.item) {
      this.populateForm();
    }
  }

  getPatients(): any {
    this.loadingData = true;
    this.accompanimentsService
      .getPatients()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.patients = res ? res : [];
          this.getProfessional();
        },
        error: (error: any) => {
          this.openSnackBar(
            'Erro ao carregar a lista de pacientes.',
            'Fechar',
            'error-message'
          );
          this.loadingData = false;
        },
      });
  }

  getProfessional(): any {
    this.accompanimentsService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.professionals = res
            ? res.filter((val: any) => val.role === 'ASSISTENTE SOCIAL')
            : [];

          console.log('pacientes', this.patients);
          console.log('profissionais', this.professionals);

          this.loadingData = false;
        },
        error: (error: any) => {
          this.openSnackBar(
            'Erro ao carregar a lista de profissionais.',
            'Fechar',
            'error-message'
          );
          this.loadingData = false;
        },
      });
  }

  createForm(): void {
    this.addAccompanimentForm = new FormGroup({
      pacienteId: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),

      profissionalId: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),

      data: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),

      anotacoes: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        []
      ),
    });
  }

  populateForm(): void {
    this.addAccompanimentForm.setValue({
      pacienteId: this.item?.pacienteId,
      profissionalId: this.item?.profissionalId,
      data: this.item?.data,
      anotacoes: this.item?.anotacoes,
    });
  }

  onSubmit(): void {
    const data: any = { ...this.addAccompanimentForm.value };
    if (this.addAccompanimentForm.valid) {
      this.loading = true;
      if (this.route.snapshot.params['id']) {
        data.id = this.route.snapshot.params['id'];
        this.editAccompaniment(data);
      } else {
        this.addAccompaniment(data);
      }
    } else {
      this.addAccompanimentForm.markAllAsTouched();
    }
  }

  addAccompaniment(data: any): void {
    this.accompanimentsService
      .addAccompaniment(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.openSnackBar(
            'Acompanhamento cadastrado com sucesso!',
            'Fechar',
            'success-message'
          );
          this.router.navigate(['/accompaniments/list']);
        },
        error: (error: any) => {
          this.openSnackBar(
            'Erro ao cadastrar acompanhamento.',
            'Fechar',
            'error-message'
          );
          this.loading = false;
        },
      });
  }

  editAccompaniment(data: any): void {
    this.accompanimentsService
      .updateAccompaniment(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.openSnackBar(
            'Acompanhamento editado com sucesso!',
            'Fechar',
            'success-message'
          );
          this.router.navigate(['/accompaniments/list']);
        },
        error: (error: any) => {
          this.openSnackBar(
            'Erro ao editar acompanhamento.',
            'Fechar',
            'error-message'
          );
          this.loading = false;
        },
      });
  }

  backPage(): void {
    this.router.navigateByUrl('/accompaniments/list');
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
