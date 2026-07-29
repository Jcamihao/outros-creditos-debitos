import { SituacaoLote } from '../enum/situacao-lote.enum';
import { Lancamento } from './lancamento.model';

export interface Lote {
  idLote: number;
  instituicaoResp: string;
  instituicao: string;
  dataEntrada: Date;
  valorLote: number;
  quantLancamentos: number;
  usuarioRegistro: string;
  usuarioAprovacao: string;
  situacaoLote: SituacaoLote;
  dataHoraSituacaoLote: Date;
  lancamentos: Lancamento[];
}
