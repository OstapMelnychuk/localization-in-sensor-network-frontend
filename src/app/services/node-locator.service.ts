import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NodeLocatorResponse} from '../models/NodeLocatorResponse';

@Injectable({
  providedIn: 'root'
})
export class NodeLocatorService {
  private localLink = 'http://localhost:8080/nodeLocator/locate';
  private link = 'https://localization-sensor-network-bc.herokuapp.com/nodeLocator/locate';

  constructor(private http: HttpClient) { }

  getNodes(quantity: number, error: number, iterationQuantity: number) {
    return this.http.get<NodeLocatorResponse>(this.link + '/' + quantity + '/' + error + '/' + iterationQuantity);
  }

  addNode(initData: NodeLocatorResponse,  error: number, iterationQuantity: number) {
    const postLink = this.link + '/' + 'addNode' + '/' + error + '/' + iterationQuantity;
    return this.http.post<NodeLocatorResponse>(postLink, initData);
  }
}
