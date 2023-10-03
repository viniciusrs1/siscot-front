import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit, OnDestroy {
  @Input() disabled: boolean = false;
  @Input() title: string = '';

  destroy$: Subject<boolean> = new Subject<boolean>();

  members: any = [];
  absences: any = [];
  loadingMembers: boolean = false;
  loadingAbsences: boolean = false;

  editModal: boolean = false;

  constructor(
    private route: ActivatedRoute,

    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAbsences();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getMembers(): void {
    this.loadingMembers = true;
    // this.meetingsService
    //   .getMembers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(
    //     (res) => {
    //       const filter = res?.response?.filter((el: MembersInterface) => {
    //         return !this.absences.find((element: Absence) => {
    //           return element.absent_user_id === el.id;
    //         });
    //       });

    //       this.members = res?.response ? filter : [];
    //       this.loadingMembers = false;
    //     },
    //     (error) => {
    //       this.notifierService.notify(
    //         "error",
    //         "Ocorreu um erro ao carregar os membros."
    //       );
    //       this.loadingMembers = false;
    //     }
    //   );
  }

  toggleAbsence(id: number, justification: string): void {
    this.loadingAbsences = true;
    const idMeeting = parseInt(this.route.snapshot.params['id']);
    // this.meetingsService
    //   .addAbsence(id, idMeeting, justification)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(
    //     (res) => {
    //       this.notifierService.notify(
    //         "success",
    //         "Ausência lançada com sucesso."
    //       );
    //       this.getAbsences();
    //     },
    //     (error) => {
    //       this.notifierService.notify(
    //         "error",
    //         "Ocorreu um erro lançar a ausência."
    //       );
    //       this.loadingAbsences = false;
    //     }
    //   );
  }

  deleteAbsence(id: number): void {
    this.loadingAbsences = true;
    // this.meetingsService
    //   .deleteAbsence(id)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(
    //     (res) => {
    //       this.notifierService.notify(
    //         "success",
    //         "Ausência removida com sucesso."
    //       );

    //       this.getAbsences();
    //     },
    //     (error) => {
    //       this.notifierService.notify(
    //         "error",
    //         "Ocorreu um erro ao remover a ausência."
    //       );
    //       this.loadingAbsences = false;
    //     }
    //   );
  }

  getAbsences(): void {
    this.loadingAbsences = true;
    // this.meetingsService
    //   .getAbsences(this.route.snapshot.params["id"])
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(
    //     (res) => {
    //       console.log("resposta", res);
    //       this.absences = res?.response
    //         ? res.response.filter((val: Absence) => val.meeting === this.title)
    //         : [];

    //       this.getMembers();
    //       this.loadingAbsences = false;
    //     },
    //     (error) => {
    //       this.notifierService.notify(
    //         "error",
    //         "Ocorreu um erro ao carregar os membros ausentes."
    //       );
    //       this.loadingAbsences = false;
    //     }
    //   );
  }

  openModalAbsenceJustification(user: any): void {
    // const modalRef = this.modalService.open(ModalAbsenceJustificationComponent);
    // modalRef.componentInstance.user = user;
    // modalRef.result.then(
    //   (result) => {
    //     if (result.close) {
    //       this.toggleAbsence(user?.id, result?.data?.justification);
    //     }
    //   },
    //   (reason) => {}
    // );
  }
}
