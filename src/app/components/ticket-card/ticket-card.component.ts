import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css']
})
export class TicketCardComponent {
  @Input() ticket!: Ticket;
}
