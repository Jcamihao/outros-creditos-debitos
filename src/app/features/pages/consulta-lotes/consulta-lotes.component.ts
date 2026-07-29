import { Component, computed, inject, signal } from '@angular/core';
import { Lote } from '../../../shared/models/lote.model';
import { LoteService } from '../../services/lote/lote.service';
import { FiltroLotesComponent } from '../../components/filtro-lotes/filtro-lotes.component';
import { TabelaLotesComponent } from '../../components/tabela-lotes/tabela-lotes.component';
import { MatButtonModule } from '@angular/material/button';
import { FiltroLoteBusca } from '../../../shared/models/filtro-lote-busca.model';
import { MatDialog } from '@angular/material/dialog';
import { LoteLancamentosModalComponent } from '../../components/lote-lancamentos-modal/lote-lancamentos-modal.component';
import { Lancamento } from '../../../shared/models/lancamento.model';
import { SituacaoLote } from '../../../shared/enum/situacao-lote.enum';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-consulta-lotes',
  imports: [FiltroLotesComponent, TabelaLotesComponent, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './consulta-lotes.component.html',
  styleUrl: './consulta-lotes.component.scss',
})
export class ConsultaLotesComponent {
  private loteService = inject(LoteService);
  private dialog = inject(MatDialog);
  lotesSelecionados = signal<Lote[]>([]);
  lotes = signal<Lote[]>([]);
  carregando = signal(false);
  erro = signal<string | null>(null);

  constructor() {}

  ngOnInit(): void {
    this.carregando.set(true);
    this.loteService
      .buscarLote({})
      .pipe(
        catchError((error) => {
          this.erro.set('Erro ao buscar lotes, tente novamente mais tarde.');
          this.carregando.set(false);
          return of([]);
        }),
      )
      .subscribe((resultado) => {
        this.lotes.set(resultado);
        this.carregando.set(false);
      });
  }

  podeAlterarExcluirVisualizar = computed(() => this.lotesSelecionados().length === 1);
  podeConfirmarEnviar = computed(() => this.lotesSelecionados().length >= 1);
  podeVisualizarJustificativa = computed(() => this.lotesSelecionados().length === 1);

  onPesquisar(filtro: FiltroLoteBusca): void {
    this.carregando.set(true);
    this.loteService
      .buscarLote(filtro)
      .pipe(
        catchError((error) => {
          this.erro.set('Erro ao buscar lotes, tente novamente mais tarde.');
          this.carregando.set(false);
          return of([]);
        }),
      )
      .subscribe((resultado) => {
        this.lotes.set(resultado);
        this.carregando.set(false);
      });
  }

  onIncluir(): void {
    const dialogRef = this.dialog.open(LoteLancamentosModalComponent, {
      width: '900px',
      maxWidth: '95vw',
    });

    dialogRef.afterClosed().subscribe((lancamentos: Lancamento[] | undefined) => {
      if (lancamentos && lancamentos.length > 0) {
        let valorLote = 0;
        lancamentos.forEach((l) => {
          valorLote += l.valor;
        });

        const novoLote: Lote = {
          idLote: 0,
          instituicaoResp: '4081 - SICOOB',
          instituicao: '0082 - SICOOB CENTRAL',
          dataEntrada: new Date(),
          valorLote,
          quantLancamentos: lancamentos.length,
          usuarioRegistro: 'usuario_logado',
          usuarioAprovacao: '',
          situacaoLote: SituacaoLote.ABERTO,
          dataHoraSituacaoLote: new Date(),
          lancamentos,
        };

        this.loteService.incluirLote(novoLote).subscribe(() => {
          this.loteService.buscarLote({}).subscribe((resultado) => this.lotes.set(resultado));
        });
      }
    });
  }

  onSelectionChange(lotes: Lote[]): void {
    this.lotesSelecionados.set(lotes);
  }
}
