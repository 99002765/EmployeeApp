import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  searchTerm:String='';
  employees:any;
  tableData:any;
  pageData:any;
  curPage:number=0;
  page = 1;
  pageSize = 5;
  pages:number[]=[]
  displayedColumns=['userId','firstName','lastName','jobTitle','region']
  collectionSize: number=5;
  titleFilters:String[]=[];
  constructor() { }

  ngOnInit(): void {
    this.getEmployees()
  }
  //Get data from the backend and initialize the table
  getEmployees(){
    fetch("http://localhost:8080/employees")
    .then(response=>response.json())
    .then(data=>{
      console.log(data)
      this.employees=data.Employees
      this.tableData=this.employees
      this.collectionSize=data.Employees.length;
      this.pages=Array(Math.ceil(this.collectionSize/5))
      this.showPage(0)
    })
  }
  //Functionality for Previous and Next buttons
  togglePage(event:any){
    console.log("Event target id"+event.target.id)
    if(event.target.id=='next' && this.curPage!=this.pages.length-1)
      this.showPage(this.curPage+1)
    if(event.target.id=='prev' && this.curPage!=0)
      this.showPage(this.curPage-1)
    
  }
  //Functionality for pages
  showPage(i:number){
    this.curPage=i
    this.pageData=[]
    console.log("Current page: "+this.curPage)
    for(var j=0;j<this.pageSize;j++){
      if(i*this.pageSize+j<this.collectionSize)
        this.pageData.push(this.tableData[i*this.pageSize+j])
    }
    for(let idx=0;idx<this.pages.length;idx++){
      if(idx==i)
        document.getElementById('page'+idx)?.classList.add('active')
      else
        document.getElementById('page'+idx)?.classList.remove('active')
    }
  }

  // Filter by the name in search bar
  search(){
    var filteredData=[]
    for(let employee of this.employees){
      var search=this.searchTerm.toLowerCase()
      if(employee.firstName.toLowerCase().includes(search) || employee.lastName.toLowerCase().includes(search))
        filteredData.push(employee);
    }
    this.tableData=filteredData
    console.log(this.searchTerm)
    this.showPage(0)
  }
  //Filter by jobTitle(s)
  titleFilter(checkbox:any,jobTitle:String){
    if(checkbox.target.checked==true)
      this.titleFilters.push(jobTitle)
    else
      this.titleFilters=this.titleFilters.filter(i=>i!=jobTitle)
    console.log("Title filters: "+this.titleFilters)
    var filteredData=[]
    if(this.titleFilters.length!=0){
      for(let employee of this.employees){
        if(this.titleFilters.includes(employee.jobTitle))
          filteredData.push(employee)
      }
      this.tableData=filteredData
    }
    else{
      this.tableData=this.employees
    }
    this.showPage(0)
  }
  //Filter by region
  regionFilter(event:any){
    var filterRegion=event.target.value
    if(filterRegion!=''){
      var filteredData=[]
      for(let employee of this.employees){
        if(employee.region==filterRegion)
          filteredData.push(employee)
      }
      this.tableData=filteredData
    }
    else{
      this.tableData=this.employees
    }
    console.log(event.target.id)
    this.showPage(0)
  }
}
