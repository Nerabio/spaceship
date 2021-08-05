import {ShipModuleStatus} from "../enums/ship-module-status.enum";
import {ShipModuleType} from "../enums/ship-module-type.enum";
import {IShip} from "./iship.interface";

export interface  IShipModule {
  getName(): string;
  getImg(): string;
  getRelation(): IShipModule[];
  getStatus(): ShipModuleStatus;
  getType(): ShipModuleType;
  calculateParams(ship: IShip): void
}
