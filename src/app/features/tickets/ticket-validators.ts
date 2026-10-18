import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { parseEventDate } from '../../core/models/ticket.model';

/** Bloqueia datas anteriores a hoje, comparando apenas o dia no fuso local. */
export function notInThePastValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: unknown = control.value;

    if (typeof value !== 'string' || value.trim() === '') {
      return null;
    }

    const eventDate = parseEventDate(value);
    if (!eventDate) {
      return { invalidDate: true };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return eventDate.getTime() < today.getTime() ? { pastDate: true } : null;
  };
}

/** Garante que a quantidade seja um numero inteiro. */
export function integerValidator(control: AbstractControl): ValidationErrors | null {
  const value: unknown = control.value;

  if (value === null || value === undefined || value === '') {
    return null;
  }

  return Number.isInteger(Number(value)) ? null : { integer: true };
}
