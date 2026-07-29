import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ContaCorrenteService } from '../../services/conta-corrente/conta-corrente.service';
import { MatIconModule } from '@angular/material/icon';
import { Lancamento } from '../../../shared/models/lancamento.model';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Anexo } from '../../../shared/models/anexo.model';
import { MatDialog } from '@angular/material/dialog';
import { PesquisaEventoModalComponent } from '../pesquisa-evento-modal/pesquisa-evento-modal.component';
import { Evento } from '../../../shared/models/evento.model';

@Component({
  selector: 'app-lote-lancamentos-modal',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './lote-lancamentos-modal.component.html',
  styleUrl: './lote-lancamentos-modal.component.scss',
})
export class LoteLancamentosModalComponent {
  displayedColumnsLancamentos = [
    'idLancamento',
    'contaCorrente',
    'historico',
    'valor',
    'pa',
    'situacao',
  ];
  private dialog = inject(MatDialog);
  eventoDescricaoEncontrada = signal<string | null>(null);

  dialogRef = inject(MatDialogRef<LoteLancamentosModalComponent>);
  lancamentoEmEdicao = signal<Lancamento | null>(null);
  modoVisualizacao = signal(false);
  nomeTitularEncontrado = signal<string | null>(null);
  lancamentos = signal<Lancamento[]>([]);
  lancamentoSelecionado = signal<Lancamento | null>(null);
  dataEntradaLote = new Date();
  quantLancamentos = computed(() => this.lancamentos().length);
  eventoABaixarPorLote = signal(false);
  anexos = signal<Anexo[]>([]);
  anexoSelecionado = signal<Anexo | null>(null);
  displayedColumnsAnexos = ['nomeArquivo', 'descricao', 'dataInclusao', 'idUsuario'];

  private fb = inject(FormBuilder);
  private contaCorrenteService = inject(ContaCorrenteService);

  constructor() {}

