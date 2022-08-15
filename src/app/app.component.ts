import { Component } from '@angular/core';
import {Ship} from "./shared/models/ship.model";
import {SpaceService} from "./shared/services/space.service";
import {SystemNavigation} from "./shared/models/system-navigation/system-navigation";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'space';

  constructor(public spaceService: SpaceService) {


    const myShip = new Ship()
      .mountSystemNavigation(new SystemNavigation('b'));

    console.log(myShip.getModules());
    console.log(myShip.getShipParams());
    console.log(myShip.getSystemNavigation()?.getCurrentPositionId());

    this.spaceService.currentShip = myShip;
  }
}
