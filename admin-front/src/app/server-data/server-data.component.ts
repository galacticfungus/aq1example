import { Component, OnInit, Input } from '@angular/core';
import { ServerDataService } from '../server-data.service';

@Component({
  selector: 'app-server-data',
  templateUrl: './server-data.component.html',
  styleUrls: ['./server-data.component.scss']
})
export class ServerDataComponent implements OnInit {

  constructor(private service: ServerDataService) { 
    
  }
  @Input('port')
  set port(port: number) {
    this._port = port
  }
  get port(): number { return this._port; }

  _port: number = 0;

  @Input('serverName')
  set name(name: string) {
    this._name = name
  }
  get name(): string { return this._name; }

  _name: string = '';

  serverAverage: number = 0;
  serverMovement: number = 0;
  ngOnInit(): void {
    this.service.getServerData(this._name).subscribe(
      data => {
        // Needs error checking
        this.serverAverage = data.data.average
        this.serverMovement = data.data.movement
      }
    );
  }

  refreshServerData(): void {
    this.service.getServerData(this._name).subscribe(
      data => {
        // Needs error checking
        this.serverAverage = data.data.average
        this.serverMovement = data.data.movement
      }
    );
  }

}
