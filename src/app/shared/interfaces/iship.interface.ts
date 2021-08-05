import {ShipParams} from "../models/ship-params.model";
import {IShipModule} from "./ship-module.interface";

export interface IShip {
  getShipParams(): ShipParams;
  getModules(): Array<IShipModule[]>;
  reCalculateShipParams(): void;
}
