import { Evento } from '../../shared/models/evento.model';

export const mockEventos: Evento[] = [
  {
    idEvento: '102',
    codEvento: '300',
    descricao: 'Centralizacao Título CSC Credito',
    dtInicio: new Date('2019-12-31'),
    dtFim: null,
  },
  {
    idEvento: '105',
    codEvento: '310',
    descricao: 'Estorno de Lançamento',
    dtInicio: new Date('2020-01-15'),
    dtFim: null,
  },
  {
    idEvento: '110',
    codEvento: '320',
    descricao: 'Transferência entre Contas',
    dtInicio: new Date('2021-06-01'),
    dtFim: null,
  },
];
