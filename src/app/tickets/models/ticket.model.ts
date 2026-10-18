export interface Ticket {
  id: string;
  titulo: string;
  descricao: string;
  criadoEm: Date;
}

export type NovoTicket = Pick<Ticket, 'titulo' | 'descricao'>;

export const TITULO_MAX_LENGTH = 120;
export const DESCRICAO_MAX_LENGTH = 500;
