import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TicketService } from '../../../core/services/ticket.service';
import { TicketCardComponent } from '../ticket-card/ticket-card.component';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [RouterLink, TicketCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class='mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8'>
      <header class='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 class='text-2xl font-bold tracking-tight text-slate-900'>Ingressos</h1>
          <p class='mt-1 text-sm text-slate-600'>
            {{ total() }} ingresso(s) cadastrado(s), {{ draftCount() }} em rascunho.
          </p>
        </div>

        <a
          routerLink='/tickets/new'
          class='inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2'
        >
          Novo ingresso
        </a>
      </header>

      @if (tickets().length === 0) {
        <div class='mt-10 rounded-xl border border-dashed border-slate-300 bg-white/70 p-10 text-center'>
          <h2 class='text-lg font-semibold text-slate-900'>Nenhum ingresso cadastrado</h2>
          <p class='mt-2 text-sm text-slate-600'>
            Crie o primeiro ingresso para ve-lo listado aqui.
          </p>
          <a
            routerLink='/tickets/new'
            class='mt-6 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500'
          >
            Criar ingresso
          </a>
        </div>
      } @else {
        <div class='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          @for (ticket of tickets(); track ticket.id) {
            <app-ticket-card [ticket]='ticket' />
          }
        </div>
      }
    </section>
  `,
})
export class TicketListComponent {
  private readonly ticketService = inject(TicketService);

  protected readonly tickets = this.ticketService.tickets;
  protected readonly total = this.ticketService.total;
  protected readonly draftCount = this.ticketService.draftCount;
}
