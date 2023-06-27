import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AngularMaterialModule } from './modules/angular-material.module';
import { CommonModulesModule } from './modules/common-modules.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AngularCalendarModule } from './modules/angular-calendar.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AccompanimentFormService } from './services/AccompanimentFormService';

@NgModule({
  declarations: [SidebarComponent, NavbarComponent, CalendarComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    CommonModulesModule,
    AngularCalendarModule,
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    CalendarComponent,
    AngularMaterialModule,
    CommonModulesModule,
    AngularCalendarModule,
  ],
})
export class SharedModule {}
