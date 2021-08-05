import { Component } from '@angular/core';
import {Ship} from "./shared/models/ship.model";
import {SpaceService} from "./shared/services/space.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'space';

  constructor(public spaceService: SpaceService) {
    const myShip = new Ship();
    console.log(myShip.getModules());
    console.log(myShip.getShipParams());

    this.spaceService.currentShip = myShip;
  }
}
