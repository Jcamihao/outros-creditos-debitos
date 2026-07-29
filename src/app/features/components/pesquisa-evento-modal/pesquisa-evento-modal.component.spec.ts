import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaEventoModalComponent } from './pesquisa-evento-modal.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('PesquisaEventoModalComponent', () => {
  let component: PesquisaEventoModalComponent;
  let fixture: ComponentFixture<PesquisaEventoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PesquisaEventoModalComponent],
      providers: [{ provide: MatDialogRef, useValue: { close: jest.fn() } }],
    }).compileComponents();

    fixture = TestBed.createComponent(PesquisaEventoModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
