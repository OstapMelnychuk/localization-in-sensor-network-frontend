import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-graphics-comparison',
  templateUrl: './graphics-comparison.component.html',
  styleUrls: ['./graphics-comparison.component.css']
})
export class GraphicsComparisonComponent implements OnInit {
  @Input() public lineChartData: ChartDataSets[] = [];
  @Input() public lineChartLabels: Label[] = [];
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartOptions = {
    responsive: false,
  };
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit() {
  }

}
