import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface ServerData {
  name: string,
}

@Injectable({
  providedIn: 'root'
})
export class ServerDataService {

  constructor(private http: HttpClient) { }

  getServerName() : Observable<ServerData> {
    return this.http.get<ServerData>("/api/servername");
  }
}
