import {IShipModule} from "../../interfaces/ship-module.interface";
import {ShipModuleStatus} from '../../enums/ship-module-status.enum';
import {ShipModuleType} from '../../enums/ship-module-type.enum';
import {IShip} from "../../interfaces/iship.interface";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Empty implements IShipModule {

  getImg(): string {
    return "";
  }

  getName(): string {
    return (<any>this).constructor.name;
  }

  getRelation(): IShipModule[] {
    return [];
  }

  getStatus(): ShipModuleStatus {
    return ShipModuleStatus.EMPTY;
  }

  getType(): ShipModuleType {
    return ShipModuleType.GYPER_ENGIN;
  }

  calculateParams(ship: IShip): void {
  }

}
