import {Component, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {NodeLocatorResponse} from './models/NodeLocatorResponse';
import {NodeLocatorService} from './services/node-locator.service';
import {Observable} from 'rxjs';
import * as p5 from 'p5';
import {Node} from './models/Node';
import {FormBuilder} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'localization-in-sensor-network-frontend';
  public response: NodeLocatorResponse;
  public propertiesInput = this.formBuilder.group({
    quantity: 3,
    calculationError: 1.1,
    iterationQuantity: 3
  });
  public delimiter = 1;
  public subtractor = 50;
  public dataLoaded = false;


  constructor(public service: NodeLocatorService, private el: ElementRef,
              private renderer: Renderer2, private formBuilder: FormBuilder, private loading: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.service.getNodes(3, 1.1, 3).subscribe(res => {
      if (res) {
        this.response = res;
        this.dataLoaded = true;
        console.log(this.response);
        this.service.toggleNewLocation(true);
      }
    });
  }

  // tslint:disable-next-line:typedef
  public addNode() {
    this.service.addNode(this.response, this.propertiesInput.value.calculationError,
      this.propertiesInput.value.iterationQuantity).subscribe(res => {
      this.response = res;
      console.log(this.response);
      this.service.toggleNewLocation(false);
    });
  }

  onSubmit(): void {
    this.loading.show();
    // Process checkout data here
    console.log(this.propertiesInput.value);
    this.service.getNodes(this.propertiesInput.value.quantity,
      this.propertiesInput.value.calculationError,
      this.propertiesInput.value.iterationQuantity).subscribe(res => {
      if (res) {
        this.response = res;
        console.log(this.response);
        this.loading.hide();
        this.service.toggleNewLocation(true);
      }
    });
    this.loading.show();
  }

  removeMainPage() {
    this.service.toggleMainPage(false);
  }
}
