import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ContaCorrente } from '../../../shared/models/conta-corrente.model';
import { mockContas } from '../../data/mock-contas';

@Injectable({ providedIn: 'root' })
export class ContaCorrenteService {
  buscarPorCodigo(numeroConta: string): Observable<ContaCorrente | null> {
    try {
      const contas: ContaCorrente[] = mockContas.filter(
        (conta) => conta.numeroConta === numeroConta,
      );
      return of(contas[0] || null).pipe(delay(500));
    } catch (error) {
      console.error('Erro ao buscar conta corrente:', error);
      throw new Error('Erro ao buscar conta corrente');
    }
  }
}
