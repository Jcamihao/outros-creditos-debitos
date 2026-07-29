import { Injectable } from '@angular/core';
import { FiltroLoteBusca } from '../../../shared/models/filtro-lote-busca.model';
import { delay, Observable, of, throwError } from 'rxjs';
import { Lote } from '../../../shared/models/lote.model';
import { mockLotes } from '../../data/mock-lotes';
import { SituacaoLote } from '../../../shared/enum/situacao-lote.enum';

@Injectable({
  providedIn: 'root',
})
export class LoteService {
  constructor() {}

  buscarLote(filtro: FiltroLoteBusca): Observable<Lote[]> {
    if (Math.random() < 0.15) {
      return throwError(() => new Error('Erro simulado ao buscar lotes')).pipe(delay(500));
    }
    try {
      const resultado: Lote[] = mockLotes.filter((lote) => {
        return (
          (!filtro.idLoteDe || lote.idLote >= filtro.idLoteDe) &&
          (!filtro.idLoteAte || lote.idLote <= filtro.idLoteAte) &&
          (!filtro.instituicao ||
            lote.instituicao.toLowerCase().includes(filtro.instituicao.toLowerCase())) &&
          (!filtro.instituicaoResp ||
            lote.instituicaoResp.toLowerCase().includes(filtro.instituicaoResp.toLowerCase())) &&
          (!filtro.situacaoLote || lote.situacaoLote === filtro.situacaoLote) &&
          (!filtro.valorLoteDe || lote.valorLote >= filtro.valorLoteDe) &&
          (!filtro.valorLoteAte || lote.valorLote <= filtro.valorLoteAte) &&
          (!filtro.dataEntradaDe || lote.dataEntrada >= filtro.dataEntradaDe) &&
          (!filtro.dataEntradaAte || lote.dataEntrada <= filtro.dataEntradaAte)
        );
      });

      return of(resultado).pipe(delay(500));
    } catch (error) {
      console.error('Erro ao buscar lotes:', error);
      throw new Error('Erro ao buscar lotes');
    }
  }

  incluirLote(lote: Lote): Observable<Lote> {
    try {
      const novoLote: Lote = {
        ...lote,
        idLote: Math.max(...mockLotes.map((l) => l.idLote)) + 1,
        dataHoraSituacaoLote: new Date(),
        quantLancamentos: lote.lancamentos.length,
        situacaoLote: lote.situacaoLote || SituacaoLote.ABERTO,
      };
      mockLotes.push(novoLote);
      return of(novoLote).pipe(delay(500));
    } catch (error) {
      console.error('Erro ao incluir lote:', error);
      throw new Error('Erro ao incluir lote');
    }
  }

  confirmarLote(idLote: number): Observable<Lote> {
    try {
      const lote = mockLotes.find((l) => l.idLote === idLote);
      if (!lote) {
        throw new Error('Erro ao confirmar lote');
      }
      lote.situacaoLote = SituacaoLote.CONFIRMADO;
      lote.dataHoraSituacaoLote = new Date();
      return of(lote).pipe(delay(500));
    } catch (error) {
      console.error('Erro ao confirmar lote:', error);
      throw new Error('Erro ao confirmar lote');
    }
  }

  enviarLote(idLote: number): Observable<Lote> {
    try {
      const lote = mockLotes.find((l) => l.idLote === idLote);
      if (!lote) {
        throw new Error('Erro ao enviar lote');
      }
      lote.situacaoLote = SituacaoLote.ENVIADO;
      lote.dataHoraSituacaoLote = new Date();
      return of(lote).pipe(delay(500));
    } catch (error) {
      console.error('Erro ao enviar lote:', error);
      throw new Error('Erro ao enviar lote');
    }
  }
}
