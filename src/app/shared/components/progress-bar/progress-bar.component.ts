import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() showBefore = false;
  @Input() label = 5;
  @Input() target = 5;
  @Input() completed = 1;
  @Input() completedBefore = 0;
  @Input() completeClass = 'completed';
  @Input() beforeClass = 'completeTarget';

  public nodes: Array<number>;
  public nodesBefore: Array<number> = [];
  public svgParams = {
    x_startposition: 5,
    y_startposition: 10,
    node_width: 80,
    outer_circle: 10,
    outer_stroke: 10,
    inner_circle: 7,
    inner_stroke: 5
  };
  public addY = 0;

  constructor() {

  }

  ngOnInit() {
    this.nodes = Array(this.target).fill(this.target).map((x, i) => i + 1);
    this.completed = this.completed > this.target ? this.target : this.completed;

    if (this.showBefore) {
      this.nodesBefore = Array(this.target).fill(this.target).map((x, i) => i + 1);
      this.completedBefore = this.completedBefore > this.target ? this.target : this.completedBefore;
      this.addY = 25;
    }
  }

}
