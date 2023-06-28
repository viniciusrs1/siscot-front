import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarView,
} from 'angular-calendar';
import { Router } from '@angular/router';
import { AccompanimentFormService } from '../../services/AccompanimentForm.service';
import { colors } from '../../utils/colors';
import { AccompanimentsService } from 'src/app/accompaniments/accompaniments.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.scss'],

  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  locale: string = 'pt';
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = false;
  formData: any;

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
    private router: Router,
    private accompanimentsService: AccompanimentsService,
    private accompanimentFormService: AccompanimentFormService,
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
        this.events = [];
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
    if (action === 'Deleted') {
      this.deleteEvent(event);
    }

    if (action === 'Edited') {
      this.router.navigateByUrl(`accompaniments/form/edit/${event.meta.id}`);
    }

    if (action === 'Clicked') {
      this.router.navigateByUrl(`accompaniments/form/view/${event.meta.id}`);
    }
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.accompanimentsService
      .deleteAccompaniment(eventToDelete.meta.id)
      .subscribe({
        next: (res) => {
          this.openSnackBar(
            'Acompanhamento deletado com sucesso!',
            'Fechar',
            'success-message'
          );
          this.closeOpenMonthViewDay();
          this.loadEvents();
        },
        error: (error) => {
          this.openSnackBar(
            'Erro ao deletar o acompanhamento.',
            'Fechar',
            'error-message'
          );
        },
      });
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
}
