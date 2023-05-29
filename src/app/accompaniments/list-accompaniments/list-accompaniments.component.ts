import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AccompanimentsService } from '../accompaniments.service';

@Component({
  selector: 'app-list-accompaniments',
  templateUrl: './list-accompaniments.component.html',
  styleUrls: ['./list-accompaniments.component.scss'],
})
export class ListAccompanimentsComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  rows: any = null;
  temp: any = [];
  filter: string = '';
  maxRows: number = 10;
  loading: boolean = false;

  constructor(
    private route: Router,
    private accompanimentsService: AccompanimentsService
  ) {}

  ngOnInit(): void {
    this.getAccompaniments();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  updateFilter(event: any): void {
    const val = event.toLowerCase();

    if (this.temp?.length > 0) {
      const filter = this.temp.filter(
        (item: any) => item.name.toLowerCase().indexOf(val) !== -1 || !val
      );

      this.rows = filter;
    }
  }

  getAccompaniments(): void {
    this.accompanimentsService
      .getAccompaniments()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.rows = res ? res : [];
          this.temp = this.rows ? [...this.rows] : [];
          this.loading = false;
        },
        error: (error) => {
          console.log(error);
          this.loading = false;
        },
      });
  }

  addAccompaniment() {
    console.log('ento');
    this.route.navigateByUrl('accompaniments/form/add');
  }

  viewAccompaniment(id: number): void {
    console.log('aq', id);
    this.route.navigate(['/accompaniments/form/', 'view', id]);
  }

  editAccompaniment(id: number): void {
    this.route.navigate(['/accompaniments/form/', 'edit', id]);
  }
}
