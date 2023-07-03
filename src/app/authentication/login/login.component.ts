import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  loginForm: FormGroup = Object.create(null);
  loading: boolean = false;
  hide: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createFormLogin();
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/dashboard/home']);
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  createFormLogin(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
    });
  }

  login(): void {
    this.loading = true;
    if (this.loginForm.valid) {
      this.authenticationService
        .login(this.loginForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res: any) => {
            this.cookieService.set('token', res.token, 1, '/');
            this.cookieService.set('nome', res.usuario.nome, 1, '/');
            this.cookieService.set('cargo', res.usuario.cargo, 1, '/');
            this.router.navigate(['/dashboard/home']);
          },
          error: (error: any) => {
            this.openSnackBar(
              'Usuário/Senha inválidos',
              'Fechar',
              'error-message'
            );
            this.loading = false;
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
      this.loading = false;
    }
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
