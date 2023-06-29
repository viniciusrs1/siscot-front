import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccompanimentFormService {
  formData: any;

  constructor() {}

  setFormData(data: any): void {
    this.formData = data;
  }

  getFormData(): any {
    return this.formData;
  }

  clearFormData(): void {
    this.formData = null;
  }
}
