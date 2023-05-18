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
  // rows: any = [
  //   {
  //     name: 'Vinicius Rodrigues de Sousa',
  //     email: 'viniciusrs@email.com',
  //     role: 'ADMIN',
  //   },
  //   {
  //     name: 'Caio Freitas Lima',
  //     email: 'caiofflima@gmail.com',
  //     role: 'ASSISTENTE SOCIAL',
  //   },
  //   {
  //     name: 'Lindovaldo Costa Leao',
  //     email: 'lindolindao@outlook.com.br',
  //     role: 'ASSISTENTE SOCIAL',
  //   },
  //   {
  //     name: 'Breno Henrique',
  //     email: 'brenao.henrique@gmail.com',
  //     role: 'SECRETARIO',
  //   },
  //   {
  //     name: 'Guilherme Mutao',
  //     email: 'guigasMutao@email.com',
  //     role: 'SECRETARIO',
  //   },
  //   {
  //     name: 'Guilherme Barbosa',
  //     email: 'broxa.gui@gmail.com',
  //     role: 'ASSISTENTE SOCIAL',
  //   },
  // ];

  constructor(private route: Router, private usersService: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (res: any) => {
        console.log("resposta", res)
        // this.rows = res?.response ? res.response : [];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addUser() {
    console.log('ento');
    this.route.navigateByUrl('users/form/add');
  }

  viewUser(id: number): void {
    console.log('aq', id);
    this.route.navigate(['/users/form/', 'view', id]);
  }

  editUser(id: number): void {
    this.route.navigate(['/users/form/', 'edit', id]);
  }
}
