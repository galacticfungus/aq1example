import { STRING_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {RealtimeDataService, AveragePayload} from '../realtime-data.service'

@Component({
  selector: 'app-moving-average',
  templateUrl: './moving-average.component.html',
  styleUrls: ['./moving-average.component.scss']
})
export class MovingAverageComponent implements OnInit {
  dataService = new RealtimeDataService();
  recentAverage: AveragePayload | string = "Waiting for server...";
  constructor() {
    // Ensure this is correctly defined
    this.dataRecieved = this.dataRecieved.bind(this);
    this.isString = this.isString.bind(this);
    this.getAverage = this.getAverage.bind(this);
    this.getMovement = this.getMovement.bind(this);
  }

  ngOnInit(): void {
    this.dataService.registerForAverages(this.dataRecieved);
  }
  // Callback that recieves new averages
  dataRecieved(movingAverage: AveragePayload) {
    // data is json
    this.recentAverage = movingAverage as AveragePayload;
  }
  // Checks if the component has recieved an average from the server yet
  // THis is used by the UI to determine if the client has recieved an average yet
  isString(): boolean {
    return typeof this.recentAverage === 'string';
  }

  // This function can only be called once the component has recieved
  // at least one average, this guarentee is enforced in the UI
  getAverage(): number {
    return (this.recentAverage as AveragePayload).average
  }

  // This function can only be called once the component has recieved
  // at least one average, this guarentee is enforced in the UI
  getMovement(): number {
    return (this.recentAverage as AveragePayload).movement
  }
}
