import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CreateTicketInput, Ticket, TicketStatus } from '../models/ticket.model';

/**
 * Armazenamento em memória dos tickets.
 * Mantém a lista sempre ordenada do mais recente para o mais antigo.
 */
@Injectable({ providedIn: 'root' })
@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly ticketsSubject = new BehaviorSubject<readonly Ticket[]>([]);

  private sequence = 0;

  /** Stream somente leitura consumida pela tela de lista. */
  readonly tickets$: Observable<readonly Ticket[]> = this.ticketsSubject.asObservable();

  /** Snapshot atual da lista. */
  list(): readonly Ticket[] {
    return this.ticketsSubject.getValue();
  }

  /**
   * Cria um ticket. O título é obrigatório (regra de negócio).
   * @throws Error quando o título está vazio.
   */
  create(input: CreateTicketInput): Ticket {
    const title = TicketService.normalize(input && input.title);

    if (!title) {
      throw new Error('O título do ticket é obrigatório.');
    }

    const ticket: Ticket = {
      id: this.nextId(),
      title,
      description: TicketService.normalize(input && input.description),
      status: 'open',
      createdAt: new Date().toISOString(),
    };

    this.ticketsSubject.next([ticket, ...this.ticketsSubject.getValue()]);

    return ticket;
  }

  /** Atualiza o status de um ticket existente. */
  updateStatus(id: string, status: TicketStatus): void {
    const current = this.ticketsSubject.getValue();
    let changed = false;

    const updated = current.map((ticket) => {
      if (ticket.id !== id) {
        return ticket;
      }
      changed = true;
      return { ...ticket, status };
    });

    if (changed) {
      this.ticketsSubject.next(updated);
    }
  }

  /** Remove um ticket pelo identificador. */
  remove(id: string): void {
    this.ticketsSubject.next(
      this.ticketsSubject.getValue().filter((ticket) => ticket.id !== id),
    );
  }

  private static normalize(value: string | undefined | null): string {
    return (value ?? '').trim();
  }

  private nextId(): string {
    this.sequence += 1;
    return `TCK-${this.sequence.toString().padStart(4, '0')}`;
  }
}
