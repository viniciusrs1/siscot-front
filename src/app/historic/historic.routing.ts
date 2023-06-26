import { Routes } from '@angular/router';
import { AddHistoricComponent } from './add-historic/add-historic.component';

export const HistoricRoutes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: 'list',
      //   component: ListUsersComponent,
      // },
      {
        path: 'form/add',
        component: AddHistoricComponent,
      },
      // {
      //   path: 'form/:action/:id',
      //   component: EditUserComponent,
      // },
    ],
   },
];
