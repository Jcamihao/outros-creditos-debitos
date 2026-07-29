import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { LoteService } from './lote.service';

describe('LoteService', () => {
  let service: LoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoteService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar os lotes do mock quando não simula erro', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);

    const resultado = await firstValueFrom(service.buscarLote({}));

    expect(resultado.length).toBeGreaterThan(0);
  });

  it('deve emitir erro quando o Math.random simula falha', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.05);

    await expect(firstValueFrom(service.buscarLote({}))).rejects.toThrow(
      'Erro simulado ao buscar lotes',
    );
  });
});
