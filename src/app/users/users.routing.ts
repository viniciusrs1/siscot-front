import { Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddUserComponent } from './add-user/add-user.component';



export const UsersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListUsersComponent,
      },
      {
        path: 'form/add',
        component: AddUserComponent,
      },

    ],
  },
];