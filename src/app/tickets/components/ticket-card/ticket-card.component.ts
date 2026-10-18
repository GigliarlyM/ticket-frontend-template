import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="ticket-card">
      <header class="ticket-card__header">
        <h3 class="ticket-card__titulo">{{ ticket.titulo }}</h3>
        <time
          class="ticket-card__data"
          [attr.datetime]="ticket.criadoEm.toISOString()"
        >
          {{ ticket.criadoEm | date: 'dd/MM/yyyy HH:mm' }}
        </time>
      </header>

      <p class="ticket-card__descricao" *ngIf="ticket.descricao; else semDescricao">
        {{ ticket.descricao }}
      </p>

      <ng-template #semDescricao>
        <p class="ticket-card__descricao ticket-card__descricao--vazia">Sem descricao.</p>
      </ng-template>
    </article>
  `,
  styles: [
    `
      .ticket-card {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.75rem;
        background-color: #ffffff;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
      }

      .ticket-card__header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 0.75rem;
      }

      .ticket-card__titulo {
        margin: 0;
        font-size: 1.05rem;
        font-weight: 600;
        color: #0f172a;
        overflow-wrap: anywhere;
      }

      .ticket-card__data {
        flex: 0 0 auto;
        font-size: 0.75rem;
        color: #64748b;
      }

      .ticket-card__descricao {
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.5;
        color: #334155;
        white-space: pre-line;
        overflow-wrap: anywhere;
      }

      .ticket-card__descricao--vazia {
        color: #94a3b8;
        font-style: italic;
      }
    `,
  ],
})
export class TicketCardComponent {
  @Input() ticket!: Ticket;
}
