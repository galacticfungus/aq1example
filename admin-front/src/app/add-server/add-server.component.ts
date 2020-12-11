import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {ServerDataService, ServerData} from '../server-data.service';

@Component({
  selector: 'app-add-server',
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.scss']
})



export class AddServerComponent implements OnInit {

  serverPortControl = new FormControl('');

  constructor(private service: ServerDataService) { }

  ngOnInit(): void {
    console.log('Add server started');
  }

  addServer() {
    console.log('add server ', this.serverPortControl.value);
    this.service.addServer(this.serverPortControl.value).subscribe(
      response => {
        console.log('Response from server add was ', response);
        // Return the server name as part of a successful response
        // But this means multiple admin clients will be unaware of each others changes
        if (response.status=='ok') {
          this.service.notifyServerAdded(response.data as ServerData);
        } else if (response.status=='noserver') {
          console.log('No server at that address');
        }
        else {
          console.log('Actual server error');
        }
      },
      error => {
        console.log('Failed to add server, error was: ', error);
      },
    );
  }

}
