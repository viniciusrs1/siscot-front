import { Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';



export const UsersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListUsersComponent,
      },

    ],
  },
];