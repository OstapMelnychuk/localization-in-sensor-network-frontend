import {Component, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {NodeLocatorResponse} from './models/NodeLocatorResponse';
import {NodeLocatorService} from './services/node-locator.service';
import {Observable} from 'rxjs';
import * as p5 from 'p5';
import {Node} from './models/Node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'localization-in-sensor-network-frontend';
  public response: NodeLocatorResponse;
  public innerWidth: any;
  public innerHeight: any;
  public p: p5;
  constructor(private service: NodeLocatorService, private el: ElementRef,
              private renderer: Renderer2) {
    this.innerWidth = window.innerWidth - 30;
    this.innerHeight = window.innerHeight / 2;
  }

  ngOnInit(): void {
    this.service.getNodes(3, 1.1, 7).subscribe(res => {
      if (res) {
        this.response = res;
        console.log(this.response);
        this.init();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth - 300;
    this.innerHeight = window.innerHeight;
    this.p.redraw();
  }

  // tslint:disable-next-line:typedef
  public addNode() {
    this.service.addNode(this.response, 1.1, 7).subscribe(res => {
      this.response = res;
      console.log(this.response);
      this.p.background(255);
    });
  }

  public init() {
    // tslint:disable-next-line:no-unused-expression
    this.p = new p5(p => {

      p.setup = () => {
        p.createCanvas(this.innerWidth, innerHeight).parent('analog-clock-canvas');
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
      };

      p.mouseDragged = () => {
          p.translate(-p.width / 2, -p.height / 2);
          p.stroke(0, 255, 0);
          p.strokeWeight(2);
          p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      };

      function drawMainNodeLoc(mainNodeLoc: Node, mainNode: Node) {
        p.stroke(0, 0 , 255);
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
}
