import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  @Input() employee:any;
  constructor() { }

  ngOnInit(): void {
  }

}
