import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPatientsComponent } from './list-patients/list-patients.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { FormPatientComponent } from './form-patient/form-patient.component';
import { PatientsRoutes } from './patients.routing';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_DATE_FORMAT } from '../shared/utils/date-formater';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

@NgModule({
  declarations: [
    ListPatientsComponent,
    AddPatientComponent,
    EditPatientComponent,
    FormPatientComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PatientsRoutes),
    NgxDatatableModule,
    MatIconModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    NgxMaskModule.forChild(),
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
})
export class PatientsModule {}
