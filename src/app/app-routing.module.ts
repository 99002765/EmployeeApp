import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {
    path:'chart',
    component:ChartComponent,
  },
  {
    path:'',
    component:EmployeeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
