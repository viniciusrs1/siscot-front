import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './modules/angular-material.module';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, RouterModule, AngularMaterialModule],
  exports: [SidebarComponent, AngularMaterialModule],
})
export class SharedModule {}
