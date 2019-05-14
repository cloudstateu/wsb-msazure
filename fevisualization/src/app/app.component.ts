import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import {Data} from './data';
import { Point } from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.getMessages();
  }
  title = 'fevisualization';
  data:any[]=[];
  constructor(private socket: Socket, private ref: ChangeDetectorRef) {
    
  }
  
  getMessages() {
    this.socket.on('message', (data: string) => {
      console.log(data)
      this.addPoint(JSON.parse(data));
    });
  }
  addPoint(n: Data) {
    if(n.msgType === 'metrics'){
      console.log("Data pushed",n);
      this.data.push({a1:n.data.a1, b1: n.data.b1, Time: new Date(n.data.Time)});
      this.ref.detectChanges();
    }
    else {
      console.log(n.error);
    }
  }
}
