import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimulatorComponent } from './components/simulator/simulator.component';

const routes: Routes = [
  {
      path: 'simulator',
      component: SimulatorComponent,
  },
  {
      path: '**',
      redirectTo: '/simulator'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
