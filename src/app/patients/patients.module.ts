import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPatientsComponent } from './list-patients/list-patients.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { FormPatientComponent } from './form-patient/form-patient.component';
import { PatientsRoutes } from './patients.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ListPatientsComponent,
    AddPatientComponent,
    EditPatientComponent,
    FormPatientComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(PatientsRoutes)],
})
export class PatientsModule {}
