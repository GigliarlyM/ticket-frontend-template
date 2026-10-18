import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Ticket, TicketDraft, isTicket } from '../models/ticket.model';

const STORAGE_KEY = 'tickets-app.v1';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly ticketsState = signal<Ticket[]>(this.readFromStorage());

  /** Lista somente leitura, ordenada da criacao mais recente para a mais antiga. */
  readonly tickets = this.ticketsState.asReadonly();

  readonly total = computed(() => this.ticketsState().length);

  readonly draftCount = computed(
    () => this.ticketsState().filter((ticket) => ticket.status === 'rascunho').length,
  );

  readonly publishedCount = computed(
    () => this.ticketsState().filter((ticket) => ticket.status === 'publicado').length,
  );

  /** Cria um ingresso como rascunho e persiste a lista atualizada. */
  create(draft: TicketDraft): Ticket {
    const ticket: Ticket = {
      ...draft,
      id: generateId(),
      status: 'rascunho',
      createdAt: new Date().toISOString(),
    };

    this.ticketsState.update((tickets) => sortByCreatedAtDesc([ticket, ...tickets]));
    this.writeToStorage();

    return ticket;
  }

  private readFromStorage(): Ticket[] {
    if (!this.isBrowser) {
      return [];
    }

    try {
      const raw = globalThis.localStorage?.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }

      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }

      return sortByCreatedAtDesc(parsed.filter(isTicket));
    } catch {
      return [];
    }
  }

  private writeToStorage(): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(this.ticketsState()));
    } catch {
      // Sem localStorage disponivel: mantem os dados apenas em memoria.
    }
  }
}

function sortByCreatedAtDesc(tickets: Ticket[]): Ticket[] {
  return [...tickets].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

function generateId(): string {
  const cryptoRef = globalThis.crypto as { randomUUID?: () => string } | undefined;

  if (cryptoRef?.randomUUID) {
    return cryptoRef.randomUUID();
  }

  return `ticket-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}
