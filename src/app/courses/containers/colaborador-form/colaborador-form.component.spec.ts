import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradorFormComponent } from './colaborador-form.component';

describe('ColaboradorFormComponent', () => {
  let component: ColaboradorFormComponent;
  let fixture: ComponentFixture<ColaboradorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColaboradorFormComponent]
    });
    fixture = TestBed.createComponent(ColaboradorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
