import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnInit, OnChanges {
  @Input() item: any = null;
  @Input() disabled: any = null;
  addUserForm: FormGroup = Object.create(null);

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(): void {
    if (this.addUserForm && this.item) {
      this.populateForm();
    }
  }

  createForm(): void {
    this.addUserForm = new FormGroup({
      name: new FormControl(
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

      role: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),
      password: new FormControl(
        {
          value: null,
          disabled: this.disabled,
        },
        [Validators.required]
      ),
    });
  }

  populateForm(): void {
    console.log('item aq', this.item);
    this.addUserForm.setValue({
      name: this.item?.name,
      email: this.item?.email,
      role: this.item?.role,
      password: this.item?.password,
    });
  }

  onSubmit(): void {
    const data: any = { ...this.addUserForm.value };
    if (this.addUserForm.valid) {
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
    this.usersService.addUser(data).subscribe({
      next: () => {
        alert('cadastrado com sucesso');
        this.router.navigate(['/users/list']);
      },
      error: (error: any) => {
        alert('erro ao cadastrar');
        console.log(error);
      },
    });
  }

  editUser(data: any): void {
    this.usersService.updateUser(data).subscribe({
      next: () => {
        alert('cadastrado com sucesso');
        this.router.navigate(['/users/list']);
      },
      error: (error: any) => {
        alert('erro ao cadastrar');
        console.log(error);
      },
    });
  }

  backPage(): void {
    this.router.navigateByUrl('/users/list');
  }
}
