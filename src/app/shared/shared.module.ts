import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AngularMaterialModule } from './modules/angular-material.module';
import { CommonModulesModule } from './modules/common-modules.module';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, AngularMaterialModule, CommonModulesModule],
  exports: [SidebarComponent, AngularMaterialModule, CommonModulesModule],
})
export class SharedModule {}
