/**
 * Modelos de dominio da funcionalidade de tickets.
 */

/** Situacao atual de um ticket. */
export type TicketStatus = 'open' | 'closed';

/** Ticket mantido em memoria pela aplicacao. */
export interface Ticket {
  /** Identificador unico do ticket. */
  readonly id: string;
  /** Titulo do ticket. Obrigatorio e nao vazio. */
  readonly title: string;
  /** Descricao opcional com detalhes do problema. */
  readonly description: string;
  /** Situacao atual do ticket. */
  readonly status: TicketStatus;
  /** Data de criacao do ticket. */
  readonly createdAt: Date;
}

/** Dados necessarios para criar um ticket. */
export interface CreateTicketInput {
  /** Titulo do ticket (obrigatorio). */
  title: string;
  /** Descricao opcional. */
  description?: string;
}

/** Limites de validacao compartilhados entre formulario e servico. */
export const TICKET_LIMITS = {
  titleMaxLength: 120,
  descriptionMaxLength: 500,
} as const;