  lancamentoForm = this.fb.group({
    contaCorrente: this.fb.nonNullable.group({
      contaCorrente: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0.01)]],
      historico: ['', Validators.required],
      estorno: [false],
      documento: ['', Validators.required],
      descricao: [''],
      situacao: [{ value: 'Pendente', disabled: true }],
    }),
    documentoCsc: this.fb.nonNullable.group({
      pa: ['', Validators.required],
      idEvento: [''],
      complHistorico: [''],
      situacao: [{ value: 'Aguardando Processamento CCO', disabled: true }],
      idDocCsc: [{ value: '', disabled: true }],
    }),
  });

  buscarEvento(): void {
    const dialogRef = this.dialog.open(PesquisaEventoModalComponent);
    dialogRef.afterClosed().subscribe((evento: Evento | undefined) => {
      if (evento) {
        this.lancamentoForm.get('documentoCsc.idEvento')?.setValue(evento.idEvento);
        this.eventoDescricaoEncontrada.set(evento.descricao);
      }
    });
  }

  selecionarLancamento(lancamento: Lancamento): void {
    this.lancamentoSelecionado.set(this.lancamentoSelecionado() === lancamento ? null : lancamento);
  }

  visualizarLancamento(): void {
    const selecionado = this.lancamentoSelecionado();
    if (!selecionado) return;
    this.modoVisualizacao.set(true);
    this.lancamentoForm.patchValue({
      contaCorrente: {
        contaCorrente: selecionado.contaCorrente,
        valor: String(selecionado.valor),
        historico: selecionado.historico,
        estorno: selecionado.estorno,
        documento: selecionado.documento,
        descricao: selecionado.descricao,
      },
      documentoCsc: {
        pa: selecionado.documentoCsc.pa,
        idEvento: selecionado.documentoCsc.idEvento,
        complHistorico: selecionado.documentoCsc.complHistorico,
      },
    });
  }

  alterarLancamento(): void {
    const selecionado = this.lancamentoSelecionado();
    if (!selecionado) return;
    this.modoVisualizacao.set(false);
    this.lancamentoEmEdicao.set(selecionado);
    this.lancamentoForm.patchValue({
      contaCorrente: {
        contaCorrente: selecionado.contaCorrente,
        valor: String(selecionado.valor),
        historico: selecionado.historico,
        estorno: selecionado.estorno,
        documento: selecionado.documento,
        descricao: selecionado.descricao,
      },
      documentoCsc: {
        pa: selecionado.documentoCsc.pa,
        idEvento: selecionado.documentoCsc.idEvento,
        complHistorico: selecionado.documentoCsc.complHistorico,
      },
    });
  }

  onIncluirLancamento(): void {
    const valorForm = this.lancamentoForm.getRawValue();
    const emEdicao = this.lancamentoEmEdicao();

    if (emEdicao) {
      const lancamentoAtualizado: Lancamento = {
        ...emEdicao,
        ...valorForm.contaCorrente,
        valor: Number(valorForm.contaCorrente.valor),
        documentoCsc: valorForm.documentoCsc,
      };
      this.lancamentos.update((atual) =>
        atual.map((l) => (l === emEdicao ? lancamentoAtualizado : l)),
      );
      this.lancamentoEmEdicao.set(null);
    } else {
      const novoLancamento: Lancamento = {
        idLancamento: this.lancamentos().length + 1,
        ...valorForm.contaCorrente,
        valor: Number(valorForm.contaCorrente.valor),
        nomeTitularConta: this.nomeTitularEncontrado() ?? '',
        documentoCsc: valorForm.documentoCsc,
      };
      this.lancamentos.update((atual) => [...atual, novoLancamento]);
    }

    this.modoVisualizacao.set(false);
    this.lancamentoForm.reset();
    this.lancamentoSelecionado.set(null);
  }

  excluirLancamento(): void {
    const selecionado = this.lancamentoSelecionado();
    if (!selecionado) return;
    this.lancamentos.update((atual) => atual.filter((l) => l !== selecionado));
    this.lancamentoSelecionado.set(null);
  }

  duplicarLancamento(): void {
    const selecionado = this.lancamentoSelecionado();
    if (!selecionado) return;
    this.modoVisualizacao.set(false);
    this.lancamentoForm.patchValue({
      contaCorrente: {
        contaCorrente: selecionado.contaCorrente,
        valor: String(selecionado.valor),
        historico: selecionado.historico,
        estorno: selecionado.estorno,
        documento: selecionado.documento,
        descricao: selecionado.descricao,
      },
      documentoCsc: {
        pa: selecionado.documentoCsc.pa,
        idEvento: selecionado.documentoCsc.idEvento,
        complHistorico: selecionado.documentoCsc.complHistorico,
      },
    });
  }

  buscarConta() {
    const contaCorrente = this.lancamentoForm.get('contaCorrente.contaCorrente')?.value ?? '';
    this.contaCorrenteService.buscarPorCodigo(contaCorrente).subscribe((conta) => {
      this.nomeTitularEncontrado.set(conta?.nomeTitular ?? null);
    });
  }

  selecionarAnexo(anexo: Anexo): void {
    this.anexoSelecionado.set(this.anexoSelecionado() === anexo ? null : anexo);
  }

  incluirAnexo(input: HTMLInputElement): void {
    const arquivo = input.files?.[0];
    if (!arquivo) return;
    const novoAnexo: Anexo = {
      nomeArquivo: arquivo.name,
      descricao: arquivo.name,
      dataInclusao: new Date(),
      idUsuario: 'usuario_logado',
    };
    this.anexos.update((atual) => [...atual, novoAnexo]);
    input.value = '';
  }

  excluirAnexo(): void {
    const selecionado = this.anexoSelecionado();
    if (!selecionado) return;
    this.anexos.update((atual) => atual.filter((a) => a !== selecionado));
    this.anexoSelecionado.set(null);
  }
}
