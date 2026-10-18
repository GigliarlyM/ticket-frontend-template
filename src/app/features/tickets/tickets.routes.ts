import { Routes } from '@angular/router';

export const TICKETS_ROUTES: Routes = [
  {
    path: '',
    title: 'Ingressos',
    loadComponent: () =>
      import('./ticket-list/ticket-list.component').then((m) => m.TicketListComponent),
  },
  {
    path: 'new',
    title: 'Novo ingresso',
    loadComponent: () =>
      import('./ticket-create/ticket-create.component').then((m) => m.TicketCreateComponent),
  },
];

export default TICKETS_ROUTES;
