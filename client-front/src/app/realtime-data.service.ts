import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

export interface ValuePayload {
  value: number,
}

export interface AveragePayload {
  average: number,
  movement: number,
}

interface RealtimeData {
  type: string,
  payload: ValuePayload | AveragePayload,
}

export interface AverageCallback { (data: AveragePayload): void }
export interface ValueCallback { (data: ValuePayload): void }

@Injectable({
  providedIn: 'root'
})
export class RealtimeDataService {

  myWebSocket: WebSocketSubject<RealtimeData>; 
  isRecieving: boolean = false;
  recievedAverage: AverageCallback;
  recievedValue: ValueCallback;
  constructor() {
    this.myWebSocket = webSocket('ws://localhost:9010');
    
    this.registerForAverages = this.registerForAverages.bind(this);
    this.registerForValues = this.registerForValues.bind(this);
    // Default the callbacks to do nothing - this should be an array of callbacks
    this.recievedAverage = () => { };
    this.recievedValue = () => { };
    this.connectToServer();
  }

  registerForValues(callback: ValueCallback) {
    this.recievedValue = callback;
  }

  registerForAverages(callback: AverageCallback) {
    this.recievedAverage = callback;
  }

  connectToServer() {
    console.log('Initiating real time connection');
    this.myWebSocket.subscribe(
      response => {
        // If the data is an average then call recievedAverage with the data
        // Otherwise call recievedValue with the data
        if (response.type == "avg") {
          this.recievedAverage(response.payload as AveragePayload);
        } else {
          this.recievedValue(response.payload as ValuePayload);
        }
      },
      err => console.log(err),
      () => console.log("Connection Closed"),
    );
  }
}
