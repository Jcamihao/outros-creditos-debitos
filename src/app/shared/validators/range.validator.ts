import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function rangeValidator(campoDe: string, campoAte: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const controlDe = group.get(campoDe);
    const controlAte = group.get(campoAte);

    if (controlDe && controlAte) {
      const valorDe = controlDe.value;
      const valorAte = controlAte.value;

      if (valorDe && valorAte && Number(valorDe) > Number(valorAte)) {
        controlAte.setErrors({ faixaInvalida: true });
      } else {
        controlAte.setErrors(null);
      }
    }
    return null;
  };
}
