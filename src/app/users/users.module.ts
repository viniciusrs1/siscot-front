import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersComponent } from './list-users/list-users.component';
import { UsersRoutes } from './users.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormUserComponent } from './form-user/form-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    ListUsersComponent,
    FormUserComponent,
    AddUserComponent,
    EditUserComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(UsersRoutes)],
})
export class UsersModule {}
