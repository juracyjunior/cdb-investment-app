import { Component, ViewChild } from '@angular/core';
import { CdbService } from '../../services/cdb.service';
import { CDB } from '../../models/cdb.model';
import { HistoryComponent } from '../history/history.component';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrl: './simulator.component.scss'
})
export class SimulatorComponent {
  @ViewChild('history') historyComponent!: HistoryComponent;
  value: number = 0;
  months: number = 0;
  calculating = false;
  calculateErroMessage = '';
  cdb?: CDB;
  feedback = {
    value: {
      valid: false,
      message: ''
    },
    months: {
      valid: false,
      message: ''
    }
  };

  constructor(private service: CdbService) { }

  calculate() {
    this.calculateErroMessage = '';
    this.cdb = undefined;

    if (!this.validate()) return;

    this.calculating = true;

    this.service.simulate(this.value, this.months).subscribe({
      next: (value) => {
        this.cdb = value;

        this.historyComponent.setHistory(value);
        
        this.calculating = false;
      },
      error: (error) => {
        console.log(error);
        
        this.calculateErroMessage = 'Erro ao simular cálculo.';

        this.calculating = false;
      }
    })
  }

  validate() {
    let result = true;

    this.clearFeedback();

    if (this.value <= 0) {
      this.feedback.value.valid = false;
      this.feedback.value.message = 'Valor deve ser maior que 0 (zero).';
      result = false;
    }

    if (this.months <= 1) {
      this.feedback.months.valid = false;
      this.feedback.months.message = 'Meses deve ser maior ou igual a 2 (dois).';

      result = false;
    }

    return result;
  }

  private clearFeedback() {
    this.feedback.value.valid = true;
    this.feedback.value.message = '';

    this.feedback.months.valid = true;
    this.feedback.months.message = '';
  }
}
