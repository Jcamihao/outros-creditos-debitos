import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Lote } from '../../../shared/models/lote.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-tabela-lotes',
  imports: [MatTableModule, MatCheckboxModule, MatPaginatorModule, DatePipe, CurrencyPipe],
  templateUrl: './tabela-lotes.component.html',
  styleUrl: './tabela-lotes.component.scss',
})
export class TabelaLotesComponent {
  @Input() lotes: Lote[] = [];
  @Output() selectionChange = new EventEmitter<Lote[]>();

  displayedColumns = [
    'select',
    'idLote',
    'dataEntrada',
    'valorLote',
    'quantLancamentos',
    'usuarioRegistro',
    'usuarioAprovacao',
    'situacaoLote',
    'dataHoraSituacaoLote',
  ];
  dataSource = new MatTableDataSource<Lote>([]);
  selection = new SelectionModel<Lote>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(): void {
    this.dataSource.data = this.lotes;
  }

  todosSelecionados(): boolean {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  toggleSelecao(lote: Lote): void {
    this.selection.toggle(lote);
    this.selectionChange.emit(this.selection.selected);
  }

  toggleTodos(): void {
    if (this.selection.selected.length === this.dataSource.data.length) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach((item) => this.selection.select(item));
    }
    this.selectionChange.emit(this.selection.selected);
  }
}
