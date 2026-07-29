import { FormBuilder } from '@angular/forms';
import { rangeValidator } from './range.validator';

describe('rangeValidator', () => {
  const fb = new FormBuilder();

  it('deve marcar erro quando De é maior que Até', () => {
    const form = fb.group(
      { valorDe: '10', valorAte: '5' },
      { validators: rangeValidator('valorDe', 'valorAte') },
    );

    expect(form.get('valorAte')?.hasError('faixaInvalida')).toBe(true);
  });

  it('não deve marcar erro quando De é menor ou igual a Até', () => {
    const form = fb.group(
      { valorDe: '5', valorAte: '10' },
      { validators: rangeValidator('valorDe', 'valorAte') },
    );

    expect(form.get('valorAte')?.hasError('faixaInvalida')).toBe(false);
  });

  it('não deve comparar como texto — regressão do bug "9" > "10"', () => {
    const form = fb.group(
      { valorDe: '9', valorAte: '10' },
      { validators: rangeValidator('valorDe', 'valorAte') },
    );

    expect(form.get('valorAte')?.hasError('faixaInvalida')).toBe(false);
  });
});
