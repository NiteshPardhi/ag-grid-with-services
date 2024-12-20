import { Component } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'btn-cell-renderer',
  template: `
    <i class="bi bi-trash-fill text-danger" (click)="btnClickedHandler($event)"  style="font-size: 20px;"></i>
  `,
})
export class BtnCellRendererDelete implements ICellRendererAngularComp {

  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler(event: any) {
    this.params.clicked(this.params.data.id);
  }

  refresh() {
    return false;
  }
}
