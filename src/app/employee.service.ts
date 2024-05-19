// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from './Employee';
import { PostEmployee } from './PostEmployee';
import { Role } from './Role';
// import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'api/Employee'; // API endpoint to fetch employee data

  constructor(private http: HttpClient) { }

  async getEmployees(): Promise<Observable<Employee[]>> {
    return await this.http.get<Employee[]>('https://localhost:7048/api/Employee');
  }
  async getEmployeeById(id: number): Promise<Observable<Employee>> {
    return await this.http.get<Employee>(`https://localhost:7048/api/Employee/${id}`);
}
async updataEmployee(id: string, employee: PostEmployee): Promise<Observable<Employee>> {
  employee.isMale = Boolean(employee.isMale);
  return await this.http.put<Employee>(`https://localhost:7048/api/Employee/${id}`, employee);
}
  // getRoles():Observable<Role[]> {
  //   return  this.http.get<Role[]>('https://localhost:7048/api/Role');
  // }
  // addEmployee(employeeData: Employee) {
  //   console.log('employeeDataInServer',employeeData);
    
  //   return this.http.post<Employee>(`https://localhost:7048/api/Employee/add`, employeeData);
  // }
  // addRecipe(category: Category): Observable<Category[]> {
  //   // this.productsList.push(product)
  //   return this.http.post<Category[]>("https://localhost:7090/api/Category", category)
  // }
  // getCategoryById(id: number): Observable<Category> {
  //   console.log("enter to getCategoryById",id)
  //   return this.http.get<Category>(`https://localhost:7090/api/Category/${id}`)
  // }
  createEmployee(employee: PostEmployee): Observable<any>{
    console.log('post sended');
    employee.isMale = Boolean(employee.isMale);
    return  this.http.post<PostEmployee>(`https://localhost:7048/api/Employee/add`,employee);
  }

  // updateEmployee(employee: Employee): Observable<Employee> {
  //   const url = `https://localhost:7048/api/Employee/${employee.id}`;
  //   return this.http.put<Employee>(url, employee);
  // }
// async deleteEmployee(employee: Employee):Observable<void>{
//   const url = `https://localhost:7048/api/Employee/${employee.tz}`;
//   return await this.http.delete<void>(url);
// }
deleteEmployee(employee:Employee): Observable<Employee> {
  return this.http.delete<Employee>(`https://localhost:7048/api/Employee/${employee.tz}`)
}
}

