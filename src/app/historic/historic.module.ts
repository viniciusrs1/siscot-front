import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HistoricRoutes } from './historic.routing';
import { AddHistoricComponent } from './add-historic/add-historic.component';
import { FormHistoricComponent } from './form-historic/form-historic.component';
import { ListHistoricComponent } from './list-historic/list-historic.component';
import { EditHistoricComponent } from './edit-historic/edit-historic.component';

@NgModule({
  declarations: [
    AddHistoricComponent,
    FormHistoricComponent,
    ListHistoricComponent,
    EditHistoricComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(HistoricRoutes)],
})
export class HistoricModule { }
