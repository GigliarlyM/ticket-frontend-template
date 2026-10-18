import { computed, Injectable, signal } from '@angular/core';
import { Ticket } from '../models/ticket.model';

const STORAGE_KEY = 'tickets';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly ticketsState = signal<Ticket[]>(this.readFromStorage());

  readonly tickets = this.ticketsState.asReadonly();

  readonly count = computed(() => this.ticketsState().length);

  addTicket(title: string, description: string): Ticket {
    const ticket: Ticket = {
      id: this.generateId(),
      title: title.trim(),
      description: description.trim(),
      createdAt: new Date(),
    };

    this.ticketsState.update((tickets) => [ticket, ...tickets]);
    this.persist();
    return ticket;
  }

  removeTicket(id: string): void {
    this.ticketsState.update((tickets) => tickets.filter((ticket) => ticket.id !== id));
    this.persist();
  }

  getById(id: string): Ticket | undefined {
    return this.ticketsState().find((ticket) => ticket.id === id);
  }

  private generateId(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    return `ticket-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  private readFromStorage(): Ticket[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw) as Array<Omit<Ticket, 'createdAt'> & { createdAt: string }>;
      return parsed.map((item) => ({ ...item, createdAt: new Date(item.createdAt) }));
    } catch {
      return [];
    }
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ticketsState()));
    } catch {
      // Ignora erros de armazenamento (modo privado, cota excedida, etc.)
    }
  }
}
