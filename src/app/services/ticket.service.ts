import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private tickets: Ticket[] = [];
  private ticketsSubject = new BehaviorSubject<Ticket[]>([]);
  public tickets$: Observable<Ticket[]> = this.ticketsSubject.asObservable();

  private nextId = 1;

  addTicket(title: string, description: string): void {
    if (!title || title.trim() === '') {
      throw new Error('Title is required');
    }
    const newTicket: Ticket = {
      id: this.nextId++,
      title: title.trim(),
      description: description.trim()
    };
    this.tickets = [...this.tickets, newTicket];
    this.ticketsSubject.next(this.tickets);
  }

  getTickets(): Observable<Ticket[]> {
    return this.tickets$;
  }
}
