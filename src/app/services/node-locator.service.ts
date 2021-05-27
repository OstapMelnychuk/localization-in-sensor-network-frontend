import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NodeLocatorResponse} from '../models/NodeLocatorResponse';
import {IterationTableRow} from '../models/IterationTableRow';
import {Subject} from 'rxjs';
import {IterationServiceResponse} from '../models/IterationServiceResponse';

@Injectable({
  providedIn: 'root'
})
export class NodeLocatorService {
  private localLink = 'http://localhost:8080/nodeLocator/locate';
  private link = 'https://localization-sensor-network-bc.herokuapp.com/nodeLocator/locate';
  public isLocatedNew = true;
  public isLocatedNewChange: Subject<boolean> = new Subject<boolean>();
  public isOnMainPage = true;
  public isOnMainPageChange: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.isLocatedNewChange.subscribe((value) => {
      this.isLocatedNew = value;
    });
    this.isOnMainPageChange.subscribe((value) => {
      this.isOnMainPage = value;
    });
  }

  getNodes(quantity: number, error: number, iterationQuantity: number) {
    return this.http.get<NodeLocatorResponse>(this.link + '/' + quantity + '/' + error + '/' + iterationQuantity);
  }

  addNode(initData: NodeLocatorResponse,  error: number, iterationQuantity: number) {
    const postLink = this.link + '/' + 'addNode' + '/' + error + '/' + iterationQuantity;
    return this.http.post<NodeLocatorResponse>(postLink, initData);
  }

  toggleNewLocation(value: boolean) {
    this.isLocatedNewChange.next(value);
  }

  iterativeComparison(quantityFrom: number, quantityTo: number, error: number, iterationQuantity: number) {
    return this.http.get<IterationServiceResponse[]>(this.link + '/' + 'iterative/' + quantityFrom +
      '/' + quantityTo + '/' + error + '/' + iterationQuantity);
  }

  toggleMainPage(value: boolean) {
    this.isOnMainPageChange.next(value);
  }
}
