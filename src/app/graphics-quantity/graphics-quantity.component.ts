import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NodeLocatorResponse} from '../models/NodeLocatorResponse';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {IterationTableRow} from '../models/IterationTableRow';
import {Subject} from 'rxjs';
import {NodeLocatorService} from '../services/node-locator.service';

@Component({
  selector: 'app-graphics-quantity',
  templateUrl: './graphics-quantity.component.html',
  styleUrls: ['./graphics-quantity.component.css']
})
export class GraphicsQuantityComponent implements OnChanges {
  isChanged: boolean;
  @Input() response: NodeLocatorResponse;
  iterationTableRows: IterationTableRow[] = [];
  precision: number[] = [];
  labels: Label[] = [];

  constructor(private service: NodeLocatorService) {
    service.isLocatedNewChange.subscribe(value => {
      this.isChanged = value;
    });
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

  private init() {
    this.precision.push(this.response.iterationTable[0].precisionDistance);
    this.labels.push((this.response.anchorNodes.length).toString());
    this.lineChartData = [
      {
        data: this.precision,
        label: 'Precision to quantity of Anchor Nodes'
      }
    ];
    this.lineChartLabels = this.labels;
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.isChanged) {
      this.reInitializeGraphicData();
      this.init();
    } else {
      this.init();
    }
  }

  reInitializeGraphicData() {
    this.precision = [];
    this.labels = [];
  }

}
