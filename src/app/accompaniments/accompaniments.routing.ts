import { Routes } from '@angular/router';
import { ListAccompanimentsComponent } from './list-accompaniments/list-accompaniments.component';
import { AddAccompanimentComponent } from './add-accompaniment/add-accompaniment.component';
import { EditAccompanimentComponent } from './edit-accompaniment/edit-accompaniment.component';

export const AccompanimentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListAccompanimentsComponent,
      },
      {
        path: 'form/add',
        component: AddAccompanimentComponent,
      },
      {
        path: 'form/:action/:id',
        component: EditAccompanimentComponent,
      },
    ],
  },
];
