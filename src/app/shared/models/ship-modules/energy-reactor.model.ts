import {IShipModule} from "../../interfaces/ship-module.interface";
import {ShipModuleStatus} from '../../enums/ship-module-status.enum';
import {ShipModuleType} from '../../enums/ship-module-type.enum';
import {IShip} from "../../interfaces/iship.interface";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class EnergyReactor implements IShipModule {
  private energy = 10;

  getImg(): string {
    return "wireless-charging.svg";
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
    console.log(this.constructor.name);
    const params = ship.getShipParams();
    params.energy += this.energy;
  }

}
