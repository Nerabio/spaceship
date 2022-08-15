import {IShip} from "../../interfaces/iship.interface";

export class AbstractShipModule {
  name = (<any>this).constructor.name;

  calculateParams(ship: IShip): void {
  }
}
