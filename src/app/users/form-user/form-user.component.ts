import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnInit {
  @Input() item: any = null;
  @Input() disabled: any = null;
  addUserForm: FormGroup = Object.create(null);

  constructor(private router: Router, public route: ActivatedRoute) {}

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
    });
  }

  populateForm(): void {
    this.addUserForm.setValue({
      nome: this.item?.nome,
      email: this.item?.idade,
      role: this.item?.role,
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
    // this.studentsService.addStudent(data).subscribe({
    //   next: () => {
    //     alert('cadastrado com sucesso');
    //     this.router.navigate(['/students/list']);
    //   },
    //   error: (error: any) => {
    //     console.log(error);
    //   },
    // });
    console.log('user adicionado', data);
  }

  editUser(data: any): void {
    // this.studentsService.updateStudent(data).subscribe({
    //   next: () => {
    //     alert('editado com sucesso');
    //     this.router.navigate(['/students/list']);
    //   },
    //   error: (error: any) => {
    //     console.log(error);
    //   },
    // });
    console.log('user editado', data);
  }

  backPage(): void {
    this.router.navigateByUrl('/users/list');
  }
}
