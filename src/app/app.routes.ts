import { Routes } from '@angular/router';
import { TicketListComponent } from './tickets/pages/ticket-list/ticket-list.component';

export const routes: Routes = [
  { path: '', component: TicketListComponent, title: 'Tickets' },
  { path: 'tickets', component: TicketListComponent, title: 'Tickets' },
  { path: '**', redirectTo: '' },
];

export default routes;
