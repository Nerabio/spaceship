import {Inject, Injectable} from '@angular/core';
import {IShipModule} from "../interfaces/ship-module.interface";
import {MODULES_DICTIONARY} from "../../ship/ship.module";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  public modules: IShipModule[] = [];
  constructor(@Inject(MODULES_DICTIONARY) private modulesDictionary: IShipModule[]) {
    this.modules = modulesDictionary;
  }

  getModules(): IShipModule[] {
    return this.modules;
  }
}
