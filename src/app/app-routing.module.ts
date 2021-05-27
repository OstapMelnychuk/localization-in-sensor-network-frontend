import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ComparisonComponent} from './comparison/comparison.component';

const routes: Routes = [
  {path: 'comparison', component: ComparisonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
