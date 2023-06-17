import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
];
