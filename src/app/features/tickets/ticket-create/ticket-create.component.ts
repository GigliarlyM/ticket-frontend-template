import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Ticket, formatEventDate, formatPrice } from '../../../core/models/ticket.model';
import { TicketService } from '../../../core/services/ticket.service';
import { integerValidator, notInThePastValidator } from '../ticket-validators';

const FIELD_NAMES = ['title', 'description', 'eventDate', 'location', 'price', 'quantity'] as const;
type FieldName = (typeof FIELD_NAMES)[number];

@Component({
  selector: 'app-ticket-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class='mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 lg:px-8'>
      <header>
        <h1 class='text-2xl font-bold tracking-tight text-slate-900'>Novo ingresso</h1>
        <p class='mt-1 text-sm text-slate-600'>Todo ingresso e criado com status rascunho.</p>
      </header>

      @if (createdTicket(); as ticket) {
        <div class='mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6'>
          <h2 class='text-base font-semibold text-emerald-900'>Ingresso salvo como rascunho</h2>
          <p class='mt-1 text-sm text-emerald-800'>
            {{ ticket.title }} - {{ formatEventDate(ticket.eventDate) }} - {{ ticket.location }} -
            {{ formatPrice(ticket.price) }} - {{ ticket.quantity }} unidade(s)
          </p>

          <div class='mt-5 flex flex-wrap gap-3'>
            <a
              routerLink='/tickets'
              class='inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500'
            >
              Ver listagem
            </a>
            <button
              type='button'
              (click)='createAnother()'
              class='inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50'
            >
              Criar outro ingresso
            </button>
          </div>
        </div>
      } @else {
        <form
          class='mt-8 space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm'
          [formGroup]='form'
          (ngSubmit)='submit()'
          novalidate
        >
          <div class='grid gap-5 sm:grid-cols-2'>
            <div class='sm:col-span-2'>
              <label for='ticket-title' [class]='labelClass'>Titulo</label>
              <input
                id='ticket-title'
                type='text'
                formControlName='title'
                autocomplete='off'
                placeholder='Ex.: Show da banda'
                [class]='inputClass'
              />
              @if (isInvalid('title')) {
                <p [class]='errorClass'>
                  @if (form.controls.title.hasError('required')) {
                    Informe o titulo.
                  } @else {
                    Use no maximo 120 caracteres.
                  }
                </p>
              }
            </div>

            <div class='sm:col-span-2'>
              <label for='ticket-description' [class]='labelClass'>Descricao</label>
              <textarea
                id='ticket-description'
                rows='3'
                formControlName='description'
                placeholder='Detalhes do evento'
                [class]='inputClass'
              ></textarea>
              @if (isInvalid('description')) {
                <p [class]='errorClass'>
                  @if (form.controls.description.hasError('required')) {
                    Informe a descricao.
                  } @else {
                    Use no maximo 500 caracteres.
                  }
                </p>
              }
            </div>

            <div>
              <label for='ticket-event-date' [class]='labelClass'>Data do evento</label>
              <input id='ticket-event-date' type='date' formControlName='eventDate' [class]='inputClass' />
              @if (isInvalid('eventDate')) {
                <p [class]='errorClass'>
                  @if (form.controls.eventDate.hasError('required')) {
                    Informe a data do evento.
                  } @else if (form.controls.eventDate.hasError('pastDate')) {
                    A data do evento nao pode estar no passado.
                  } @else {
                    Data invalida.
                  }
                </p>
              }
            </div>

            <div>
              <label for='ticket-location' [class]='labelClass'>Local</label>
              <input
                id='ticket-location'
                type='text'
                formControlName='location'
                autocomplete='off'
                placeholder='Ex.: Arena Central'
                [class]='inputClass'
              />
              @if (isInvalid('location')) {
                <p [class]='errorClass'>
                  @if (form.controls.location.hasError('required')) {
                    Informe o local.
                  } @else {
                    Use no maximo 160 caracteres.
                  }
                </p>
              }
            </div>

            <div>
              <label for='ticket-price' [class]='labelClass'>Preco (R$)</label>
              <input
                id='ticket-price'
                type='number'
                min='0'
                step='0.01'
                formControlName='price'
                [class]='inputClass'
              />
              @if (isInvalid('price')) {
                <p [class]='errorClass'>
                  @if (form.controls.price.hasError('required')) {
                    Informe o preco.
                  } @else {
                    O preco deve ser maior ou igual a zero.
                  }
                </p>
              }
            </div>

            <div>
              <label for='ticket-quantity' [class]='labelClass'>Quantidade</label>
              <input
                id='ticket-quantity'
                type='number'
                min='1'
                step='1'
                formControlName='quantity'
                [class]='inputClass'
              />
              @if (isInvalid('quantity')) {
                <p [class]='errorClass'>
                  @if (form.controls.quantity.hasError('required')) {
                    Informe a quantidade.
                  } @else if (form.controls.quantity.hasError('integer')) {
                    A quantidade deve ser um numero inteiro.
                  } @else {
                    A quantidade deve ser maior ou igual a um.
                  }
                </p>
              }
            </div>
          </div>

          <div class='flex flex-wrap items-center justify-end gap-3 pt-2'>
            <button type='button' (click)='cancel()' [class]='secondaryButtonClass'>Cancelar</button>
            <button type='submit' [class]='primaryButtonClass'>Salvar ingresso</button>
          </div>
        </form>
      }
    </section>
  `,
})
export class TicketCreateComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly ticketService = inject(TicketService);
  private readonly router = inject(Router);

  protected readonly createdTicket = signal<Ticket | null>(null);

  protected readonly formatPrice = formatPrice;
  protected readonly formatEventDate = formatEventDate;

  protected readonly labelClass = 'block text-sm font-medium text-slate-700';
  protected readonly errorClass = 'mt-1 text-xs font-medium text-red-600';
  protected readonly inputClass =
    'mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500';
  protected readonly primaryButtonClass =
    'inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2';
  protected readonly secondaryButtonClass =
    'inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50';

  protected readonly form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(120)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    eventDate: ['', [Validators.required, notInThePastValidator()]],
    location: ['', [Validators.required, Validators.maxLength(160)]],
    price: [0, [Validators.required, Validators.min(0)]],
    quantity: [1, [Validators.required, Validators.min(1), integerValidator]],
  });

  protected isInvalid(field: FieldName): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.dirty || control.touched);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const ticket = this.ticketService.create({
      title: value.title.trim(),
      description: value.description.trim(),
      eventDate: value.eventDate,
      location: value.location.trim(),
      price: Number(value.price),
      quantity: Number(value.quantity),
    });

    this.createdTicket.set(ticket);
    this.form.reset({
      title: '',
      description: '',
      eventDate: '',
      location: '',
      price: 0,
      quantity: 1,
    });
  }

  protected createAnother(): void {
    this.createdTicket.set(null);
  }

  protected cancel(): void {
    void this.router.navigate(['/tickets']);
  }
}
