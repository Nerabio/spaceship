import {IShipModule} from "../interfaces/ship-module.interface";
import {IShip} from "../interfaces/iship.interface";
import {GyperEngin} from "./ship-modules/gyper-engine.model";
import {Empty} from "./ship-modules/empty.model";
import {ShipParams} from "./ship-params.model";
import {EnergyReactor} from "./ship-modules/energy-reactor.model";
import {INavigation} from "./system-navigation/system-navigation";

export class Ship implements IShip{
  private shipParams: ShipParams;
  private modules: Array<IShipModule[]>;
  private systemNavigation: INavigation | null;

  constructor() {
    this.shipParams = new ShipParams();
    this.systemNavigation = null;
    this.modules = [
      [new Empty(), new EnergyReactor(), new Empty()],
      [new Empty(), new GyperEngin(), new Empty()],
      [new Empty(), new Empty(), new Empty()]
    ];
    this.reCalculateShipParams();
  }

  /**
   * Установка системы навигации
   * @param nav
   */
  public mountSystemNavigation(nav: INavigation): this {
    this.systemNavigation = nav;
    return this;
  }

  public getSystemNavigation(): INavigation | null {
    return this.systemNavigation;
  }

  public getShipParams(): ShipParams {
    return this.shipParams;
  }

  public getModules(): Array<IShipModule[]> {
    return this.modules;
  }

  reCalculateShipParams(): void {
    this.shipParams = new ShipParams();
    const modules = this.getModules();
    modules.forEach(mRow => {
      mRow.forEach(module => {
        module.calculateParams(this);
      });
    });
  }
}
