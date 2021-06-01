import {Component, HostListener, OnInit} from '@angular/core';
import {NodeLocatorService} from '../services/node-locator.service';
import {FormBuilder} from '@angular/forms';
import {IterationServiceResponse} from '../models/IterationServiceResponse';
import {ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {
  public propertiesInput = this.formBuilder.group({
    quantityFrom: 3,
    quantityTo: 7,
    calculationError: 1.1,
    iterationQuantity: 1000
  });
  public response: IterationServiceResponse[];
  public lineChartDataMin: ChartDataSets[] = [];
  public lineChartLabelsMin: Label[] = [];
  public lineChartDataMax: ChartDataSets[] = [];
  public lineChartLabelsMax: Label[] = [];
  public lineChartDataAverage: ChartDataSets[] = [];
  public lineChartLabelsAverage: Label[] = [];

  constructor(public service: NodeLocatorService, private formBuilder: FormBuilder, private loading: NgxSpinnerService) { }

  ngOnInit() {
  }

  backToHome() {
    this.service.toggleMainPage(true);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.service.toggleMainPage(true);
  }
  onSubmit(): void {
    // Process checkout data here
    console.log(this.propertiesInput.value);
    this.loading.show();
    this.service.iterativeComparison(this.propertiesInput.value.quantityFrom,
      this.propertiesInput.value.quantityTo,
      this.propertiesInput.value.calculationError,
      this.propertiesInput.value.iterationQuantity).subscribe(res => {
        this.response = res;
        this.loading.hide();
        this.prepareMinData();
        this.prepareMaxData();
        this.prepareAverageData();
    });
    this.loading.hide();
  }

  public prepareMinData() {
    this.lineChartDataMin = [];
    this.lineChartLabelsMin = [];
      let i = this.propertiesInput.value.quantityFrom;
    const data: number[] = [];
    for (const resp of this.response) {
      data.push(resp.min);
      this.lineChartLabelsMin.push(i.toString());
      i++;
    }
    this.lineChartDataMin = [{
      data: data,
      label: 'Minimal precision'
    }];
  }

  public prepareMaxData() {
    this.lineChartLabelsMax = [];
    this.lineChartDataMax = [];
    let i = this.propertiesInput.value.quantityFrom;
    const data: number[] = [];
    for (const resp of this.response) {
      data.push(resp.max);
      this.lineChartLabelsMax.push(i.toString());
      i++;
    }
    this.lineChartDataMax = [{
      data: data,
      label: 'Maximal precision'
    }];
  }

  public prepareAverageData() {
    this.lineChartLabelsAverage = [];
    this.lineChartDataAverage = [];
    let i = this.propertiesInput.value.quantityFrom;
    const data: number[] = [];
    for (const resp of this.response) {
      data.push(resp.average);
      this.lineChartLabelsAverage.push(i.toString());
      i++;
    }
    this.lineChartDataAverage = [{
      data: data,
      label: 'Average precision'
    }];
  }
}
