import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-form-patient',
  templateUrl: './form-patient.component.html',
  styleUrls: ['./form-patient.component.scss'],
})
export class FormPatientComponent implements OnInit, OnChanges {
  @Input() item: any = null;
  @Input() disabled: any = null;
  addPatientForm: FormGroup = Object.create(null);

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private patientsService: PatientsService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(): void {
    if (this.addPatientForm && this.item) {
      this.populateForm();
    }
  }

  createForm(): void {
    this.addPatientForm = new FormGroup({
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
    this.addPatientForm.setValue({
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
    const data: any = { ...this.addPatientForm.value };
    if (this.addPatientForm.valid) {
      if (this.route.snapshot.params['id']) {
        data.id = this.route.snapshot.params['id'];
        this.editPatient(data);
      } else {
        this.addPatient(data);
      }
    } else {
      this.addPatientForm.markAllAsTouched();
    }
  }

  addPatient(data: any): void {
    this.patientsService.addPatient(data).subscribe({
      next: () => {
        alert('cadastrado com sucesso');
        this.router.navigate(['/patients/list']);
      },
      error: (error: any) => {
        alert('erro ao cadastrar');
        console.log(error);
      },
    });
  }

  editPatient(data: any): void {
    this.patientsService.updatePatient(data).subscribe({
      next: () => {
        alert('cadastrado com sucesso');
        this.router.navigate(['/patients/list']);
      },
      error: (error: any) => {
        alert('erro ao cadastrar');
        console.log(error);
      },
    });
  }

  backPage(): void {
    this.router.navigateByUrl('/patients/list');
  }
}