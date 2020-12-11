import { Component, OnInit } from '@angular/core';
import {ServerDataService, ServerList, ServerData} from '../server-data.service';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.scss']
})
export class ServerListComponent implements OnInit {

  constructor(private service: ServerDataService) {
    this.serverAdded = this.serverAdded.bind(this);
  }

  servers: ServerData[] = [];

  ngOnInit(): void {
    this.service.registerServerAddedNotifications(this.serverAdded);
    this.service.getServers().subscribe((serverList: ServerList) => {
        console.log('Raw Server List', serverList);
        //this.servers = serverList.list;
        console.log("Internal servers are: ", this.servers);
      });
    console.log("Servers are: ", this.servers);
  }

  serverAdded(serverData: ServerData) {
    console.log('Responding to servers updated notification');
    this.servers.push(serverData);
    console.log("Servers are: ", this.servers);
  }

}
