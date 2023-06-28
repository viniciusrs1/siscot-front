import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { NavigationExtras, Router } from '@angular/router';
import { AccompanimentFormService } from '../../services/AccompanimentForm.service';
import { colors } from '../../utils/colors';
import { AccompanimentsService } from 'src/app/accompaniments/accompaniments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccompanimentDataService } from '../../services/AccompanimentData.service';
@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.scss'],

  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  locale: string = 'pt';
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = false;
  formData: any;
  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  events: CalendarEvent[] = [];

  constructor(
    private modal: NgbModal,
    private router: Router,
    private accompanimentsService: AccompanimentsService,
    private accompanimentFormService: AccompanimentFormService,
    private accompanimentDataService: AccompanimentDataService,
    private _snackBar: MatSnackBar
  ) {
    this.formData = this.accompanimentFormService.getFormData();
  }

  ngOnInit(): void {
    this.formData ? this.addEvent() : this.loadEvents();
  }

  loadEvents() {
    this.accompanimentsService.getAccompaniments().subscribe({
      next: (response: any) => {
        response.forEach((element: any) => {
          this.events.push({
            start: startOfDay(new Date(element.start)),
            title: element.title,
            color: colors['default'],
            actions: this.actions,
            allDay: true,
            meta: {
              id: element.id,
              pacienteId: element.pacienteId,
              profissionalId: element.profissionalId,
            },
          });
        });
        this.refresh.next();
      },
      error: (error) => {
        this.openSnackBar(
          'Erro ao carregar os acompanhamentos.',
          'Fechar',
          'error-message'
        );
      },
    });
  }

  openAccompanimentForm() {
    this.router.navigateByUrl('accompaniments/form/add');
  }

  addEvent(): void {
    const data = {
      title: this.formData.anotacoes,
      start: this.formData.data,
      pacienteId: this.formData.pacienteId,
      profissionalId: this.formData.profissionalId,
    };
    this.accompanimentsService.addAccompaniment(data).subscribe({
      next: (res) => {
        this.openSnackBar(
          'Acompanhamento cadastrado com sucesso!',
          'Fechar',
          'success-message'
        );
        this.accompanimentFormService.clearFormData();
        this.loadEvents();
      },
      error: (error) => {
        this.openSnackBar(
          'Erro ao carregar a lista de pacientes.',
          'Fechar',
          'error-message'
        );
      },
    });
  }

  handleEvent(action: string, event: CalendarEvent): void {
    const accompanimentData = {
      anotacoes: event.title,
      data: event.start,
      pacienteId: event.meta.pacienteId,
      profissionalId: event.meta.profissionalId,
    };

    this.accompanimentDataService.setData(accompanimentData);
    this.router.navigateByUrl(`accompaniments/form/view/${event.meta.id}`);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  openSnackBar(message: string, action: string, panelClass: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: [panelClass],
    });
  }

  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter((event) => event !== eventToDelete);
  // }

  // setView(view: CalendarView) {
  //   this.view = view;
  // }

  // eventTimesChanged({
  //   event,
  //   newStart,
  //   newEnd,
  // }: CalendarEventTimesChangedEvent): void {
  //   this.events = this.events.map((iEvent) => {
  //     if (iEvent === event) {
  //       return {
  //         ...event,
  //         start: newStart,
  //         end: newEnd,
  //       };
  //     }
  //     return iEvent;
  //   });
  //   this.handleEvent('Dropped or resized', event);
  // }
}
