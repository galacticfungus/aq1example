import { Component, OnInit } from '@angular/core';
import { RealtimeDataService, ValueData } from '../realtime-data.service';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-recent-values',
  templateUrl: './recent-values.component.html',
  styleUrls: ['./recent-values.component.scss']
})
export class RecentValuesComponent implements OnInit {
  recentValues: number[] = Array();
  dataService = new RealtimeDataService();
  oldestIndex: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.addNumber = this.addNumber.bind(this);
    this.dataRecieved = this.dataRecieved.bind(this);
    this.dataService.registerForValues(this.dataRecieved);
  }

  addNumber(value: number) {
    // Basic Queue
    this.recentValues.unshift(value);
    if (this.recentValues.length > 10) {
      this.recentValues.pop();
    }
    console.log("Current values: ", this.recentValues);
  }

  dataRecieved(data: ValueData) {
    // data is json
    console.log("Recieved value: ", data,", Value is ", data.value);
    this.addNumber(data.value);
  }

}
