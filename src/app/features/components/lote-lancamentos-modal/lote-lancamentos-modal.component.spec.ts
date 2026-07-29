import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteLancamentosModalComponent } from './lote-lancamentos-modal.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('LoteLancamentosModalComponent', () => {
  let component: LoteLancamentosModalComponent;
  let fixture: ComponentFixture<LoteLancamentosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteLancamentosModalComponent],
      providers: [{ provide: MatDialogRef, useValue: { close: jest.fn() } }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoteLancamentosModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
