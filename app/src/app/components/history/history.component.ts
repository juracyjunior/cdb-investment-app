import { Component } from '@angular/core';
import { CDB } from '../../models/cdb.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  history: CDB[] = [];

  constructor() {
    this.loadHistory();
  }

  public setHistory(cdb: CDB) {
    this.history.splice(0, 0, cdb);

    localStorage.setItem('history', JSON.stringify(this.history));
  }

  public loadHistory() {
    var historyStorage = localStorage.getItem('history');

    if (historyStorage !== null && historyStorage !== '') {
      this.history = JSON.parse(historyStorage);
    }
  }

  public clearHistory() {
    this.history = [];
    localStorage.removeItem('history');
  }
}
