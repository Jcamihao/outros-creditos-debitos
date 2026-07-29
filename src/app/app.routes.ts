import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/pages/consulta-lotes/consulta-lotes.component').then(
        (m) => m.ConsultaLotesComponent,
      ),
  },
];
