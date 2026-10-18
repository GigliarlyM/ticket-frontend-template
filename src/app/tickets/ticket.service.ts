import { Injectable, signal } from '@angular/core';
import { Ticket } from './ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketsSignal = signal<Ticket[]>([]);
  public tickets = this.ticketsSignal.asReadonly();

  addTicket(title: string, description: string): void {
    const newTicket: Ticket = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim()
    };
    this.ticketsSignal.update(tickets => [...tickets, newTicket]);
  }
}
