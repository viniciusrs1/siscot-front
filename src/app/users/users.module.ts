import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersComponent } from './list-users/list-users.component';
import { UsersRoutes } from './users.routing';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { FormUserComponent } from './form-user/form-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    ListUsersComponent,
    SidebarComponent,
    FormUserComponent,
    AddUserComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule.forChild(UsersRoutes),
    NgxDatatableModule,
    MatIconModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatSelectModule,
  ],
})
export class UsersModule {}
