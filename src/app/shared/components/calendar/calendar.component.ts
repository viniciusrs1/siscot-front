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
import { Router } from '@angular/router';
import { AccompanimentFormService } from '../../services/AccompanimentFormService';
import { colors } from '../../utils/colors';
import { AccompanimentsService } from 'src/app/accompaniments/accompaniments.service';
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
        this.handleEvent('Deleted', event);
        this.loadEvents();
      },
    },
  ];

  events: CalendarEvent[] = [];

  constructor(
    private modal: NgbModal,
    private router: Router,
    private accompanimentsService: AccompanimentsService,
    private accompanimentFormService: AccompanimentFormService
  ) {
    this.formData = this.accompanimentFormService.getFormData();
  }

  ngOnInit(): void {
    if (this.formData) {
      this.addEvent();
      console.log('form', this.events);
    }
    this.loadEvents();
    console.log('result', this.events);
  }

  loadEvents() {
    this.accompanimentsService.getAccompaniments().subscribe({
      next: (response : any) => {
        console.log(response);
        this.events = [];
        response.forEach((element: any) => {
          this.events.push({
            start: startOfDay(new Date(element.start)),
            title: element.title,
            color: colors['red'],
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
        console.log(error);
      },
    });
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

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    //evento deletado
    if (action === 'Deleted') {
      this.deleteEvent(event);
    }
    //evento editado
    if (action === 'Edited') {
      this.router.navigateByUrl(`accompaniments/form/edit/${event.meta.id}`);
    }
    //evento clicado
    if (action === 'Clicked') {
      this.router.navigateByUrl(`accompaniments/form/view/${event.meta.id}`);
    }
  }

  openAccompanimentForm() {
    this.router.navigateByUrl('accompaniments/form/add');
  }
  addEvent(): void {
    const data = 
      {
        title: this.formData.anotacoes,
        start: this.formData.data,
        pacienteId: this.formData.pacienteId,
        profissionalId: this.formData.profissionalId,
      }
      this.accompanimentsService.addAccompaniment(data).subscribe({
        next: (response) => {
          this.accompanimentFormService.clearFormData();
          this.loadEvents();
      }, error: (error) => {console.log('error', error)}
  })}

  deleteEvent(eventToDelete: CalendarEvent) {
    console.log('event', eventToDelete);
    this.accompanimentsService.deleteAccompaniment(eventToDelete.meta.id).subscribe({
      next: (response) => {
        this.events = this.events.filter((event) => event !== eventToDelete);
        this.loadEvents();
      }, error: (error) => {console.log('error', error)}
  })}

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
