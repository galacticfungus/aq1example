import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

export interface ValueData {
  value: number,
}

export interface AverageData {
  average: number,
  movement: number,
}

interface RealtimeData {
  type: string,
  payload: ValueData | AverageData,
}

export interface AverageCallback { (data: AverageData): void }
export interface ValueCallback { (data: ValueData): void }

@Injectable({
  providedIn: 'root'
})
export class RealtimeDataService {

  myWebSocket: WebSocketSubject<RealtimeData> = webSocket('ws://localhost:9010');
  isRecieving: boolean = false;
  recievedAverage: AverageCallback;
  recievedValue: ValueCallback;
  constructor() {
    // Default the callbacks to do nothing
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
      data => {
        // If the data is an average then call recievedAverage with the data
        // Otherwise call recievedValue with the data
        console.log('Raw Data: ', data);
        if (data.type == "avg") {
          this.recievedAverage(data.payload as AverageData);

        } else {
          console.log('Value payload: ', data.payload);
          this.recievedValue(data.payload as ValueData);
        }
      },
      err => console.log(err),
      () => console.log("Connection Closed"),
    );
  }
}
