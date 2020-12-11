import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ServerDataService, ServerData } from '../server-data.service';

@Component({
  selector: 'app-server-data',
  templateUrl: './server-data.component.html',
  styleUrls: ['./server-data.component.scss']
})
export class ServerDataComponent implements OnInit {
  private portNumber: number = 0;
  public serverName: string = "Fetching...";
  constructor(private cookService: CookieService, private serverData: ServerDataService) { }

  ngOnInit(): void {
    var allCookies = this.cookService.getAll();
    console.log("All Cookies: ", allCookies);
    var cookieValue = this.cookService.get("aqserverport");
    console.log("Cookie Value: ", cookieValue);
    this.portNumber = parseInt(cookieValue);
    console.log('Using port ', this.portNumber);
    this.serverData.getServerName().subscribe((data: ServerData) => {
        this.serverName = data.name;
    }, (error) => {
      this.serverName = "Error retrieving server name, check log";
      console.log(error);
    });
    console.log('Init finished for ', this.serverName);
  }

}
