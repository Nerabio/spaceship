import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShipChangeModulesComponent} from "./ship-change-modules/ship-change-modules.component";

const routes: Routes = [
  {path: 'change', component: ShipChangeModulesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipRoutingModule { }
