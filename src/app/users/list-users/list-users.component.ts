import { Component } from '@angular/core';



const ELEMENT_DATA: any = [
  { name: 'Vinicius Rodrigues de Sousa', email: 'viniciusrs@email.com', role: 'ADMIN'},
  { name: 'Caio Freitas Lima', email: 'caiofflima@gmail.com', role: 'ASSISTENTE SOCIAL'},
  { name: 'Lindovaldo Costa Leao', email: 'lindolindao@outlook.com.br', role: 'ASSISTENTE SOCIAL'},
  { name: 'Breno Henrique', email: 'brenao.henrique@gmail.com', role: 'SECRETARIO'},
  { name: 'Guilherme Mutao', email: 'guigasMutao@email.com', role: 'SECRETARIO'},
  { name: 'Guilherme Barbosa', email: 'broxa.gui@gmail.com', role: 'ASSISTENTE SOCIAL'},

];

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  displayedColumns: string[] = ['name', 'email', 'role'];
  dataSource = ELEMENT_DATA;
}
