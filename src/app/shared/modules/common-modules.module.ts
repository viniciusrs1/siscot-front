import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxDatatableModule,
    NgxMaskModule.forChild(),
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxDatatableModule,
    NgxMaskModule,
  ],
})
export class CommonModulesModule {}
