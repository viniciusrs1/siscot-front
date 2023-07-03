import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnInit, OnChanges, OnDestroy {
  @Input() item: any = null;
  @Input() disabled: any = null;
  addUserForm: FormGroup = Object.create(null);
  loading: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private usersService: UsersService,
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
    if (this.addUserForm && this.item) {
      this.populateForm();
    }
  }

  createForm(): void {
    this.addUserForm = new FormGroup({
      nome: new FormControl(
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

      cargo: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),
      senha: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),
    });
  }

  populateForm(): void {
    this.addUserForm.setValue({
      nome: this.item?.nome,
      email: this.item?.email,
      cargo: this.item?.cargo,
      senha: "Senha Criptografada",
    });
    console.log("this.item?.nome", this.item?.nome)
  }

  onSubmit(): void {
    const data: any = { ...this.addUserForm.value };
    if (this.addUserForm.valid) {
      this.loading = true;
      if (this.route.snapshot.params['id']) {
        data.id = this.route.snapshot.params['id'];

        this.editUser(data);
      } else {
        this.addUser(data);
      }
    } else {
      this.addUserForm.markAllAsTouched();
    }
  }

  addUser(data: any): void {
    this.usersService
      .addUser(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.openSnackBar(
            'Usuário cadastrado com sucesso!',
            'Fechar',
            'success-message'
          );
          this.router.navigate(['/users/list']);
        },
        error: (error: any) => {
          this.openSnackBar(
            'Erro ao cadastrar usuário.',
            'Fechar',
            'error-message'
          );
          this.loading = false;
        },
      });
  }

  editUser(data: any): void {
    this.usersService
      .updateUser(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.openSnackBar(
            'Usuário editado com sucesso!',
            'Fechar',
            'success-message'
          );
          this.router.navigate(['/users/list']);
        },
        error: (error: any) => {
          this.openSnackBar(
            'Erro ao editar usuário.',
            'Fechar',
            'error-message'
          );
          this.loading = false;
        },
      });
  }

  backPage(): void {
    this.router.navigateByUrl('/users/list');
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
