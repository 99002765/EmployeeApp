import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  employees:any=null;
  getUrl:string="http://localhost:8080/getFromDB";
  constructor(private http:HttpClient) { }

  async getEmployees(){
    if(this.employees==null)
      await fetch("http://localhost:8080/getFromDB")
      .then(response=>response.json())
      .then(data=>{
        this.employees=data;
      })
    return this.employees;
  }
  getEmp():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.getUrl)
  }
  fetchEmp(){
    return fetch(this.getUrl).then(res=>res.json())
  }
}
