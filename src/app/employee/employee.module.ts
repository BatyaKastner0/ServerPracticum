import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeTableComponent } from '../employee-table/employee-table.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [EmployeeTableComponent,EmployeeTableComponent,EditEmployeeComponent],
  imports: [
    CommonModule,FormGroup,ReactiveFormsModule
  ]
})
export class EmployeeModule { }
