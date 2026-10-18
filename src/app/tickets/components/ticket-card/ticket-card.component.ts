import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../models/ticket.model';

/**
 * Card que apresenta um unico ticket e permite alternar sua situacao.
 */
@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketCardComponent {
  /** Ticket exibido pelo card. */
  @Input({ required: true }) ticket!: Ticket;

  /** Emitido com o id do ticket quando o usuario alterna a situacao. */
  @Output() readonly statusToggle = new EventEmitter<string>();

  /** Indica se o ticket esta aberto. */
  get isOpen(): boolean {
    return this.ticket.status === 'open';
  }

  /** Rotulo textual da situacao do ticket. */
  get statusLabel(): string {
    return this.isOpen ? 'Aberto' : 'Fechado';
  }

  /** Acao do botao de alternancia de situacao. */
  onToggle(): void {
    this.statusToggle.emit(this.ticket.id);
  }
}
