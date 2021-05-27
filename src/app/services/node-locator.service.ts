import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NodeLocatorResponse} from '../models/NodeLocatorResponse';
import {IterationTableRow} from '../models/IterationTableRow';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeLocatorService {
  private localLink = 'http://localhost:8080/nodeLocator/locate';
  private link = 'https://localization-sensor-network-bc.herokuapp.com/nodeLocator/locate';
  public isLocatedNew = true;
  public isLocatedNewChange: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.isLocatedNewChange.subscribe((value) => {
      this.isLocatedNew = value;
    });
  }

  getNodes(quantity: number, error: number, iterationQuantity: number) {
    return this.http.get<NodeLocatorResponse>(this.localLink + '/' + quantity + '/' + error + '/' + iterationQuantity);
  }

  addNode(initData: NodeLocatorResponse,  error: number, iterationQuantity: number) {
    const postLink = this.localLink + '/' + 'addNode' + '/' + error + '/' + iterationQuantity;
    return this.http.post<NodeLocatorResponse>(postLink, initData);
  }

  toggleNewLocation(value: boolean) {
    this.isLocatedNewChange.next(value);
  }
}
