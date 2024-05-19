import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import { EmpFilter } from '../empfilter';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { log } from 'node:console';
import { MatToolbarModule } from '@angular/material/toolbar';
import * as XLSX from 'xlsx';
import { FormsModule } from '@angular/forms';
import { EditEmployeeComponent } from '../edit-employee copy/edit-employee.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [ MatTableModule,
  CommonModule,
  MatInputModule,
  MatSelectModule,TableModule,FormsModule,
  MatCardModule,MatIconModule,MatToolbarModule,MatMenuModule],
 
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})

export class EmployeeTableComponent implements OnInit {
  employees: Employee[];
  employeesLocalList: Employee[];
  emp:Employee
  dataSource: any;
  dataSourceFilters: any;
  filteredItems: any;
  // constructor(private employeeService: EmployeeService,public dialogRef: MatDialogRef<AddEmployeeComponent>) { }
//  @Inject(MAT_DIALOG_DATA) public data: any, 
constructor(private employeeService: EmployeeService,private dialog: MatDialog,private router: Router) {}

openDialog(): void {
  const dialogRef = this.dialog.open(AddEmployeeComponent, {
    // width: '100%',
    data: {} // you can pass data to the dialog if needed
  });}
    // close(){
    //   this.dialogRef.close();
    // }
  displayedColumns: string[] = ['tz', 'firstName', 'lastName', 'startDate'];
  searchText: string = '';
  isMale!: boolean;
  roles: any;
  genders: string[]=['All','Male','Female'];
  jobtitles: string[]=['All','Support Analyst','Project Manager','Senior officer','Software Engineer'];
  departments: string[]=['All','Support','Human Resources','Marketing','Engineering'];
  empFilters: EmpFilter[]=[];
  
  defaultValue = "All";
  filterValue: string = '';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  filterDictionary= new Map<string,string>();
  async getEmployees() {
    (await this.employeeService.getEmployees())
      .subscribe((data: Employee[]) => {
        console.log(data);
  data=data.filter(employee => employee.isActive===true);
        console.log(data.forEach(element => { console.log(element.isActive)}));
 
        this.dataSource = new MatTableDataSource(data);
        this.dataSourceFilters = new MatTableDataSource(data);
    
        this.employeesLocalList=data
      }, error => {
        console.error('Error fetching employee data:', error);
      });
  }
  ngOnInit(): void {
    this.getEmployees()
  }
  setupAndFilterTable() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onEdit(row: Employee) {
    // Handle edit action for the specified employee row
    console.log('Edit employee:', row);
         // Handle edit action for the specified employee row

         // this.dialogRef
         // openDialog(): void {
           const dialogRef = this.dialog.open(EditEmployeeComponent, {
             width: '100000000px',
             height: '10000000px',
   
             data: {row} // you can pass data to the dialog if needed
             
           }); 
           console.log('row:', row);
           
           dialogRef.afterClosed().subscribe(result => {
       if (result) {
         console.log('Dialog result:', result);
         // Handle the result if needed

        } })}
  onDelete(row: Employee) {  
    this.employeeService.deleteEmployee(row).subscribe(
      () => {
        console.log('Employee deleted successfully');
        // Add any further actions after successful deletion
      },
      (error) => {
        console.error('Error deleting employee:', error);
        // Handle the error, display a message, or perform additional actions
      }

    );
  
let indexToRemove = this.employeesLocalList.findIndex(obj => obj.id === row.id);
console.log('indexToRemove:', indexToRemove);
console.log('Row id:', row.id);
this.employeesLocalList.splice(indexToRemove,1);
console.log('employeesLocalList',this.employeesLocalList);
this.dataSource = new MatTableDataSource(this.employeesLocalList);
this.dataSourceFilters = new MatTableDataSource(this.employeesLocalList);
  }
  AddEmployee() {
      // Handle edit action for the specified employee row
      console.log('Add employee:');
      // this.dialogRef
      // openDialog(): void {
        const dialogRef = this.dialog.open(AddEmployeeComponent, {
          width: '100000000px',
          height: '10000000px',

          data: {} // you can pass data to the dialog if needed
          
        }); 
        dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Dialog result:', result);
      // Handle the result if needed
} })}
  

openFormDialog(): void {
  const dialogRef = this.dialog.open(AddEmployeeComponent, {
  width: '150px',
  height: '550px',
  
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Dialog result:', result);
      // this.reloadEmployees()
}

 })
}

exportToExcel() {
  const headers = ["firstName", "lastName", "tz", "startDate"];
const mapData = this.dataSource.data.map(obj => Object.fromEntries(headers.map(h => ([h, obj[h]]))));
// const worksheet = XLSX.utils.json_to_sheet(aoo, {
//   header: headers
// });
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(mapData);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'data.xlsx');
}
filterEmployeesList(): void {
  const searchTextLower = this.searchText.toLowerCase();
console.log('this.employees',this.employeesLocalList);

  this.dataSource = this.employeesLocalList.filter((employee) => {
    const employeeStartDate = new Date(employee.startDate).toLocaleDateString();

    return (
      employee.firstName.toLowerCase().includes(searchTextLower) ||
      employee.lastName.toLowerCase().includes(searchTextLower) ||
      employee.tz.toLowerCase().includes(searchTextLower) ||
      employeeStartDate.includes(this.searchText)
    )

});console.log('this.employees after',this.employeesLocalList);
}
}
