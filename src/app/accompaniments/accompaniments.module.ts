import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAccompanimentsComponent } from './list-accompaniments/list-accompaniments.component';
import { RouterModule } from '@angular/router';
import { AccompanimentsRoutes } from './accompaniments.routing';
import { FormAccompanimentComponent } from './form-accompaniment/form-accompaniment.component';
import { EditAccompanimentComponent } from './edit-accompaniment/edit-accompaniment.component';
import { AddAccompanimentComponent } from './add-accompaniment/add-accompaniment.component';

@NgModule({
  declarations: [
    ListAccompanimentsComponent,
    FormAccompanimentComponent,
    EditAccompanimentComponent,
    AddAccompanimentComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(AccompanimentsRoutes)],
})
export class AccompanimentsModule {}
