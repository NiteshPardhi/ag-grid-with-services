import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'btn-cell-renderer',
  template: `
    <i class="bi bi-pen-fill text-primary" (click)="btnClickedEdit($event)" style="font-size: 20px;"></i>
  `,
})
export class BtnCellRendererEdit implements ICellRendererAngularComp {

  private params: any;

  constructor(private router: Router){}

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedEdit(event: any) {
    this.params.clicked(this.params.value);
    let country = this.params.data.country;
    let name = this.params.data.name;
    let designation = this.params.data.designation;
    this.router.navigate(['/employees-form', this.params.data.id],{queryParams:{name,country}, fragment: designation});
  }

  refresh() {
    return false;
  }
}
