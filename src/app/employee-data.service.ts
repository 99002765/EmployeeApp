import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  employees:any;
  constructor() { }

  async getEmployees(){
    await fetch("http://localhost:8080/employees")
    .then(response=>response.json())
    .then(data=>{
      this.employees=data.Employees;
    })
    return this.employees;
  }
}
