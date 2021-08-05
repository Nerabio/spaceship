import {Component, Input, OnInit} from '@angular/core';
import {IShip} from "../../interfaces/iship.interface";
import {ShipParams} from "../../models/ship-params.model";

@Component({
  selector: 'app-ship-params',
  templateUrl: './ship-params.component.html',
  styleUrls: ['./ship-params.component.scss']
})
export class ShipParamsComponent implements OnInit {

  @Input()  params: ShipParams = {} as ShipParams;

  constructor() { }

  ngOnInit(): void {  }

}
