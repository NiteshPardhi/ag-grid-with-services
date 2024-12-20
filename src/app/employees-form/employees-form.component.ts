import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent implements OnInit {

  employeeForm!: FormGroup;
  employees: any = [];
  employeeId: any = 0;
  selectEmployee: any = [];
  totalEmplData: any = [];
  emplSubscription!: Subscription;
  submitted = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private emplService: EmployeeService) { }

  ngOnInit(): void {

    this.emplSubscription = this.emplService._emplData.subscribe((data: any) => {
      this.totalEmplData = data;
    })

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.employeeId = params.get('id');

      this.selectEmployee = this.totalEmplData.filter((data: any) => {
        return this.employeeId == data.id;
      })
    })

    this.employeeForm = new FormGroup({
      id: new FormControl('', [Validators.required,Validators.pattern('^[1-9]+[0-9]*$'), Validators.maxLength(2)]),
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      salary: new FormControl('', [Validators.required]),
      designation: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required])
    })

    this.employeeForm.patchValue(this.selectEmployee[0]);
  }

  onSubmit() {
    this.employees = this.employeeForm.value;

    if(this.employeeForm.invalid){
      this.submitted = true;
      return;
    }

    let newEmail = this.employees.email;
    let newID = this.employees.id;

    let existEmail = this.totalEmplData.filter((empl: any) => {
      return empl.email == newEmail;
    })

    let existID = this.totalEmplData.filter((empl: any) => {
      return empl.id == newID;
    })

    if((existEmail.length > 0 && this.employeeId == "") || (existID.length > 0 && this.employeeId == "")){
      return;
    }else{
      let existEmail = this.totalEmplData.filter((empl : any)=> {
        return (empl.email == newEmail && empl.id != this.employeeId);
      })
      if(existEmail.length > 0){
        return alert('This email is already exist..');
      }
      let existID = this.totalEmplData.filter((empl : any)=> {
        return (empl.id == newID  && empl.id != this.employeeId);
      })
      if(existID.length > 0){
        return alert('This ID is already exist..');
      }
    }
   

    if (this.employeeId > 0) {
      this.emplService.updateEmployee(this.employees, this.employeeId);
      alert('Data Update Successfully...');
    } else {
      this.emplService.addEmployee(this.employees);
      alert('Data Added Successfully...');
    }
    this.router.navigate(['/employees']);

  }

  checkOperator(value: any){
    if(value.key == '+' || value.key == '-' || value.key == '.' || value.key == 'E' || value.key == 'e'){
      return false;
    }else{
      return true;
    }
  }

  get name() {
    return this.employeeForm.get('name');
  }
  get id() {
    return this.employeeForm.get('id');
  }
  get salary() {
    return this.employeeForm.get('salary');
  }
  get email() {
    return this.employeeForm.get('email');
  }



}
