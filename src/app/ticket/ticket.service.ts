import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ticket } from './ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private tickets: Ticket[] = [];
  private ticketsSubject = new BehaviorSubject<Ticket[]>([]);

  getTickets(): Observable<Ticket[]> {
    return this.ticketsSubject.asObservable();
  }

  addTicket(title: string, description?: string): void {
    const newTicket: Ticket = {
      id: this.tickets.length + 1,
      title,
      description,
      createdAt: new Date()
    };
    this.tickets.push(newTicket);
    this.ticketsSubject.next([...this.tickets]);
  }
}
