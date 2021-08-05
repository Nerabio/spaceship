import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipRoutingModule } from './ship-routing.module';
import { ShipChangeModulesComponent } from './ship-change-modules/ship-change-modules.component';
import {HttpClientModule} from "@angular/common/http";
import {AngularSvgIconModule} from "angular-svg-icon";
import {SelecteModuleComponent} from "../shared/components/selecte-module/selecte-module.component";
import {NgxSmartModalModule, NgxSmartModalService} from "ngx-smart-modal";
import {FormsModule} from "@angular/forms";
import {ShipParamsComponent} from "../shared/components/ship-params/ship-params.component";
import {ModuleService} from "../shared/services/module.service";
import {IShipModule} from "../shared/interfaces/ship-module.interface";
import {GyperEngin} from "../shared/models/ship-modules/gyper-engine.model";

export const MODULES_DICTIONARY = new InjectionToken<IShipModule[]>('all modules!');

@NgModule({
  declarations: [
    ShipChangeModulesComponent,
    SelecteModuleComponent,
    ShipParamsComponent
  ],
  imports: [
    CommonModule,
    ShipRoutingModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    NgxSmartModalModule.forRoot(),
    FormsModule
  ],
  providers: [NgxSmartModalService,
    { provide: MODULES_DICTIONARY, useValue: [new GyperEngin(), new GyperEngin()] }
    ]
})
export class ShipModule { }
