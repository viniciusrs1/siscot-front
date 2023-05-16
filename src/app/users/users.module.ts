import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersComponent } from './list-users/list-users.component';
import { UsersRoutes } from './authentication.routing';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table'  
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  declarations: [
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule.forChild(UsersRoutes),
    NgxDatatableModule,
  ]
})
export class UsersModule { }
