import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localePt from '@angular/common/locales/pt';
import { Portuguese } from 'flatpickr/dist/l10n/pt.js';

registerLocaleData(localePt);
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModalModule,
    FlatpickrModule.forRoot({ locale: Portuguese }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [CalendarModule, NgbModalModule, FlatpickrModule],
})
export class AngularCalendarModule {}
