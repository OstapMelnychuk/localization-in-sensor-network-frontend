import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsQuantityComponent } from './graphics-quantity.component';

describe('GraphicsQuantityComponent', () => {
  let component: GraphicsQuantityComponent;
  let fixture: ComponentFixture<GraphicsQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicsQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicsQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
