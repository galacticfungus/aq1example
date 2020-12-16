import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

interface ComputeAvailableResponse {
  compute: boolean,
}
export interface ComputeAvaiableCallback { (): void }

class ComputeRequest {
  constructor(matrix1: number[][], matrix2: number[][]) {

    this.matrix1 = matrix1;
    this.matrix2 = matrix2;
  }
  matrix1: number[][];
  matrix2: number[][];
}

export interface ComputeResponse {
  matrix: number[][],
}

@Injectable({
  providedIn: 'root'
})
export class ComputeService {

  notificationCallbacks: ComputeAvaiableCallback[] = [];
  computePoller: NodeJS.Timeout;
  constructor(private http: HttpClient) {
    this.isComputeAvailable = this.isComputeAvailable.bind(this);
    this.notifyComputeReady = this.notifyComputeReady.bind(this);
    this.registerComputeNotification = this.registerComputeNotification.bind(this);
    this.computePoller = setInterval(this.isComputeAvailable, 1000);
  }

  isComputeAvailable() {
    console.log('Checking for compute')
    this.http.get<ComputeAvailableResponse>('/api/compute').subscribe(data => {
      console.log('Response to compute was: ', data)
      data.compute = true;
      if (data.compute == true) {
        console.log('compute available')
        // Disable the polling
        clearInterval(this.computePoller)
        // Notify that compute is available
        this.notifyComputeReady();
      }
    })
    
  }

  notifyComputeReady() {
    console.log('Announcing Servers have changed');
    this.notificationCallbacks.forEach(callback => callback());
  }

  registerComputeNotification(callback: ComputeAvaiableCallback) {
    this.notificationCallbacks.push(callback);
  }

  performCompute(matrix1: number[][], matrix2: number[][]): Observable<ComputeResponse> {
    // Send a request for a compute, this is then relayed to the django server which does the computation
    // This is two multidimensional arrays in a single Json
    let computeReq = new ComputeRequest(matrix1, matrix2);
    console.log("C: ", computeReq);
    let computeString = JSON.stringify(computeReq);
    console.log("JSON: ", computeString);
    return this.http.post<ComputeResponse>('/api/compute', {"data": computeReq});
  }
}
