import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators,ValidationErrors, ValidatorFn, FormControl, FormsModule, AbstractControl} from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { RoleService } from '../role.service';
import { Role } from '../Role';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { EmployeeRole } from '../EmployeeRole';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,  FormsModule,MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,MatDatepickerModule,MatNativeDateModule,MatRadioModule, MatDatepickerModule,MatMomentDateModule
  , MatSelectModule,MatExpansionModule,
  CommonModule,MatDatepickerModule,
  ReactiveFormsModule,
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule,
  MatExpansionModule
,MatCardModule ,
 MatDatepickerModule,
  MatNativeDateModule
],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit{
  roles:EmployeeRole
  employeeForm: FormGroup;
  previousRole: any;
  newRoleForm: FormGroup;
  roleNames: Role[] = []
  constructor(private formBuilder: FormBuilder,public employeeService:EmployeeService,public roleService:RoleService,public dialogRef: MatDialogRef<AddEmployeeComponent>) {
      this.employeeForm = this.formBuilder.group({
        //
        tz: ['',[Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        startDate:['', Validators.required],
      dateBorn: [null,[Validators.required, this.isEighteenYearsOld.bind(this)]],
      isMale: ['',Validators.required],
        roles: this.formBuilder.array([]) ,
  });
   this.addRole()
}

addRole() {
  console.log('this.roleNames',this.roleNames);
  
      const roles = this.employeeForm.get('roles') as FormArray;
    roles.push(this.formBuilder.group({
      roleId: ['', Validators.required],
      startDate: ['', [Validators.required, this.entryDateValidator.bind(this)]],
      isManagerial: ['', Validators.required],

    }));
    console.log('roles',roles.value);
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
    if (rolesFormArray.length > 1) {
    rolesFormArray.removeAt(index);
    this.updateRolesOptions(null);

    }
 
  }
  canRemoveRole(): boolean {
    const rolesFormArray = this.employeeForm.get('roles') as FormArray;
    console.log(rolesFormArray.value.length);
    
    if (rolesFormArray.value.length === 0)
      return true;
    return rolesFormArray.length > 1;
  }

  isEighteenYearsOld(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    const eighteenYearsAgo = new Date(currentDate.setFullYear(currentDate.getFullYear() - 18));
  
    if (selectedDate > eighteenYearsAgo) {
      return { 'underEighteen': true };
    }
  
    return null;
  }

  entryDateValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = new Date(this.employeeForm.get('startDate').value);
  
    if (!startDate || !control.value) {
      return null;
    }
  
    const entryDate = new Date(control.value);
    return entryDate >= startDate ? null : { 'entryDateInvalid': true };
  }
ngOnInit() {
  this.roleService.getRoles().subscribe((data: Role[]) => {
    this.roleNames = data;
console.log('roleNames', this.roleNames);

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
saveRole() {
  const newRole = this.employeeForm.get('name').value;
  const isManagerial = this.employeeForm.get('managerial').value;
  const startDate = this.employeeForm.get('startDate').value;
}
employeeRoles: any[] = [];
async save() {
  console.log('employeeForm', this.employeeForm.value);
  if (this.employeeForm.valid) {
     console.log('Employee data to send:', this.employeeForm.value);
  
    this.employeeService.createEmployee(this.employeeForm.value).subscribe(
      (response) => {
        console.log('Employee details saved successfully:', response);
        this.dialogRef.close()
        this.employeeService.getEmployees()
      },
      (error) => {
        console.error('Error saving employee details:', error);
      }
    );
  }
  else
  console.log('not valid');
 }; 
// }
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

