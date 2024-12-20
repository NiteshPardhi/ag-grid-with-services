import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesFormComponent } from './employees-form/employees-form.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  {path: '', component: EmployeesComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'employees-form', component: EmployeesFormComponent},
  {path: 'employees-form/:id', component: EmployeesFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
