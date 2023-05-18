import { Routes } from '@angular/router';

export const Approutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then(
        (m) => m.UsersModule
      ),
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./patients/patients.module').then(
        (m) => m.PatientsModule
      ),
  },
];