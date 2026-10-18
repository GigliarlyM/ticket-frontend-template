import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketCardComponent } from '../../components/ticket-card/ticket-card.component';
import { TicketFormComponent } from '../../components/ticket-form/ticket-form.component';
import { TicketService } from '../../services/ticket.service';
import { NovoTicket } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, TicketCardComponent, TicketFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="tickets">
      <header class="tickets__header">
        <h1 class="tickets__titulo">Tickets</h1>
        <p class="tickets__resumo">{{ total() }} ticket(s) cadastrado(s)</p>
      </header>

      <app-ticket-form (criar)="onCriar($event)"></app-ticket-form>

      <ul class="tickets__lista" *ngIf="!vazio(); else vazioTemplate">
        <li class="tickets__item" *ngFor="let ticket of tickets()">
          <app-ticket-card [ticket]="ticket"></app-ticket-card>
        </li>
      </ul>

      <ng-template #vazioTemplate>
        <p class="tickets__vazio">Nenhum ticket cadastrado ate o momento.</p>
      </ng-template>
    </section>
  `,
  styles: [
    `
      .tickets {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        max-width: 720px;
        margin: 0 auto;
        padding: 1.5rem 1rem 3rem;
      }

      .tickets__header {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .tickets__titulo {
        margin: 0;
        font-size: 1.6rem;
        font-weight: 700;
        color: #0f172a;
      }

      .tickets__resumo {
        margin: 0;
        font-size: 0.9rem;
        color: #64748b;
      }

      .tickets__lista {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .tickets__item {
        display: block;
      }

      .tickets__vazio {
        margin: 0;
        padding: 1rem;
        border: 1px dashed #cbd5f5;
        border-radius: 0.75rem;
        text-align: center;
        font-size: 0.9rem;
        color: #64748b;
      }
    `,
  ],
})
export class TicketListComponent {
  private readonly ticketService = inject(TicketService);

  readonly tickets = this.ticketService.tickets;
  readonly total = this.ticketService.total;
  readonly vazio = this.ticketService.vazio;

  onCriar(dados: NovoTicket): void {
    this.ticketService.criar(dados);
  }
}
