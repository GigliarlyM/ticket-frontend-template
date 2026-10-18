import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TICKET_LIMITS, Ticket } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';
import { TicketCardComponent } from '../../components/ticket-card/ticket-card.component';

/**
 * Tela de lista de tickets: formulario de criacao + listagem dos tickets.
 */
@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TicketCardComponent],
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketListComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly ticketService = inject(TicketService);

  readonly titleMaxLength = TICKET_LIMITS.titleMaxLength;
  readonly descriptionMaxLength = TICKET_LIMITS.descriptionMaxLength;

  readonly tickets = this.ticketService.tickets;
  readonly total = this.ticketService.total;
  readonly openCount = this.ticketService.openCount;

  readonly form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(TICKET_LIMITS.titleMaxLength)]],
    description: ['', [Validators.maxLength(TICKET_LIMITS.descriptionMaxLength)]],
  });

  /** Mensagem de erro exibida acima do botao de envio. */
  errorMessage: string | null = null;

  get titleControl() {
    return this.form.controls.title;
  }

  get descriptionControl() {
    return this.form.controls.description;
  }

  /** Valida o formulario e cria um novo ticket. */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = 'Informe um titulo para criar o ticket.';
      return;
    }

    const { title, description } = this.form.getRawValue();

    try {
      this.ticketService.create({ title, description });
      this.form.reset({ title: '', description: '' });
      this.errorMessage = null;
    } catch (error) {
      this.errorMessage =
        error instanceof Error ? error.message : 'Nao foi possivel criar o ticket.';
    }
  }

  /** Alterna a situacao do ticket selecionado. */
  toggleStatus(id: string): void {
    this.ticketService.toggleStatus(id);
  }

  /** Rastreia os itens da lista pelo id do ticket. */
  trackByTicketId(_index: number, ticket: Ticket): string {
    return ticket.id;
  }
}
