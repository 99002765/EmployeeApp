import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  searchTerm:String='';
  region:String='';
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
      this.employees=data.Employees
      this.tableData=this.employees
      this.collectionSize=data.Employees.length;
      this.calculatePages()
      this.showPage(0)
    })
  }
  calculatePages(){
    this.pages=Array(Math.ceil(this.tableData.length/5))
  }
  //Functionality for Previous and Next buttons
  togglePage(event:any){
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
      if(i*this.pageSize+j<this.tableData.length)
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
    this.filter()
  }
  //Filter by jobTitle(s)
  titleFilter(checkbox:any,jobTitle:String){
    if(checkbox.target.checked==true)
      this.titleFilters.push(jobTitle)
    else
      this.titleFilters=this.titleFilters.filter(i=>i!=jobTitle)
    this.filter()
  }
  //Filter by region
  regionFilter(event:any){
    var filterRegion=event.target.value
    this.region=filterRegion
    this.filter()
  }
  filter(){
    var filteredData=this.employees
    if(this.searchTerm!=''){
      var search=this.searchTerm.toLowerCase()
      filteredData=filteredData.filter((employee:any)=>
        (employee.firstName.toLowerCase().includes(search) || employee.lastName.toLowerCase().includes(search) || employee.userId.toLowerCase().includes(search))
      );
    }
    if(this.region!='')
      filteredData=filteredData.filter((e:any)=>e.region==this.region);
    if(this.titleFilters.length!=0)
      filteredData=filteredData.filter((e:any)=>this.titleFilters.includes(e.jobTitle))
    this.tableData=filteredData;
    this.calculatePages()
    this.showPage(0)
  }
}
