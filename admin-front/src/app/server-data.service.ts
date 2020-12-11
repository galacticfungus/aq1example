import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface AddServerResponse {
  status: string,
  data?: ServerData,
}

export interface ServerList {
    list: ServerData[];
}

export interface ServerData {
  serverName: string,
  port: number,
}
// {"status": "ok", "data": {"average": average, "movement": movement}}
export interface ServerAverage {
  status: string,
  data: {
    average: number,
    movement: number,
  }
}

export interface ServerUpdateCallback { (serverData: ServerData): void }

@Injectable({
  providedIn: 'root'
})
export class ServerDataService {

  notificationCallbacks: ServerUpdateCallback[] = [];

  getServerData(name: string) {
    // Needs to return the current average at least
    // This should use better URL construction ie /api/servers/name
    let url: string = "/api/data/" + name;
    console.log('Server data url is ', url);
    return this.http.get<ServerAverage>(url);
  }

  constructor(private http: HttpClient) {
    this.getServers = this.getServers.bind(this);
    this.addServer = this.addServer.bind(this);
    this.notifyServerAdded = this.notifyServerAdded.bind(this);
    this.registerServerAddedNotifications = this.registerServerAddedNotifications.bind(this);
   }

  getServers(): Observable<ServerList> {
    // Here we ask django what the server names are
    return this.http.get<ServerList>("/api/servers");
  }

  addServer(port: number) {
    let body = JSON.stringify({port: port});
    // Return the observable to whoever made the request
    return this.http.post<AddServerResponse>('/api/add', body);
  }

  notifyServerAdded(serverData: ServerData) {
    console.log('Announcing Servers have changed');
    this.notificationCallbacks.forEach(callback => callback(serverData));
  }
  // This is not ideal, the hierarchy of the components should be changed
  registerServerAddedNotifications(callback: ServerUpdateCallback) {
    this.notificationCallbacks.push(callback);
  }
}
