// import { Component, OnInit } from '@angular/core';
// import { EmployeeService } from '../employee.service';
// import { Employee } from '../Employee';
// import { TableModule } from 'primeng/table';
// import * as fileSaver from 'file-saver';
// import { CommonModule } from '@angular/common';
// @Component({
//   selector: 'app-tryings',
//   standalone: true,
//   imports: [TableModule,CommonModule],
//   templateUrl: './tryings.component.html',
//   styleUrl: './tryings.component.css'
// })
// export class TryingsComponent implements OnInit
// {
   
//     constructor(private employeeService: EmployeeService) { }

//     ngOnInit() {
       

       
//     }

//     isPositionDisabled(positionId: number, index: number): boolean {
//         const selectedPositions = this.employeeForm.value.employeeInPositions.map((pos: any) => pos.positionId);
//         return selectedPositions.includes(positionId) && selectedPositions.indexOf(positionId) !== index;
//       }
//       removePositionControl(index: number): void {
//         this.positionsFormArray.removeAt(index);
//       }
      
//   loadPositions(): void {
//     this.positionService.getPositions().subscribe(positions => {
//       this.positions = positions;
//       // this.addPositionControl();
//     });
//     addPositionControl(): void {
//         console.log("See", this.positionsFormArray);
        
//         this. employeeForm.get('employeeInPositions') .push(this.fb.group({
//           positionId: ['', Validators.required],
//           administrative: [false],
//           startPosition: [null, [Validators.required, this.entryDateValidator()]]
//         }));
    
//       }
//   }
  


// }     

