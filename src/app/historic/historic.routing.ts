import { Routes } from '@angular/router';
import { AddHistoricComponent } from './add-historic/add-historic.component';
import { ListHistoricComponent } from './list-historic/list-historic.component';
import { EditHistoricComponent } from './edit-historic/edit-historic.component';
import { FormHistoricComponent } from './form-historic/form-historic.component';

export const HistoricRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListHistoricComponent,
      },
      {
        path: 'form/add',
        component: AddHistoricComponent,
      },
      {
        path: 'form/:action/:id',
        component: EditHistoricComponent,
      },
    ],
   },
];
