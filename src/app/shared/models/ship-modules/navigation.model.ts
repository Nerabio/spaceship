import {IShipModule} from "../../interfaces/ship-module.interface";
import {IShip} from "../../interfaces/iship.interface";
import {ShipModuleStatus} from "../../enums/ship-module-status.enum";
import {ShipModuleType} from "../../enums/ship-module-type.enum";
import {AbstractShipModule} from "./abstract-ship-module";
import {ModuleParamsInterface} from "../../interfaces/module-params.interface";

export class Navigation extends AbstractShipModule implements IShipModule {
  image = "008-cpu.svg";

  private readonly params: ModuleParamsInterface = {
    usage:
      [
        {
          ENERGY: 10
        },
        {
          SHIELDING_FIELD: 10
        }
      ],
    production: []
  }

  calculateParams(ship: IShip): void {
    ship.getShipParams().applyModuleParams(this.params);
  }

  getRelation(): IShipModule[] {
    return [];
  }

  getStatus(): ShipModuleStatus {
    return ShipModuleStatus.EMPTY;
  }

  getType(): ShipModuleType {
    return ShipModuleType.NAVIGATION_SYSTEM;
  }


}
