import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
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
import { takeUntil } from 'rxjs/operators';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.scss'],

  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit, OnDestroy {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  locale: string = 'pt';
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = false;
  formData: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  patients: any;
  professionals: any;

  events: CalendarEvent[] = [];

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
    this.getPatients();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  loadEvents() {
    this.accompanimentsService
      .getAccompaniments()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
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
    this.accompanimentsService
      .addAccompaniment(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
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
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.deletarAcompanhamentoMock(eventToDelete.meta.id);
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

  getPatients(): any {
    this.accompanimentsService
      .getPatients()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.patients = res ? res : [];
          this.getProfessional();
        },
        error: (error: any) => {
          this.openSnackBar(
            'Erro ao carregar a lista de pacientes.',
            'Fechar',
            'error-message'
          );
        },
      });
  }

  getProfessional(): any {
    this.accompanimentsService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.professionals = res
            ? res.filter((val: any) => val.cargo === 'ASSISTENTE SOCIAL')
            : [];
        },
        error: (error: any) => {
          this.openSnackBar(
            'Erro ao carregar a lista de profissionais.',
            'Fechar',
            'error-message'
          );
        },
      });
  }

  deletarAcompanhamentoMock(id: any) {
    const acompanhamentosLocalStorage = localStorage.getItem('acompanhamentos');

    if (acompanhamentosLocalStorage) {
      let acompanhamentos: any[] = JSON.parse(acompanhamentosLocalStorage);

      const indiceAcompanhamento = acompanhamentos.findIndex(
        (item) => item.id === id
      );

      if (indiceAcompanhamento !== -1) {
        acompanhamentos.splice(indiceAcompanhamento, 1);
        localStorage.setItem(
          'acompanhamentos',
          JSON.stringify(acompanhamentos)
        );

        console.log(`Acompanhamento com ID ${id} removido com sucesso.`);
      } else {
        console.log(`Acompanhamento com ID ${id} não encontrado.`);
      }
    } else {
      console.log('Nenhum acompanhamento encontrado no localStorage.');
    }
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

  createPDF(): void {
    const pdf = new jsPDF();
    pdf.text('Relatório de Acompanhamentos', 14, 14);

    const acompanhamentosLocalStorage = localStorage.getItem('acompanhamentos');

    if (acompanhamentosLocalStorage) {
      const acompanhamentos: any[] = JSON.parse(acompanhamentosLocalStorage);

      acompanhamentos.sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
      );

      const professionalsMap = this.professionals.reduce(
        (acc: any, prof: any) => {
          acc[prof.id] = prof.nome;
          return acc;
        },
        {}
      );

      const patientsMap = this.patients.reduce((acc: any, patient: any) => {
        acc[patient.id] = patient.nome;
        return acc;
      }, {});

      autoTable(pdf, {
        head: [['Título', 'Profissional', 'Pacientes', 'Data']],
        body: acompanhamentos.map((acompanhamento) => [
          acompanhamento.title,
          professionalsMap[acompanhamento.profissionalId] || '',
          this.formatPatients(acompanhamento.pacienteId, patientsMap),
          this.formatDate(acompanhamento.start),
        ]),
        startY: 24,
        // theme: 'striped',
        // styles: { lineWidth: 0.1, lineColor: [0, 0, 0] },
      });

      pdf.save('Siscot - Lista de Acompanhamentos.pdf');
    } else {
      console.log('Nenhum dado encontrado no localStorage.');
    }
  }

  // Função para formatar a data no estilo desejado
  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  }

  // Função para formatar a lista de pacientes
  formatPatients(
    patientIds: number[],
    patientsMap: Record<number, string>
  ): string {
    return patientIds
      .map((patientId) => patientsMap[patientId] || '')
      .join('\n');
  }
}
