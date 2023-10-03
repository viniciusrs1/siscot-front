import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AngularMaterialModule } from './modules/angular-material.module';
import { CommonModulesModule } from './modules/common-modules.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AngularCalendarModule } from './modules/angular-calendar.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AttendanceComponent } from './components/attendance/attendance.component';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    CalendarComponent,
    AttendanceComponent,
  ],
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
    AttendanceComponent,
    AngularMaterialModule,
    CommonModulesModule,
    AngularCalendarModule,
  ],
})
export class SharedModule {}
