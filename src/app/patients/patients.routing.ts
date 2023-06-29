import { Routes } from '@angular/router';
import { ListPatientsComponent } from './list-patients/list-patients.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';


export const PatientsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListPatientsComponent,
      },
      {
        path: 'form/add',
        component: AddPatientComponent,
      },
      {
        path: 'form/:action/:id',
        component: EditPatientComponent,
      },
    ],
  },
];
