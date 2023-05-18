import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss']
})
export class ListPatientsComponent {
  rows: any = [
    {
      name: 'Vinicius Rodrigues de Sousa',
      gender: 'Masculino',
      email: 'viniciusrs@email.com',
      phone: '34997965228',
    },
    {
      name: 'Caio Freitas Lima',
      gender: 'Masculino',
      email: 'caiofflima@gmail.com',
      phone: '34997965228',
    },
    {
      name: 'Lindovaldo Costa Leao',
      gender: 'Masculino',
      email: 'lindolindao@outlook.com.br',
      phone: '34997965228',
    },
    {
      name: 'Breno Henrique',
      gender: 'Feminino',
      email: 'brenao.henrique@gmail.com',
      phone: '34997965228',
    },
    {
      name: 'Guilherme Mutao',
      gender: 'Outro',
      email: 'guigasMutao@email.com',
      phone: '34997965228',
    },
    {
      name: 'Guilherme Barbosa',
      gender: 'Outro',
      email: 'broxa.gui@gmail.com',
      phone: '34997965228',
    },
  ];

  constructor(private route: Router) {}

  addPatient() {
    console.log('ento');
    this.route.navigateByUrl('patients/form/add');
  }

  viewPatient(id: number): void {
    console.log('aq', id);
    this.route.navigate(['/patients/form/', 'view', id]);
  }

  editPatient(id: number): void {
    this.route.navigate(['/patients/form/', 'edit', id]);
  }

}
