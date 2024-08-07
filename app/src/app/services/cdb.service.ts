import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { CDB } from '../models/cdb.model';

@Injectable({
  providedIn: 'root'
})
export class CdbService {
  urlBase = environment.urlBase;

  constructor(
    private http: HttpClient
  ) { }

  public simulate(value: number, months: number) : Observable<CDB> {
    let url = `${this.urlBase}cdb/simulate?value=${value}&months=${months}`;

    return this.http.get<CDB>(url);
  }
}
