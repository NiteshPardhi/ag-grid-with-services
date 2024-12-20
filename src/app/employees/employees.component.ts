import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { BtnCellRendererEdit } from '../btn-cell-renderer-edit';
import { BtnCellRendererDelete } from '../btn-cell-renderer-delete';
import { EmployeeService } from '../services/employee.service';
import * as XLSX from 'xlsx';

// import employeeData from '../employees.json';

// interface Employee {  
//   id: Number;  
//   name: String;  
//   salary: Number;  
//   designation: String;  
// }  

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  // employees: Employee[] = employeeData; 

  rowData: any[] = [];
  emplArray: any[] = [];
  searchString: string = '';
  filterData: any = [];
  deletedItem: any;
  emplSubscription!: Subscription;
  page_size = 5;
  localData: any[] = [];
  _allData: any = [];
  fileName= 'ExcelSheet.xlsx';

  constructor(public router: Router, private emplService: EmployeeService) { }

  ngOnInit(): void {
    this.emplArray = this.emplService.emplJson;

    this.rowData = [...this.emplArray];
    this._allData = [...this.emplArray];

    this.emplService._emplData.next(this.rowData);

    this.emplSubscription = this.emplService._emplData.subscribe((item: any) => {
      this.deletedItem = item;
      this.rowData = [...this.deletedItem];
    })
  }

  columnDefs: ColDef[] = [
    { field: '', checkboxSelection: true, headerCheckboxSelection: true},
    { field: 'id', filter: true, sortable: true},
    { field: 'name', filter: true, sortable: true },
    { field: 'salary', filter: true, sortable: true },
    { field: 'designation', filter: true, sortable: true },
    { field: 'email', filter: true, sortable: true },
    { field: 'country', filter: true, sortable: true }, 
    {
      field: 'edit', cellRenderer: BtnCellRendererEdit, cellRendererParams: {
        clicked: (field: any) => {
        }
      }
    },
    {
      field: 'delete', cellRenderer: BtnCellRendererDelete, cellRendererParams: {
        clicked: (id: any) => {
          this.emplService.deleteEmployee(id);
        }
      }
    }
  ];

  search(event: any) {
    this.gridApi.setQuickFilter(event.target.value);

    // this.searchString = event.target.value;
    // console.log(this.searchString)

    // this.filterData = this._allData.filter((data: any) => {
    //   return data.name.toLowerCase().includes(this.searchString.toLowerCase());
    // })
    // this.rowData = [...this.filterData];
  }

  gridApi: any = [];
  gridColumnApi: any;
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();

    this.gridColumnApi = params.columnApi;  
  }

  selectRow: any = [];
  onRowSelected(event: any){
    console.log(event)
    this.selectRow = this.gridApi.getSelectedRows();
    console.log('selectedRow',this.selectRow);
  }

  deleteSelctedRow(){
    const selectedRow = this.gridApi.getSelectedRows();
    this.gridApi.applyTransaction({remove: selectedRow});
  }

  exportExcel(){
     let element = document.getElementById('excel-table');
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
     XLSX.writeFile(wb, this.fileName);
  }

}
