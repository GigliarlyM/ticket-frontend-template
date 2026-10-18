import { Injectable, computed, signal } from '@angular/core';
import { CreateTicketInput, TICKET_LIMITS, Ticket } from '../models/ticket.model';

/**
 * Servico responsavel por manter e manipular os tickets da aplicacao.
 *
 * O armazenamento e feito em memoria, o que e suficiente para validar o fluxo
 * de criacao e listagem de tickets.
 */
@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly state = signal<readonly Ticket[]>([]);

  /** Lista reativa com os tickets cadastrados (mais recentes primeiro). */
  readonly tickets = this.state.asReadonly();

  /** Quantidade total de tickets cadastrados. */
  readonly total = computed(() => this.state().length);

  /** Quantidade de tickets com situacao aberta. */
  readonly openCount = computed(
    () => this.state().filter((ticket) => ticket.status === 'open').length,
  );

  /** Retorna uma copia da lista de tickets. */
  list(): Ticket[] {
    return [...this.state()];
  }

  /** Busca um ticket pelo identificador. */
  findById(id: string): Ticket | undefined {
    return this.state().find((ticket) => ticket.id === id);
  }

  /**
   * Cria um novo ticket.
   *
   * Regra de negocio: o titulo e obrigatorio.
   *
   * @throws Error quando o titulo e vazio ou algum limite e excedido.
   */
  create(input: CreateTicketInput): Ticket {
    const title = (input?.title ?? '').trim();

    if (!title) {
      throw new Error('O titulo do ticket e obrigatorio.');
    }

    if (title.length > TICKET_LIMITS.titleMaxLength) {
      throw new Error(`O titulo deve ter no maximo ${TICKET_LIMITS.titleMaxLength} caracteres.`);
    }

    const description = (input?.description ?? '').trim();

    if (description.length > TICKET_LIMITS.descriptionMaxLength) {
      throw new Error(
        `A descricao deve ter no maximo ${TICKET_LIMITS.descriptionMaxLength} caracteres.`,
      );
    }

    const ticket: Ticket = {
      id: createTicketId(),
      title,
      description,
      status: 'open',
      createdAt: new Date(),
    };

    this.state.update((tickets) => [ticket, ...tickets]);

    return ticket;
  }

  /** Alterna a situacao do ticket entre aberto e fechado. */
  toggleStatus(id: string): Ticket | undefined {
    const current = this.findById(id);

    if (!current) {
      return undefined;
    }

    const updated: Ticket = {
      ...current,
      status: current.status === 'open' ? 'closed' : 'open',
    };

    this.state.update((tickets) =>
      tickets.map((ticket) => (ticket.id === id ? updated : ticket)),
    );

    return updated;
  }

  /** Remove todos os tickets do estado em memoria. */
  clear(): void {
    this.state.set([]);
  }
}

/** Gera um identificador unico para o ticket. */
function createTicketId(): string {
  const globalCrypto = globalThis.crypto;

  if (globalCrypto && typeof globalCrypto.randomUUID === 'function') {
    return globalCrypto.randomUUID();
  }

  return `ticket_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}
