import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Evento } from '../../../shared/models/evento.model';
import { mockEventos } from '../../data/mock-eventos';

@Injectable({ providedIn: 'root' })
export class EventoService {
  buscar(campo: 'idEvento' | 'codEvento' | 'descricao', valor: string): Observable<Evento[]> {
    const resultado = valor
      ? mockEventos.filter((e) => e[campo].toLowerCase().includes(valor.toLowerCase()))
      : mockEventos;
    return of(resultado).pipe(delay(500));
  }
}
