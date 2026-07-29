import { DocumentoCSC } from './documento-csc.model';

export interface Lancamento {
  idLancamento: number;
  contaCorrente: string;
  nomeTitularConta: string;
  valor: number;
  historico: string;
  estorno: boolean;
  documento: string;
  descricao: string;
  situacao: string;
  documentoCsc: DocumentoCSC;
}
