export type TicketStatus = 'rascunho' | 'publicado';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  /** Data do evento no formato ISO `yyyy-MM-dd`. */
  eventDate: string;
  location: string;
  price: number;
  quantity: number;
  status: TicketStatus;
  /** Data de criacao em ISO 8601, usada para ordenar a listagem. */
  createdAt: string;
}

/** Dados necessarios para criar um ingresso; id, status e createdAt sao gerados pelo service. */
export type TicketDraft = Omit<Ticket, 'id' | 'status' | 'createdAt'>;

export const TICKET_STATUS_LABEL: Record<TicketStatus, string> = {
  rascunho: 'Rascunho',
  publicado: 'Publicado',
};

export const TICKET_STATUS_CLASS: Record<TicketStatus, string> = {
  rascunho: 'bg-amber-100 text-amber-800 ring-amber-200',
  publicado: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
};

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

/** Converte uma data `yyyy-MM-dd` em Date local; retorna null quando invalida. */
export function parseEventDate(eventDate: string): Date | null {
  if (!eventDate) {
    return null;
  }

  const parsed = new Date(`${eventDate}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatPrice(price: number): string {
  return currencyFormatter.format(Number.isFinite(price) ? price : 0);
}

export function formatEventDate(eventDate: string): string {
  const parsed = parseEventDate(eventDate);
  return parsed ? dateFormatter.format(parsed) : eventDate;
}

/** Valida o formato minimo de um ingresso lido do localStorage. */
export function isTicket(value: unknown): value is Ticket {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<Ticket>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.eventDate === 'string' &&
    typeof candidate.createdAt === 'string' &&
    (candidate.status === 'rascunho' || candidate.status === 'publicado')
  );
}
