import { Injectable } from '@angular/core';
import {IShip} from "../interfaces/iship.interface";

@Injectable({
  providedIn: 'root'
})
export class SpaceService {
  public currentShip: IShip = {} as IShip;
  constructor() {
  }
}
