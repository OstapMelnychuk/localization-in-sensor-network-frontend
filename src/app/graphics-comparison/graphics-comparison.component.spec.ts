import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsComparisonComponent } from './graphics-comparison.component';

describe('GraphicsComparisonComponent', () => {
  let component: GraphicsComparisonComponent;
  let fixture: ComponentFixture<GraphicsComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicsComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicsComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
