import {Component, Input, OnInit} from '@angular/core';
import {NodeLocatorResponse} from '../models/NodeLocatorResponse';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor() { }
  @Input() response: NodeLocatorResponse;
  ngOnInit() {
  }

}
