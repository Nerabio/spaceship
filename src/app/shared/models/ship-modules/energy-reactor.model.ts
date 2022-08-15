import {IShipModule} from "../../interfaces/ship-module.interface";
import {ShipModuleStatus} from '../../enums/ship-module-status.enum';
import {ShipModuleType} from '../../enums/ship-module-type.enum';
import {IShip} from "../../interfaces/iship.interface";
import {Injectable} from "@angular/core";
import {AbstractShipModule} from "./abstract-ship-module";
import {ModuleParamsInterface} from "../../interfaces/module-params.interface";

@Injectable({
  providedIn: 'root'
})
export class EnergyReactor extends AbstractShipModule implements IShipModule {
  image = "wireless-charging.svg";

  private readonly params: ModuleParamsInterface = {
    usage: [],
    production: [
      {
        ENERGY: 50
      },
    ]
  }

  getRelation(): IShipModule[] {
    return [];
  }

  getStatus(): ShipModuleStatus {
    return ShipModuleStatus.EMPTY;
  }

  getType(): ShipModuleType {
    return ShipModuleType.ENERGETIC;
  }

  calculateParams(ship: IShip): void {
    ship.getShipParams().applyModuleParams(this.params);
  }

}
