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

  createForm(): void {
    this.addAccompanimentForm = new FormGroup({
      patient_id: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),

      professional_id: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),

      date: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),

      notes: new FormControl(
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
      patient_id: this.item?.patient_id,
      professional_id: this.item?.professional_id,
      date: this.item?.date,
      notes: this.item?.notes,
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
          this.openSnackBar('Acompanhamento cadastrado com sucesso!', 'Fechar');
          this.router.navigate(['/accompaniments/list']);
        },
        error: (error: any) => {
          this.openSnackBar('Erro ao cadastrar acompanhamento', 'Fechar');
          console.log(error);
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
          this.openSnackBar('Acompanhamento editado com sucesso!', 'Fechar');
          this.router.navigate(['/patients/list']);
        },
        error: (error: any) => {
          this.openSnackBar('Erro ao editar acompanhamento', 'Fechar');
          console.log(error);
          this.loading = false;
        },
      });
  }

  backPage(): void {
    this.router.navigateByUrl('/accompaniments/list');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
}
