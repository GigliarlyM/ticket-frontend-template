import { Component, input } from '@angular/core';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [],
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css']
})
export class TicketCardComponent {
  ticket = input.required<Ticket>();
}
