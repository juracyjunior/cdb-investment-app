import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CdbService } from './cdb.service';
import { environment } from '../../environments/environment';
import { CDB } from '../models/cdb.model';

describe('CdbService', () => {
  let service: CdbService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CdbService]
    });
    service = TestBed.inject(CdbService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the correct urlBase from environment', () => {
    expect(service.urlBase).toBe(environment.urlBase);
  });

  it('should call simulate with the correct URL and return CDB data', () => {
    const mockCdb: CDB = { 
      value: 100,
      months: 12,
      grossValue: 1200,
      netValue: 1100
    };
    const value = 1000;
    const months = 12;

    service.simulate(value, months).subscribe((data) => {
      expect(data).toEqual(mockCdb);
    });

    const req = httpMock.expectOne(`${environment.urlBase}/simulate?value=${value}&months=${months}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCdb);
  });

  it('should handle HTTP errors gracefully', () => {
    const value = 1000;
    const months = 12;
    const errorMessage = `Http failure response for ${environment.urlBase}/simulate?value=${value}&months=${months}: 500 Server Error`;

    service.simulate(value, months).subscribe({
      next: () => fail('expected an error, not data'),
      error: (error) => {
        expect(error.message).toContain(errorMessage);
      }
    });

    const req = httpMock.expectOne(`${environment.urlBase}/simulate?value=${value}&months=${months}`);
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});
