import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project3';
  data: any= []
  constructor(){
    // this.data = JSON.parse(localStorage.getItem('rowData') || '{}')
  }
}
