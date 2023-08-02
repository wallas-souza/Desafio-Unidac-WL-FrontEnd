import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { colaboradorResolver } from './colaborador.resolver';

describe('colaboradorResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => colaboradorResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
