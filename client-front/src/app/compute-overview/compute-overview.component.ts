import { Component, OnInit } from '@angular/core';
import {ComputeAvaiableCallback, ComputeService} from '../compute.service'

@Component({
  selector: 'app-compute-overview',
  templateUrl: './compute-overview.component.html',
  styleUrls: ['./compute-overview.component.scss']
})
export class ComputeOverviewComponent implements OnInit {

  constructor(private compute: ComputeService) { }
  ready: boolean = true;
  ngOnInit(): void {
    this.computeReady = this.computeReady.bind(this);
    this.isComputeReady = this.isComputeReady.bind(this);
    // this.compute.registerComputeNotification(this.computeReady);
  }

  // Callback used to inform when compute is ready
  computeReady(): void {
    // Here we enable the display of compute component
    this.ready = true;
  }

  isComputeReady(): boolean {
    return this.ready
  }

}
