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
      name: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),

      gender: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),

      date_birth: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),
      address: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),

      number: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),

      phone: new FormControl(
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

      info: new FormControl(
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
      name: this.item?.name,
      gender: this.item?.gender,
      date_birth: this.item?.date_birth,
      address: this.item?.address,
      number: this.item?.number,
      phone: this.item?.phone,
      email: this.item?.email,
      info: this.item?.info,
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
