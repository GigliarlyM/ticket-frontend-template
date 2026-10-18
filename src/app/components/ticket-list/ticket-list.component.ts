import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { Ticket, TicketStatus } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';
import { TicketCardComponent } from '../ticket-card/ticket-card.component';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TicketCardComponent],
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketListComponent {
  private readonly ticketService = inject(TicketService);

  readonly tickets$: Observable<readonly Ticket[]> = this.ticketService.tickets$;

  title = '';
  description = '';
  errorMessage = '';
  selectedTicket: Ticket | null = null;

  get canSubmit(): boolean {
    return this.title.trim().length > 0;
  }

  createTicket(): void {
    if (!this.canSubmit) {
      this.errorMessage = 'O título do ticket é obrigatório.';
      return;
    }

    this.ticketService.create({ title: this.title, description: this.description });

    this.title = '';
    this.description = '';
    this.errorMessage = '';
  }

  changeStatus(ticket: Ticket, status: TicketStatus): void {
    this.ticketService.updateStatus(ticket.id, status);
  }

  selectTicket(ticket: Ticket): void {
    this.selectedTicket = ticket;
  }

  trackByTicketId(_index: number, ticket: Ticket): string {
    return ticket.id;
  }
}
