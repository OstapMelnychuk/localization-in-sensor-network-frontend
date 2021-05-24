import {IterationTableRow} from './IterationTableRow';
import {Node} from './Node';

export class NodeLocatorResponse {
  constructor(
    public mainNode: Node,
    public mainNodeLoc: Node,
    public anchorNodes: Node[],
    public points: Node[],
    public filteredPoints: Node[],
    public iterationTable: IterationTableRow[]
  ) {
  }
}
