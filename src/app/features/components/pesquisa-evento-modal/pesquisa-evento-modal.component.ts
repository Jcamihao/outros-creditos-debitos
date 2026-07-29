import { Component, inject, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { EventoService } from '../../services/evento/evento.service';
import { Evento } from '../../../shared/models/evento.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-pesquisa-evento-modal',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    DatePipe,
  ],
  templateUrl: './pesquisa-evento-modal.component.html',
  styleUrl: './pesquisa-evento-modal.component.scss',
})
export class PesquisaEventoModalComponent {
  dialogRef = inject(MatDialogRef<PesquisaEventoModalComponent>);
  campoSelecionado = signal<'idEvento' | 'codEvento' | 'descricao'>('idEvento');
  private eventoService = inject(EventoService);

  eventos = signal<Evento[]>([]);
  eventoSelecionado = signal<Evento | null>(null);
  displayedColumnsEventos = ['idEvento', 'codEvento', 'descricao', 'dtInicio', 'dtFim'];

  listar(valor: string): void {
    this.eventoService.buscar(this.campoSelecionado(), valor).subscribe((resultado) => {
      this.eventos.set(resultado);
    });
  }

  selecionarEvento(evento: Evento): void {
    this.eventoSelecionado.set(this.eventoSelecionado() === evento ? null : evento);
  }

  confirmar(): void {
    this.dialogRef.close(this.eventoSelecionado());
  }
}
