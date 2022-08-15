import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ship-params',
  templateUrl: './ship-params.component.html',
  styleUrls: ['./ship-params.component.scss']
})
export class ShipParamsComponent implements OnInit {

  @Input() params: any;

  constructor() { }

  ngOnInit(): void {  }

}
