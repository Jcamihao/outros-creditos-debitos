import { SituacaoLote } from '../enum/situacao-lote.enum';

export interface FiltroLoteBusca {
  instituicaoResp?: string;
  instituicao?: string;
  situacaoLote?: SituacaoLote;
  idLoteDe?: number;
  idLoteAte?: number;
  valorLoteDe?: number;
  valorLoteAte?: number;
  dataEntradaDe?: Date;
  dataEntradaAte?: Date;
}
