import { TestBed } from '@angular/core/testing';

import { ListadoService } from './services/listado.service';

describe('ListadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListadoService = TestBed.get(ListadoService);
    expect(service).toBeTruthy();
  });
});
