import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss'],
})
export class EditPatientComponent implements OnInit {
  item: any = null;
  disabledForm: boolean | null = null;

  constructor(
    private route: ActivatedRoute,
    private patientsService: PatientsService
  ) {}

  ngOnInit(): void {
    this.disabledForm =
      this.route.snapshot.params['action'] === 'edit'
        ? false
        : this.route.snapshot.params['action'] === 'view'
        ? true
        : null;

    this.getUsertByID();
  }

  getUsertByID(): void {
    const id: number = this.route.snapshot.params['id'];

    if (id) {
      this.patientsService.getPatientsById(id).subscribe({
        next: (res) => {
          this.item = res ? res : null;
        },
        error: (error) => {},
      });
    }
  }
}
