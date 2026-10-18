import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TicketCardComponent } from '../../components/ticket-card/ticket-card.component';
import { TicketFormComponent } from '../../components/ticket-form/ticket-form.component';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, TicketFormComponent, TicketCardComponent],
  template: `
    <main class="ticket-page">
      <header class="ticket-page__header">
        <h1 class="ticket-page__title">Tickets</h1>
        <p class="ticket-page__subtitle">
          Crie e visualize os tickets cadastrados.
        </p>
      </header>

      <app-ticket-form (ticketCreated)="onTicketCreated()"></app-ticket-form>

      <section class="ticket-list" aria-labelledby="ticket-list-title">
        <h2 id="ticket-list-title" class="ticket-list__title">
          Lista de tickets ({{ ticketService.count() }})
        </h2>

        <p class="ticket-list__empty" *ngIf="ticketService.tickets().length === 0">
          Nenhum ticket cadastrado ainda. Utilize o formulário acima para criar o primeiro.
        </p>

        <ul class="ticket-list__items" *ngIf="ticketService.tickets().length > 0">
          <li
            *ngFor="let ticket of ticketService.tickets(); trackBy: trackByTicketId"
            class="ticket-list__item"
          >
            <app-ticket-card [ticket]="ticket"></app-ticket-card>
          </li>
        </ul>
      </section>
    </main>
  `,
  styles: [
    `
      .ticket-page {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        max-width: 720px;
        margin: 0 auto;
        padding: 2rem 1rem 3rem;
      }

      .ticket-page__header {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .ticket-page__title {
        margin: 0;
        font-size: 1.75rem;
        font-weight: 700;
        color: #0f172a;
      }

      .ticket-page__subtitle {
        margin: 0;
        font-size: 0.875rem;
        color: #64748b;
      }

      .ticket-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .ticket-list__title {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #0f172a;
      }

      .ticket-list__empty {
        margin: 0;
        padding: 1rem;
        border: 1px dashed #cbd5f5;
        border-radius: 0.75rem;
        font-size: 0.875rem;
        color: #64748b;
        text-align: center;
        background-color: #f8fafc;
      }

      .ticket-list__items {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .ticket-list__item {
        list-style: none;
      }
    `,
  ],
})
export class TicketListComponent {
  protected readonly ticketService = inject(TicketService);

  protected onTicketCreated(): void {
    // Hook para futuras ações após a criação de um ticket.
  }

  protected trackByTicketId(_index: number, ticket: { id: string }): string {
    return ticket.id;
  }
}
