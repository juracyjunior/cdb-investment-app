import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimulatorComponent } from './simulator.component';
import { CdbService } from '../../services/cdb.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CDB } from '../../models/cdb.model';

describe('SimulatorComponent', () => {
  let component: SimulatorComponent;
  let fixture: ComponentFixture<SimulatorComponent>;
  let cdbServiceMock: any;

  beforeEach(async () => {
    cdbServiceMock = {
      simulate: jasmine.createSpy('simulate').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      declarations: [SimulatorComponent],
      providers: [{ provide: CdbService, useValue: cdbServiceMock }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.value).toBe(0);
    expect(component.months).toBe(0);
    expect(component.calculating).toBeFalse();
    expect(component.calculateErroMessage).toBe('');
    expect(component.cdb).toBeUndefined();
    expect(component.feedback.value.valid).toBeFalse();
    expect(component.feedback.value.message).toBe('');
    expect(component.feedback.months.valid).toBeFalse();
    expect(component.feedback.months.message).toBe('');
  });

  it('should validate inputs correctly', () => {
    component.value = 0;
    component.months = 1;

    expect(component.validate()).toBeFalse();
    expect(component.feedback.value.valid).toBeFalse();
    expect(component.feedback.value.message).toBe('Valor deve ser maior que 0 (zero).');
    expect(component.feedback.months.valid).toBeFalse();
    expect(component.feedback.months.message).toBe('Meses deve ser maior ou igual a 2 (dois).');
  });

  it('should call simulate method on service with correct parameters', () => {
    component.value = 100;
    component.months = 12;

    component.calculate();

    expect(cdbServiceMock.simulate).toHaveBeenCalledWith(100, 12);
  });

  it('should handle success response from service', () => {
    const mockCdb: CDB = { 
      value: 100,
      months: 12,
      grossValue: 1200,
      netValue: 1100
    };
    cdbServiceMock.simulate.and.returnValue(of(mockCdb));

    component.value = 100;
    component.months = 12;
    component.calculate();

    expect(component.calculating).toBeFalse();
    expect(component.cdb).toEqual(mockCdb);
    expect(component.calculateErroMessage).toBe('');
  });

  it('should handle error response from service', () => {
    cdbServiceMock.simulate.and.returnValue(throwError(() => new Error('Erro ao simular cálculo.')));

    component.value = 100;
    component.months = 12;
    component.calculate();

    expect(component.calculating).toBeFalse();
    expect(component.cdb).toBeUndefined();
    expect(component.calculateErroMessage).toBe('Erro ao simular cálculo.');
  });
});
