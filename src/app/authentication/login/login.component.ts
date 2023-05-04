import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  loginForm: FormGroup = Object.create(null);
  // recoverForm: FormGroup = Object.create(null);

  // showRecoverForm: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.createFormLogin();
    // if (this.authenticationService.isAuthenticated()) {
    //   this.router.navigate(["/dashboard/classic"]);
    // }
  }

  ngOnDestroy() {
    // this.destroy$.next(true);
    // this.destroy$.unsubscribe();
  }

  createFormLogin(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  // createFormRecover(): void {
  //   this.recoverForm = new FormGroup({
  //     email: new FormControl("", [Validators.required, Validators.email]),
  //   });
  // }

  login(): void {
    this.loading = true;
    if (this.loginForm.valid) {
      // this.authenticationService
      //   .authentication(this.loginForm.value)
      //   .pipe(takeUntil(this.destroy$))
      //   .subscribe(
      //     (response) => {
      //       localStorage.setItem("token", response.accessToken);
      //       localStorage.setItem("refreshToken", response.refreshToken);
      //       this.router.navigate(["/dashboard/classic"]);
      //     },
      //     (error) => {
      //       this.notifierService.notify(
      //         "error",
      //         error?.error?.response
      //           ? error.error.response
      //           : "Usuário/Senha inválido."
      //       );
      //       this.loading = false;
      //     }
      //   );
      console.log("logou")
    } else {
      this.loginForm.markAllAsTouched();
      // this.loading = false;
    }
  }

  // handleRecoverForm(): void {
  //   this.createFormRecover();
  //   this.toggleRecoverForm();
  // }

  // toggleRecoverForm(): void {
  //   this.showRecoverForm = !this.showRecoverForm;
  // }

  // recoverPassword(): void {
  //   if (this.recoverForm.valid) {
  //     console.log("recuperar senha", this.recoverForm.value);
  //   } else {
  //     this.recoverForm.markAllAsTouched();
  //   }
  // }

  // handleLoginForm(): void {
  //   this.createFormLogin();
  //   this.toggleRecoverForm();
  // }
}
