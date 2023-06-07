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
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
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
    RouterModule.forChild(AccompanimentsRoutes),
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
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
