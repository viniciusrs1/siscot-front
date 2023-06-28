import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AccompanimentsService } from '../accompaniments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccompanimentFormService } from 'src/app/shared/services/AccompanimentForm.service';
import { AccompanimentDataService } from 'src/app/shared/services/AccompanimentData.service';

@Component({
  selector: 'app-form-accompaniment',
  templateUrl: './form-accompaniment.component.html',
  styleUrls: ['./form-accompaniment.component.scss'],
})
export class FormAccompanimentComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() item: any = null;
  @Input() disabled: any = null;
  addAccompanimentForm: FormGroup = Object.create(null);
  loading: boolean = false;
  loadingData: boolean = false;
  patients: any;
  professionals: any;
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private accompanimentsService: AccompanimentsService,
    private _snackBar: MatSnackBar,
    private accompanimentFormService: AccompanimentFormService,
    private accompanimentDataService: AccompanimentDataService
  ) {
    this.item = accompanimentDataService.getData();
  }

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
            ? res.filter((val: any) => val.cargo === 'ASSISTENTE SOCIAL')
            : [];

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
      data: this.item?.start,
      anotacoes: this.item?.title,
    });
  }

  onSubmit(): void {
    const data: any = { ...this.addAccompanimentForm.value };
    if (this.addAccompanimentForm.valid) {
      this.loading = true;
      if (this.route.snapshot.params['id']) {
        data.id = this.route.snapshot.params['id'];
        console.log('edit', data);
        this.editAccompaniment(data);
      } else {
        this.addAccompaniment(data);
        console.log('data', data);
      }
    } else {
      this.addAccompanimentForm.markAllAsTouched();
    }
  }

  // onSubmit(): void {
  //   const data: any = { ...this.addAccompanimentForm.value };
  //   if (this.addAccompanimentForm.valid) {

  //     this.addAccompanimentForm.value.data =
  //       this.addAccompanimentForm.value.data.toDate();

  //     this.accompanimentFormService.setFormData(
  //       this.addAccompanimentForm.value
  //     );

  //     this.router.navigateByUrl('dashboard/home');
  //   } else {
  //     this.addAccompanimentForm.markAllAsTouched();
  //   }
  // }

  addAccompaniment(info: any): void {
    const data = {
      pacienteId: info.pacienteId,
      profissionalId: info.profissionalId,
      start: info.data,
      title: info.anotacoes,
    };
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

  editAccompaniment(info: any): void {
    const data = {
      id: info.id,
      pacienteId: info.pacienteId,
      profissionalId: info.profissionalId,
      start: info.data,
      title: info.anotacoes,
    };
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
