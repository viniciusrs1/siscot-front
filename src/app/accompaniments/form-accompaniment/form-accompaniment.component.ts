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
  @Input() item: any = null;
  @Input() disabled: any = null;
  addAccompanimentForm: FormGroup = Object.create(null);
  loading: boolean = false;
  loadingData: boolean = false;
  patients: any;
  professionals: any;
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  destroy$: Subject<boolean> = new Subject<boolean>();

  temp: any;

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
      // this.populateForm();
      this.populateFormMock();
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
      title: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),
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
    });
  }

  populateForm(): void {
    this.addAccompanimentForm.setValue({
      pacienteId: this.item?.pacienteId,
      profissionalId: this.item?.profissionalId,
      data: this.item?.start,
      title: this.item?.title,
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

  addAccompaniment(info: any): void {
    let data = {
      pacienteId: info.pacienteId,
      profissionalId: info.profissionalId,
      start: info.data,
      title: info.title,
    };
    data = this.formataAcompanhamentoMock(data);
    this.accompanimentsService
      .addAccompaniment(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.guardaAcompanhamentoMock(res);
          this.openSnackBar(
            'Acompanhamento cadastrado com sucesso!',
            'Fechar',
            'success-message'
          );
          this.router.navigate(['/dashboard/home']);
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

  formataAcompanhamentoMock(data: any) {
    this.temp = data.pacienteId;
    if (data.pacienteId && data.pacienteId.length > 0) {
      data.pacienteId = [data.pacienteId[0]];
    }
    return data;
  }

  guardaAcompanhamentoMock(res: any) {
    let acompanhamentos: any[] = [];

    const acompanhamentosLocalStorage = localStorage.getItem('acompanhamentos');
    if (acompanhamentosLocalStorage) {
      acompanhamentos = JSON.parse(acompanhamentosLocalStorage);
    }

    const data = {
      id: res.id,
      pacienteId: this.temp,
      profissionalId: res.profissionalId,
      start: res.start,
      title: res.title,
    };

    acompanhamentos.push(data);
    localStorage.setItem('acompanhamentos', JSON.stringify(acompanhamentos));
  }

  populateFormMock() {
    const dadosLocalStorage = localStorage.getItem('acompanhamentos');

    if (dadosLocalStorage) {
      const dadosArray: any[] = JSON.parse(dadosLocalStorage);
      const itemEncontrado = dadosArray.find(
        (item) => item.id === this.item.id
      );

      if (itemEncontrado) {
        this.addAccompanimentForm.setValue({
          pacienteId: itemEncontrado.pacienteId,
          profissionalId: this.item?.profissionalId,
          data: this.item?.start,
          title: this.item?.title,
        });
      } else {
        console.log('Item não encontrado.');
      }
    } else {
      console.log('Nenhum dado encontrado no localStorage.');
    }
  }

  editAccompaniment(info: any): void {
    const data = {
      id: info.id,
      pacienteId: info.pacienteId,
      profissionalId: info.profissionalId,
      start: info.data,
      title: info.title,
    };

    this.accompanimentsService
      .updateAccompaniment(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/dashboard/home');
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
    this.router.navigateByUrl('/dashboard/home');
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
