import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradoresComponent } from './colaboradores.component';

describe('CoursesComponent', () => {
  let component: ColaboradoresComponent;
  let fixture: ComponentFixture<ColaboradoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColaboradoresComponent]
    });
    fixture = TestBed.createComponent(ColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
