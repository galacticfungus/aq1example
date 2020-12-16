import { Component, OnInit } from '@angular/core';
import { ComputeService } from '../compute.service';

@Component({
  selector: 'app-compute',
  templateUrl: './compute.component.html',
  styleUrls: ['./compute.component.scss'],
})
export class ComputeComponent implements OnInit {
  constructor(private service: ComputeService) {
    this.computeResult = this.computeResult.bind(this);
  }
  hasResult: boolean = true;
  identMatrix: number[][] = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  matrix: number[][] = [
    [2, 3, 1],
    [3, 2, 1],
    [2, 6, 4],
  ];
  answer: number[][] = [];
  ngOnInit(): void {}

  computeResult() {
    this.service
      .performCompute(this.identMatrix, this.matrix)
      .subscribe((data) => {
        this.hasResult = true;
        this.answer = data.solution;
        console.log('Matrix: ', data.solution);
        console.log('Answer: ', this.answer);
      });
  }
}
