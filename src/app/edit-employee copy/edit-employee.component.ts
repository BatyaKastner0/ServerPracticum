import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators,ValidationErrors, ValidatorFn, FormControl, FormsModule} from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { RoleService } from '../role.service';
import { Role } from '../Role';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Employee } from '../Employee';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatExpansionModule, MatCheckboxModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent implements OnInit{
  roles:any
  employeeForm: FormGroup;
  previousRole: any;
  newRoleForm: FormGroup;
  roleNames: Role[] = []
  constructor(private formBuilder: FormBuilder,public employeeService:EmployeeService,public roleService:RoleService,public dialogRef: MatDialogRef<EditEmployeeComponent>,@Inject(MAT_DIALOG_DATA) public data: { row: Employee }) {
  const roles = data.row.roles.map(role => this.formBuilder.group({
    roleId: [role.roleId, Validators.required],
    startDate: [new Date(role.startDate).toISOString().split('T')[0], Validators.required],
    isManagerial: [role.isManagerial, Validators.required],
  
    
  }));    
  console.log('roles',roles);
      this.employeeForm = this.formBuilder.group({
        tz: [data.row.tz,[Validators.required, Validators.pattern(/^\d{9}$/)]],
        firstName: [data.row.firstName, Validators.required],
        lastName: [data.row.lastName, Validators.required],
        startDate:[new Date(data.row.startDate).toISOString().split('T')[0], Validators.required],
      dateBorn: [new Date(data.row.dateBorn).toISOString().split('T')[0], Validators.required],
      isMale: [data.row.isMale.toString(),Validators.required],
      roles: this.formBuilder.array(roles) 
  });
 let rolesData = data.row.roles.map(role => {
  return {
    name:role.roleId ,
    managerial:role.isManagerial,
    startDate: new Date(data.row.dateBorn).toISOString().split('T')[0]
  };
  
  
});
console.log('radio',this.employeeForm.get('isMale').value);

console.log('start',new Date(data.row.startDate).toISOString().split('T')[0]);
// this.addRole()
    }

  
  dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value && t.value && f.value > t.value) {
        return {
          dates: "Date from should be less than or equal to date to"
        };
      }
      return {};
    }
  }
    addRole() {
      console.log('this.roleNames',this.roleNames);
      
          const roles = this.employeeForm.get('roles') as FormArray;
        roles.push(this.formBuilder.group({
          roleId:'',
          startDate: '',
    isManagerial: '',
    
        }));
        console.log('roles',roles.value);
        console.log('obg',this.employeeForm.value);
        
    }
    updateRolesOptions(event: any):void{
      
      const rolesArray = this.employeeForm.get('roles') as FormArray;
      const filteredArray: Role[] = [];  
        const roleNames = rolesArray.controls.map(control => control.get('roleId').value);
    
      this.roleNames.forEach(element => {
       
          const role: Role = {     
            name: element.name,       
            id: element.id,
            disabled: roleNames.includes(element.id)
          };
          filteredArray.push(role);
        }
      );
      this.roleNames=filteredArray
      console.log('filteredArray',filteredArray);
    }
      removeRole(index: number): void {
        const rolesFormArray = this.employeeForm.get('roles') as FormArray;
        rolesFormArray.removeAt(index);
        this.updateRolesOptions(null);
      }
         createRoleFormGroup(): FormGroup {
          return this.formBuilder.group({
            roleName: ['', Validators.required],
            management: ['', Validators.required],
            entryDate: ['', Validators.required],
          });
    
          
        }
   
  // entryDateValidator(control: FormControl) {
  //   const startDate = new Date(this.employeeForm.get('startDate').value);
  //   const entryDate = new Date(control.value);
  //   return entryDate >= startDate ? null : { entryDateInvalid: true };
  // }
  // entryDateValidator(control: AbstractControl): ValidationErrors | null {
  //   const startDate = new Date(this.employeeForm.get('startDate').value);
  //   const entryDate = new Date(control.value);
  
  //   return entryDate >= startDate ? null : { ['entryDateInvalid']: true };
  // }
  // entryDateValidator(control: AbstractControl): ValidationErrors | null {
  //   const startDate = new Date(this.employeeForm.get('startDate').value);
  
  //   if (!startDate || !control.value) {
  //     return null;
  //   }
  
  //   const entryDate = new Date(control.value);
  //   return entryDate >= startDate ? null : { 'entryDateInvalid': true };
  // }
ngOnInit() {
  this.roleService.getRoles().subscribe((data: Role[]) => {
    this.roleNames = data;
// console.log('roleNames', this.roleNames);

  });
}

  isManger = [
    { value:true, label: 'true' },
    { value: false, label: 'false' }

  ];
  genderOptions = [
    { value: true, label: 'זכר' },
    { value: false, label: 'נקבה' }
  ]

employeeRoles: any[] = [];
// async saveChanges() {
//   console.log('employeeForm', this.employeeForm.value);
//   if (this.employeeForm.valid) {
//      console.log('Employee data to send:', this.employeeForm.value);
//     this.employeeService.createEmployee(this.employeeForm.value).subscribe(
//       (response) => {
//         console.log('Employee details saved successfully:', response);
//         this.dialogRef.close()
//         this.employeeService.getEmployees()
//         // Handle successful save
//       },
//       (error) => {
//         console.error('Error saving employee details:', error);
//         // Handle error saving employee details
//       }
//     );
//   }else
//   console.log('not valid');
//  }; 
// }
async saveChanges() {
this.employeeForm.get('isMale').value === 'true';
 
  const employeeData = { ...this.employeeForm.value }; 
  console.log('employeeForm', employeeData);
  if (this.employeeForm.valid) {
    console.log('Employee data to send:', employeeData);
    (await this.employeeService.updataEmployee(employeeData.tz, employeeData)).subscribe(
      (response) => {
        console.log('Employee details saved successfully:', response);
        this.dialogRef.close();
        this.employeeService.getEmployees();
      },
      (error) => {
        console.error('Error saving employee details:', error);
      }
    );
  } else {
    console.log('not valid');
  }
}
// next: (res) => {
//   this.closeDialog(),
//     Swal.fire({
//       position: 'top-end',
//       icon: 'success',
//       title: 'the worker added succesfuly',
//       showConfirmButton: false,
//       timer: 1500,
//     }),
//     console.log('postSucsses');
// },
// error: (err) => {
//   console.log('eror409');
//   Swal.fire({
//     position: 'top-end',
//     icon: 'error',
//     title: 'this worker already exist',
//     showConfirmButton: false,
//     timer: 1500,
//   });
// },
// });
// } else {
// // Mark form fields as touched to display validation errors
// this.addWorkerForm.markAllAsTouched();
// } // debugger;
// }
// closeDialog(): void {
// this.dialogRef.close();
 }

