import {Inject, Injectable} from '@angular/core';
import {IShipModule} from "../interfaces/ship-module.interface";
import {GyperEngin} from "../models/ship-modules/gyper-engine.model";
import {EnergyReactor} from "../models/ship-modules/energy-reactor.model";
import {MODULES_DICTIONARY} from "../../ship/ship.module";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  public modules: IShipModule[] = [];
  constructor(@Inject(MODULES_DICTIONARY) private modulesDictionary: IShipModule[]) {
    console.log(modulesDictionary);
    this.modules.push(new GyperEngin());
    this.modules.push(new EnergyReactor());

  }

  getModules(): IShipModule[] {
    return this.modules;
  }
}
