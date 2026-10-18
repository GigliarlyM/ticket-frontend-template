export type TicketStatus = 'open' | 'in_progress' | 'done';

export interface Ticket {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: TicketStatus;
  readonly createdAt: string;
}

export interface CreateTicketInput {
  readonly title: string;
  readonly description?: string;
}

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  open: 'Aberto',
  in_progress: 'Em andamento',
  done: 'Concluído',
};

/**
 * Fluxo de status do ticket: Aberto -> Em andamento -> Concluído.
 * Retorna null quando o ticket já está no estado final.
 */
export function nextTicketStatus(status: TicketStatus): TicketStatus | null {
  switch (status) {
    case 'open':
      return 'in_progress';
    case 'in_progress':
      return 'done';
    default:
      return null;
  }
}
