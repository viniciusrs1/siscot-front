import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss'],
})
export class ListPatientsComponent implements OnInit {
  rows: any = null;
  temp: any = [];
  filter: string = '';

  constructor(
    private route: Router,
    private patientsService: PatientsService
  ) {}

  ngOnInit(): void {
    this.getPatients();
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

  getPatients(): void {
    this.patientsService.getPatients().subscribe({
      next: (res: any) => {
        res.map((item: any) => {
          item.addressFormatted = `${item.address}, ${item.number}`;
        });
        this.rows = res ? res : [];
        this.temp = this.rows ? [...this.rows] : [];
        console.log('rows', this.rows);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

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
