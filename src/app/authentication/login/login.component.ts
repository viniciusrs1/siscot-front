import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  loginForm: FormGroup = Object.create(null);
  loading: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.createFormLogin();
    // if (this.authenticationService.isAuthenticated()) {
    //   this.router.navigate(["/"]);
    // }
  }

  ngOnDestroy() {
    // this.destroy$.next(true);
    // this.destroy$.unsubscribe();
  }

  createFormLogin(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

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
      //       this.router.navigate(["/"]);
      //     },
      //     (error) => {
      //       console.log(error);
      //       this.loading = false;
      //     }
      //   );
      this.authenticationService.authentication(this.loginForm.value);
      this.loading = false;
    
    } else {
      this.loginForm.markAllAsTouched();
      this.loading = false;
    }
  }
}
