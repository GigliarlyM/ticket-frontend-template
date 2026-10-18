import { Component, inject } from '@angular/core';
import { TicketService } from '../ticket.service';
import { TicketCardComponent } from '../ticket-card/ticket-card.component';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [TicketCardComponent, TicketFormComponent],
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent {
  private ticketService = inject(TicketService);
  tickets = this.ticketService.tickets;

  onTicketCreated(event: { title: string; description: string }): void {
    this.ticketService.addTicket(event.title, event.description);
  }
}
