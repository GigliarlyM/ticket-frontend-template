import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  TICKET_STATUS_CLASS,
  TICKET_STATUS_LABEL,
  Ticket,
  formatEventDate,
  formatPrice,
} from '../../../core/models/ticket.model';

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class='flex h-full flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md'>
      <header class='flex items-start justify-between gap-3'>
        <h3 class='text-base font-semibold text-slate-900'>{{ ticket().title }}</h3>
        <span
          class='shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset'
          [class]='statusClass()'
        >
          {{ statusLabel() }}
        </span>
      </header>

      <p class='text-sm text-slate-600'>{{ ticket().description }}</p>

      <dl class='mt-auto grid grid-cols-2 gap-3 text-sm'>
        <div>
          <dt class='text-xs font-medium uppercase tracking-wide text-slate-400'>Data</dt>
          <dd class='text-slate-800'>{{ formattedDate() }}</dd>
        </div>
        <div>
          <dt class='text-xs font-medium uppercase tracking-wide text-slate-400'>Local</dt>
          <dd class='text-slate-800'>{{ ticket().location }}</dd>
        </div>
        <div>
          <dt class='text-xs font-medium uppercase tracking-wide text-slate-400'>Preco</dt>
          <dd class='text-slate-800'>{{ formattedPrice() }}</dd>
        </div>
        <div>
          <dt class='text-xs font-medium uppercase tracking-wide text-slate-400'>Quantidade</dt>
          <dd class='text-slate-800'>{{ ticket().quantity }}</dd>
        </div>
      </dl>
    </article>
  `,
})
export class TicketCardComponent {
  readonly ticket = input.required<Ticket>();

  protected readonly statusLabel = computed(() => TICKET_STATUS_LABEL[this.ticket().status]);
  protected readonly statusClass = computed(() => TICKET_STATUS_CLASS[this.ticket().status]);
  protected readonly formattedPrice = computed(() => formatPrice(this.ticket().price));
  protected readonly formattedDate = computed(() => formatEventDate(this.ticket().eventDate));
}
