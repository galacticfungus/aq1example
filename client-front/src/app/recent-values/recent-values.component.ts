import { Component, OnInit } from '@angular/core';
import { RealtimeDataService, ValuePayload } from '../realtime-data.service';
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
  // Adds a value to the list of numbers and removes the oldest one
  addNumber(value: number) {
    // Basic Queue
    this.recentValues.unshift(value);
    if (this.recentValues.length > 10) {
      this.recentValues.pop();
    }
  }
  // Callback that recices the latest value
  dataRecieved(data: ValuePayload) {
    // data is json
    this.addNumber(data.value);
  }

}
