import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {
  TICKET_STATUS_LABELS,
  Ticket,
  TicketStatus,
  nextTicketStatus,
} from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketCardComponent {
  @Input() ticket!: Ticket;

  @Output() statusChange = new EventEmitter<TicketStatus>();
  @Output() select = new EventEmitter<Ticket>();

  get statusLabel(): string {
    return TICKET_STATUS_LABELS[this.ticket.status];
  }

  get formattedDate(): string {
    const createdAt = new Date(this.ticket.createdAt);
    return Number.isNaN(createdAt.getTime()) ? '--' : createdAt.toLocaleString('pt-BR');
  }

  get nextStatus(): TicketStatus | null {
    return nextTicketStatus(this.ticket.status);
  }

  get actionLabel(): string {
    const status = this.nextStatus;
    if (status === 'in_progress') {
      return 'Iniciar';
    }
    if (status === 'done') {
      return 'Concluir';
    }
    return '';
  }

  advance(event: Event): void {
    event.stopPropagation();
    const status = this.nextStatus;
    if (status) {
      this.statusChange.emit(status);
    }
  }

  onSelect(): void {
    this.select.emit(this.ticket);
  }
}
