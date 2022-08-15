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
export class GyperEngin extends AbstractShipModule implements IShipModule {
image = "004-chart.svg";

  private readonly params: ModuleParamsInterface = {
    usage: [
      {
        ENERGY: 30,
      }
    ],
    production: [
      {
        DISTANCE: 30,
      }
    ]
  }


  getRelation(): IShipModule[] {
    return [];
  }

  getStatus(): ShipModuleStatus {
    return ShipModuleStatus.EMPTY;
  }

  getType(): ShipModuleType {
    return ShipModuleType.MOVEMENT;
  }

  calculateParams(ship: IShip): void {
    ship.getShipParams().applyModuleParams(this.params);
  }

}
