import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="ticket-card">
      <header class="ticket-card__header">
        <h3 class="ticket-card__title">{{ ticket.title }}</h3>
        <time class="ticket-card__date" [attr.datetime]="ticket.createdAt.toISOString()">
          {{ ticket.createdAt | date: 'short' }}
        </time>
      </header>
      <p class="ticket-card__description" *ngIf="ticket.description; else noDescription">
        {{ ticket.description }}
      </p>
      <ng-template #noDescription>
        <p class="ticket-card__description ticket-card__description--empty">
          Sem descrição
        </p>
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
        box-shadow: 0 1px 3px rgb(15 23 42 / 10%);
      }

      .ticket-card__header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 1rem;
      }

      .ticket-card__title {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #0f172a;
      }

      .ticket-card__date {
        font-size: 0.75rem;
        color: #64748b;
        white-space: nowrap;
      }

      .ticket-card__description {
        margin: 0;
        font-size: 0.875rem;
        line-height: 1.5;
        color: #334155;
        white-space: pre-wrap;
      }

      .ticket-card__description--empty {
        color: #94a3b8;
        font-style: italic;
      }
    `,
  ],
})
export class TicketCardComponent {
  @Input() ticket!: Ticket;
}
