import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { TableComponent } from './table/table.component';
import {ReactiveFormsModule} from '@angular/forms';
import { GraphicsComponent } from './graphics/graphics.component';
import {ChartsModule} from 'ng2-charts';
import { GraphicsQuantityComponent } from './graphics-quantity/graphics-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    GraphicsComponent,
    GraphicsQuantityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
