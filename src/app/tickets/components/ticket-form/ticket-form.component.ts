import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form class="ticket-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
      <h2 class="ticket-form__title">Novo ticket</h2>

      <div class="ticket-form__field">
        <label class="ticket-form__label" for="ticket-title">Título *</label>
        <input
          id="ticket-title"
          class="ticket-form__input"
          type="text"
          formControlName="title"
          placeholder="Digite o título do ticket"
          autocomplete="off"
        />

        <p class="ticket-form__error" *ngIf="titleControl.invalid && titleControl.touched">
          <span *ngIf="titleControl.errors?.['required']">O título é obrigatório.</span>
          <span *ngIf="titleControl.errors?.['maxlength']">
            O título deve ter no máximo 120 caracteres.
          </span>
        </p>
      </div>

      <div class="ticket-form__field">
        <label class="ticket-form__label" for="ticket-description">Descrição</label>
        <textarea
          id="ticket-description"
          class="ticket-form__input ticket-form__input--textarea"
          formControlName="description"
          rows="3"
          placeholder="Descreva o ticket (opcional)"
        ></textarea>

        <p
          class="ticket-form__error"
          *ngIf="descriptionControl.invalid && descriptionControl.touched"
        >
          <span *ngIf="descriptionControl.errors?.['maxlength']">
            A descrição deve ter no máximo 500 caracteres.
          </span>
        </p>
      </div>

      <button class="ticket-form__submit" type="submit" [disabled]="form.invalid">
        Criar ticket
      </button>
    </form>
  `,
  styles: [
    `
      .ticket-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1.25rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.75rem;
        background-color: #f8fafc;
      }

      .ticket-form__title {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #0f172a;
      }

      .ticket-form__field {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }

      .ticket-form__label {
        font-size: 0.875rem;
        font-weight: 500;
        color: #334155;
      }

      .ticket-form__input {
        width: 100%;
        padding: 0.625rem 0.75rem;
        border: 1px solid #cbd5f5;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        color: #0f172a;
        background-color: #ffffff;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }

      .ticket-form__input:focus {
        outline: none;
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgb(37 99 235 / 15%);
      }

      .ticket-form__input--textarea {
        resize: vertical;
        min-height: 4.5rem;
      }

      .ticket-form__error {
        margin: 0;
        font-size: 0.75rem;
        color: #dc2626;
      }

      .ticket-form__submit {
        align-self: flex-start;
        padding: 0.625rem 1.25rem;
        border: none;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        color: #ffffff;
        background-color: #2563eb;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }

      .ticket-form__submit:hover:not(:disabled) {
        background-color: #1d4ed8;
      }

      .ticket-form__submit:disabled {
        background-color: #93c5fd;
        cursor: not-allowed;
      }
    `,
  ],
})
export class TicketFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly ticketService = inject(TicketService);

  @Output() ticketCreated = new EventEmitter<void>();

  protected readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(120)]],
    description: ['', [Validators.maxLength(500)]],
  });

  protected get titleControl() {
    return this.form.controls.title;
  }

  protected get descriptionControl() {
    return this.form.controls.description;
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { title, description } = this.form.getRawValue();
    this.ticketService.addTicket(title, description);
    this.form.reset({ title: '', description: '' });
    this.ticketCreated.emit();
  }
}
