import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoricService } from '../historic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form-historic',
  templateUrl: './form-historic.component.html',
  styleUrls: ['./form-historic.component.scss']
})
export class FormHistoricComponent implements OnInit, OnChanges, OnDestroy{

  @Input() item: any = null;
  @Input() disabled: any = null;
  addHistoricForm: FormGroup = Object.create(null);
  loading: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private historicService: HistoricService,
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
    if (this.addHistoricForm && this.item) {
      this.populateForm();
    }
  }

  createForm(): void {
    this.addHistoricForm = new FormGroup({
      alergias: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),

      doencas_preexistentes: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),

      cirurgias_previas: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),

      medicamentos_uso: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),

      outros: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        []
      ),
    });
  }

  populateForm(): void {
    this.addHistoricForm.setValue({
      alergias: this.item?.alergias,
      doencas_preexistentes: this.item?.doencas_preexistentes,
      cirurgias_previas: this.item?.cirurgias_previas,
      medicamentos_uso: this.item?.medicamentos_uso,
      outros: this.item?.outros,
    });
  }

  onSubmit(): void {
    const data: any = { ...this.addHistoricForm.value };
    if (this.addHistoricForm.valid) {
      this.loading = true;
      if (this.route.snapshot.params['id']) {
        data.id = this.route.snapshot.params['id'];
        this.editHistoric(data);
      } else {
        this.addHistoric(data);
      }
    } else {
      this.addHistoricForm.markAllAsTouched();
    }
  }

  addHistoric(data: any): void {
    console.log(data)
    // this.historicService
    //   .addPatient(data)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: () => {
    //       this.openSnackBar(
    //         'Paciente cadastrado com sucesso!',
    //         'Fechar',
    //         'success-message'
    //       );
    //       this.router.navigate(['/patients/list']);
    //     },
    //     error: (error: any) => {
    //       this.openSnackBar(
    //         'Erro ao cadastrar paciente.',
    //         'Fechar',
    //         'error-message'
    //       );
    //       this.loading = false;
    //     },
    //   });
  }

  editHistoric(data: any): void {
    // this.historicService
    //   .updatePatient(data)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: () => {
    //       this.openSnackBar(
    //         'Histórico editado com sucesso!',
    //         'Fechar',
    //         'success-message'
    //       );
    //       this.router.navigate(['/historic/list']);
    //     },
    //     error: (error: any) => {
    //       this.openSnackBar(
    //         'Erro ao editar histórico.',
    //         'Fechar',
    //         'error-message'
    //       );
    //       this.loading = false;
    //     },
    //   });
  }

  backPage(): void {
    this.router.navigateByUrl('/historic/list');
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
