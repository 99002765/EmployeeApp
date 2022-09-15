import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { EmployeeDataService } from '../employee-data.service';
import JobTitles from '../../assets/jobTitle.json';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  title = "Employee distribution by job titles"
  type = ChartType.PieChart;
   data = [
      ['Associate', 0],
      ['Developer', 0],
      ['Tech Lead', 0],
      ['Project Lead', 0],
      ['Manager', 0],
      ['Scrum Master', 0] 
   ];
   columnNames = ['Job Title', 'Count'];
   options = {
   };
   width = 1000;
   height = 400;
   employees:any;
  constructor(private employeeDataService: EmployeeDataService) {
    
  }

  ngOnInit(): void {
    // this.employeeDataService.getEmp().subscribe(data=>{
    //   this.employees=data
    //   this.generateChart()
    // })
    this.employeeDataService.fetchEmp().then(data=>{
      this.employees=data
      this.generateChart()
    })
  }
  async generateChart(){
    // this.employeeDataService.getEmp().subscribe(data=>{this.employees=data})
    // this.employees=await this.employeeDataService.getEmployees();
    console.log(this.employees)
    for(var emp of this.employees){
      for(let i=0;i<this.data.length;i++){
        if(this.data[i][0]==emp.jobTitle){
          var n:number=Number(this.data[i][1])
          n+=1
          this.data[i][1]=n
          break;
        }
      }
    }
  }
  toggleChart(){
    if(this.type==ChartType.PieChart){
      this.type=ChartType.BarChart
    }
    else{
      this.type=ChartType.PieChart
    }
  }

}
