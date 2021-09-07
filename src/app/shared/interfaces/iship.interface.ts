import {ShipParams} from "../models/ship-params.model";
import {IShipModule} from "./ship-module.interface";
import {INavigation} from "../models/system-navigation/system-navigation";

export interface IShip {
  getShipParams(): ShipParams;
  getModules(): Array<IShipModule[]>;
  reCalculateShipParams(): void;
  mountSystemNavigation(nav: INavigation): this;
  getSystemNavigation(): INavigation | null;
}
