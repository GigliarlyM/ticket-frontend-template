import { Routes } from '@angular/router';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';

/**
 * Rotas da funcionalidade de tickets.
 *
 * Para usar na aplicacao, registre em `src/app/app.routes.ts`:
 * `{ path: 'tickets', loadChildren: () => import('./tickets/tickets.routes').then((m) => m.TICKETS_ROUTES) }`
 */
export const TICKETS_ROUTES: Routes = [
  {
    path: '',
    component: TicketListComponent,
    title: 'Tickets',
  },
];
