import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAccompanimentsComponent } from './list-accompaniments/list-accompaniments.component';
import { RouterModule } from '@angular/router';
import { AccompanimentsRoutes } from './accompaniments.routing';
import { FormAccompanimentComponent } from './form-accompaniment/form-accompaniment.component';
import { EditAccompanimentComponent } from './edit-accompaniment/edit-accompaniment.component';
import { AddAccompanimentComponent } from './add-accompaniment/add-accompaniment.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaskModule } from 'ngx-mask';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_DATE_FORMAT } from '../shared/utils/date-formater';

@NgModule({
  declarations: [
    ListAccompanimentsComponent,
    FormAccompanimentComponent,
    EditAccompanimentComponent,
    AddAccompanimentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AccompanimentsRoutes),
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
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
export class AccompanimentsModule {}
