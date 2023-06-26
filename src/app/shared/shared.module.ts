import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AngularMaterialModule } from './modules/angular-material.module';
import { CommonModulesModule } from './modules/common-modules.module';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [SidebarComponent, NavbarComponent],
  imports: [CommonModule, AngularMaterialModule, CommonModulesModule],
  exports: [
    SidebarComponent,
    NavbarComponent,
    AngularMaterialModule,
    CommonModulesModule,
  ],
})
export class SharedModule {}
