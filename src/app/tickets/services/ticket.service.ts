import { Injectable, computed, signal } from '@angular/core';
import { NovoTicket, Ticket } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly state = signal<Ticket[]>([]);

  readonly tickets = this.state.asReadonly();
  readonly total = computed(() => this.state().length);
  readonly vazio = computed(() => this.state().length === 0);

  /**
   * Cria um novo ticket.
   * Regra de negocio: todo ticket deve ter titulo obrigatorio.
   */
  criar(dados: NovoTicket): Ticket {
    const titulo = this.normalizar(dados?.titulo);

    if (!titulo) {
      throw new Error('O titulo do ticket e obrigatorio.');
    }

    const ticket: Ticket = {
      id: this.gerarId(),
      titulo,
      descricao: this.normalizar(dados?.descricao),
      criadoEm: new Date(),
    };

    this.state.update((lista) => [ticket, ...lista]);
    return ticket;
  }

  limpar(): void {
    this.state.set([]);
  }

  private normalizar(valor: string | null | undefined): string {
    return (valor ?? '').trim();
  }

  private gerarId(): string {
    const sufixo = Math.random().toString(36).slice(2, 8);
    return `tkt-${Date.now().toString(36)}-${sufixo}`;
  }
}
