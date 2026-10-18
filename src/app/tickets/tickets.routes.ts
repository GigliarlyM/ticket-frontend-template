import { Routes } from '@angular/router';

export const ticketRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/ticket-list/ticket-list.component').then((m) => m.TicketListComponent),
  },
];
