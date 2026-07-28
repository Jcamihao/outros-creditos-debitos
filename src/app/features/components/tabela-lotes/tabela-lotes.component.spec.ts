import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaLotesComponent } from './tabela-lotes.component';

describe('TabelaLotesComponent', () => {
  let component: TabelaLotesComponent;
  let fixture: ComponentFixture<TabelaLotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaLotesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabelaLotesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
