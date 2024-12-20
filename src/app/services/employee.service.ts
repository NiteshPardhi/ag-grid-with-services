import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  emplJson: any[] = require('../employees.json');

  _emplData = new BehaviorSubject<any>([]);
  dataLocal: any[] = [];

  constructor() {
    this.dataLocal = JSON.parse(localStorage.getItem('rowData') || '{}');
    this.emplJson = [...this.dataLocal];
  }

  addEmployee(data: any){
    this.emplJson.push(data);
    localStorage.setItem('rowData', JSON.stringify(this.emplJson));
  }

  updateEmployee(data: any, id: number){
    let index = this.emplJson.findIndex((item: any) => {
      return item.id == id;
    })
    this.emplJson[index] = data;
    localStorage.setItem('rowData', JSON.stringify(this.emplJson));
  }

  deleteEmployee(id: number){
    let index = this.emplJson.findIndex((item: any) => {
      return item.id == id;
    })
    this.emplJson.splice(index, 1);
    this._emplData.next(this.emplJson.slice());
  }

  checkExistID(id: number){
    const userID = this.emplJson.find((x: any) =>{ x.id == id})
    if (userID) {
      return 'This ID is already exists....';
    } else {
      return null;
    }
  }

  checkExistEmail(email: any){
    const userID = this.emplJson.find((x: any) =>{ x.email == email})
    if (userID) {
      return 'This Email is already exists....';
    } else {
      return null;
    }
  }

  operatorNotAllow(value: any){
    if(value.key == '+' || value.key == '-' || value.key == '.' || value.key == 'E' || value.key == 'e'){
      return false;
    }else{
      return true;
    }
  }

  
}
