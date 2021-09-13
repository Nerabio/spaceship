import {IShipModule} from "../../interfaces/ship-module.interface";
import {ShipModuleStatus} from '../../enums/ship-module-status.enum';
import {ShipModuleType} from '../../enums/ship-module-type.enum';
import {IShip} from "../../interfaces/iship.interface";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GyperEngin implements IShipModule {

  private distance = 10;
  private energyCosts = 10;

  getImg(): string {
    return "004-chart.svg";
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
    return ShipModuleType.MOVEMENT;
  }

  calculateParams(ship: IShip): void {
    console.log(this.constructor.name);
    const params = ship.getShipParams();
    params.distanse += this.distance;
    params.energy -= this.energyCosts;
  }

}
