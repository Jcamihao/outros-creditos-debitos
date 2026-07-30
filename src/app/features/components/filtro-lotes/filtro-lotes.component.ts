import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { rangeValidator } from '../../../shared/validators/range.validator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { FiltroLoteBusca } from '../../../shared/models/filtro-lote-busca.model';
import { debounceTime, Subject } from 'rxjs';
import { SituacaoLote } from '../../../shared/enum/situacao-lote.enum';

@Component({
  selector: 'app-filtro-lotes',
  imports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './filtro-lotes.component.html',
  styleUrl: './filtro-lotes.component.scss',
})
export class FiltroLotesComponent {
  @Output() pesquisar = new EventEmitter<FiltroLoteBusca>();

  situacoesLote = Object.values(SituacaoLote);
  private fb = inject(FormBuilder);
  private pesquisarClick$ = new Subject<void>();

  constructor() {
    this.pesquisarClick$.pipe(debounceTime(300)).subscribe(() => {
      this.pesquisar.emit(this.filtroForm.value as FiltroLoteBusca);
    });
  }

  filtroForm = this.fb.nonNullable.group(
    {
      instituicao: [''],
      instituicaoResp: [''],
      situacaoLote: [''],
      valorLoteDe: [''],
      valorLoteAte: [''],
      dataEntradaDe: [''],
      dataEntradaAte: [''],
      idLoteDe: [''],
      idLoteAte: [''],
    },
    {
      validators: [
        rangeValidator('valorLoteDe', 'valorLoteAte'),
        rangeValidator('dataEntradaDe', 'dataEntradaAte'),
        rangeValidator('idLoteDe', 'idLoteAte'),
      ],
    },
  );

  onSubmit(): void {
    this.pesquisarClick$.next();
  }
}
