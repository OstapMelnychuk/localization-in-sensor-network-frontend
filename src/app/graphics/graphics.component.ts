import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NodeLocatorResponse} from '../models/NodeLocatorResponse';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit, OnChanges {
  @Input() response: NodeLocatorResponse;
  constructor() {
  }

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.init();
    }, 100);
  }

  private init() {
    const precision: number[] = [];
    const labels: Label[] = [];
    for (let i = 0; i < this.response.iterationTable.length; i++) {
      precision.push(this.response.iterationTable[i].precisionDistance);
      labels.push((i + 1).toString());
    }
    this.lineChartData = [
      {
        data: precision,
        label: 'Precision to IterationQuantity'
      }
    ];
    this.lineChartLabels = labels;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.init();
  }
}
