import { STRING_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {RealtimeDataService, AverageData} from '../realtime-data.service'

@Component({
  selector: 'app-moving-average',
  templateUrl: './moving-average.component.html',
  styleUrls: ['./moving-average.component.scss']
})
export class MovingAverageComponent implements OnInit {
  dataService = new RealtimeDataService();
  recentAverage: AverageData | string = "No average yet";
  constructor() { 
    this.dataRecieved = this.dataRecieved.bind(this);
    this.isString = this.isString.bind(this);
    this.getAverageData = this.getAverageData.bind(this);
  }

  ngOnInit(): void {
    this.dataService.registerForAverages(this.dataRecieved);
  }

  dataRecieved(movingAverage: AverageData) {
    // data is json
    console.log("Recieved average", movingAverage);
    this.recentAverage = movingAverage as AverageData;
  }

  isString(): boolean {
    return typeof this.recentAverage === 'string';
  }

  getAverageData(): AverageData {
    return this.recentAverage as AverageData;
  }
}
