import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  rows: any = null;
  temp: any = [];
  filter: string = '';

  constructor(private route: Router, private usersService: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  updateFilter(event: any): void {
    const val = event.toLowerCase();

    if (this.temp?.length > 0) {
      const filter = this.temp.filter(
        (item: any) => item.name.toLowerCase().indexOf(val) !== -1 || !val
      );

      this.rows = filter;
    }
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (res: any) => {
        res.map((item: any) => {
          item.roleFormatted =
            item.role === 'ADMIN'
              ? 'Administrador'
              : item.role === 'SECRETARIO'
              ? 'Secretário'
              : item.role === 'ASSISTENTE SOCIAL'
              ? 'Assistente Social'
              : item.role;
        });
        this.rows = res ? res : [];
        this.temp = this.rows ? [...this.rows] : [];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addUser() {
    this.route.navigateByUrl('users/form/add');
  }

  viewUser(id: number): void {
    this.route.navigate(['/users/form/', 'view', id]);
  }

  editUser(id: number): void {
    this.route.navigate(['/users/form/', 'edit', id]);
  }
}
