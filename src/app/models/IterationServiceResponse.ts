import {Node} from './Node';
import {NodeLocatorResponse} from './NodeLocatorResponse';

export class IterationServiceResponse {
  constructor(
    public min: number,
    public max: number,
    public average: number,
    public iterationPrecision: Map<number, number>,
    public minCase: NodeLocatorResponse,
    public maxCase: NodeLocatorResponse
  ) {
  }
}
