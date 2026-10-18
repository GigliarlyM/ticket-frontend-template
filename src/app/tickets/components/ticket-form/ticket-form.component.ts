import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  DESCRICAO_MAX_LENGTH,
  NovoTicket,
  TITULO_MAX_LENGTH,
} from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="ticket-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
      <h2 class="ticket-form__titulo">Novo ticket</h2>

      <label class="ticket-form__campo">
        <span class="ticket-form__label">Titulo *</span>
        <input
          type="text"
          formControlName="titulo"
          [attr.maxlength]="tituloMaxLength"
          placeholder="Ex.: Erro ao salvar cadastro"
          autocomplete="off"
        />
      </label>

      <p class="ticket-form__erro" *ngIf="titulo.invalid && titulo.touched">
        {{ mensagemErroTitulo() }}
      </p>

      <label class="ticket-form__campo">
        <span class="ticket-form__label">Descricao</span>
        <textarea
          formControlName="descricao"
          rows="3"
          [attr.maxlength]="descricaoMaxLength"
          placeholder="Detalhe o problema (opcional)"
        ></textarea>
      </label>

      <button type="submit" class="ticket-form__acao" [disabled]="form.invalid">
        Criar ticket
      </button>
    </form>
  `,
  styles: [
    `
      .ticket-form {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 1.25rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.75rem;
        background-color: #f8fafc;
      }

      .ticket-form__titulo {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: #0f172a;
      }

      .ticket-form__campo {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .ticket-form__label {
        font-size: 0.85rem;
        font-weight: 600;
        color: #334155;
      }

      .ticket-form__campo input,
      .ticket-form__campo textarea {
        padding: 0.5rem 0.75rem;
        border: 1px solid #cbd5f5;
        border-radius: 0.5rem;
        font: inherit;
        color: #0f172a;
        background-color: #ffffff;
      }

      .ticket-form__campo input:focus,
      .ticket-form__campo textarea:focus {
        outline: 2px solid #2563eb;
        outline-offset: 1px;
        border-color: #2563eb;
      }

      .ticket-form__erro {
        margin: 0;
        font-size: 0.8rem;
        color: #b91c1c;
      }

      .ticket-form__acao {
        align-self: flex-start;
        padding: 0.5rem 1.25rem;
        border: none;
        border-radius: 0.5rem;
        font: inherit;
        font-weight: 600;
        color: #ffffff;
        background-color: #2563eb;
        cursor: pointer;
      }

      .ticket-form__acao:disabled {
        background-color: #94a3b8;
        cursor: not-allowed;
      }
    `,
  ],
})
export class TicketFormComponent {
  @Output() criar = new EventEmitter<NovoTicket>();

  readonly tituloMaxLength = TITULO_MAX_LENGTH;
  readonly descricaoMaxLength = DESCRICAO_MAX_LENGTH;

  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.maxLength(TITULO_MAX_LENGTH)]],
    descricao: ['', [Validators.maxLength(DESCRICAO_MAX_LENGTH)]],
  });

  get titulo() {
    return this.form.controls.titulo;
  }

  mensagemErroTitulo(): string {
    const controle = this.titulo;

    if (controle.hasError('required')) {
      return 'O titulo do ticket e obrigatorio.';
    }

    if (controle.hasError('maxlength')) {
      return `O titulo deve ter no maximo ${TITULO_MAX_LENGTH} caracteres.`;
    }

    return '';
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { titulo, descricao } = this.form.getRawValue();

    this.criar.emit({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
    });

    this.form.reset({ titulo: '', descricao: '' });
  }
}
