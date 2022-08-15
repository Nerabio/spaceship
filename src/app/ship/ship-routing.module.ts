import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShipChangeModulesComponent} from "./ship-change-modules/ship-change-modules.component";
import {GrafComponent} from "./graf/graf.component";
import {PlanetsComponent} from "./planets/planets.component";
import {StateComponent} from "./state/state.component";

const routes: Routes = [
  {path: 'change', component: ShipChangeModulesComponent},
  {path: 'graph', component: GrafComponent},
  {path: 'planets', component: PlanetsComponent},
  {path: 'state', component: StateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipRoutingModule { }
