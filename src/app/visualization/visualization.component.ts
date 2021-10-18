import {Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as p5 from 'p5';
import {Node} from '../models/Node';
import {NodeLocatorResponse} from '../models/NodeLocatorResponse';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit, OnChanges {

  public innerWidth: any;
  public innerHeight: any;
  public p: p5;
  @Input() response: NodeLocatorResponse;
  @Input() id: string;
  @Input() delimiter: number;
  @Input() subtractor: number;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth / this.delimiter - this.subtractor;
    this.innerHeight = window.innerHeight / 2;
    this.init();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth - 300;
    this.innerHeight = window.innerHeight * 3;
    this.p.redraw();
  }

  public init() {
    // tslint:disable-next-line:no-unused-expression
    this.p = new p5(p => {

      p.setup = () => {
        p.createCanvas(this.innerWidth, innerHeight).parent(this.id);
      };

      p.draw = () => {
        p.translate(p.width / 2, p.height / 2);
        p.noFill();
        drawMainNode(this.response.mainNode, this.response.mainNode);
        drawMainNodeLoc(this.response.mainNodeLoc, this.response.mainNode);
        p.strokeWeight(2);
        drawNodes(this.response.anchorNodes, this.response.mainNode);
        p.strokeWeight(2);
        drawNodes(this.response.filteredPoints, this.response.mainNode);
        p.translate(p.width / 2, p.height / 2);
      };

      p.mouseDragged = () => {
        p.translate(-p.width / 2, -p.height / 2);
        p.stroke(0, 255, 0);
        p.strokeWeight(2);
        p.translate(-p.width / 2, -p.height / 2);
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
        p.translate(-p.width / 2, -p.height / 2);
      };

      function drawMainNodeLoc(mainNodeLoc: Node, mainNode: Node) {
        p.stroke(0, 0, 255);
        p.strokeWeight(4);
        p.point(mainNodeLoc.x - mainNode.x, mainNodeLoc.y - mainNode.y);
      }

      function drawMainNode(mainNode: Node, mainNodeTransition: Node) {
        p.stroke(255, 0, 0);
        p.strokeWeight(5);
        p.point(mainNode.x - mainNodeTransition.x, mainNode.y - mainNodeTransition.y);
        p.strokeWeight(2);
        p.ellipse(mainNode.x - mainNodeTransition.x, mainNode.y - mainNodeTransition.y, mainNode.wifiRange * 2, mainNode.wifiRange * 2);
      }

      function drawNodes(nodes: Node[], mainNode: Node) {
        p.stroke(0);
        for (const node of nodes) {
          p.point(node.x - mainNode.x, node.y - mainNode.y);
          p.ellipse(node.x - mainNode.x, node.y - mainNode.y, node.wifiRange * 2, node.wifiRange * 2);
        }
      }
    }, this.el.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.response != null && this.p != null) {
      this.p.background(255);
    }
  }

}
