import {Component, OnInit} from '@angular/core';
import {StateService} from "./services/state.service";
import {TransitionsEnum} from "./enums/transitions.enum";

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  constructor(private stateService: StateService) {
 //   this.stateService.transit(TransitionsEnum.TR_PROCESS_SMS_CODE);

    this.stateService.state$.subscribe(item => {
      console.log(item);
    });

    this.stateService.transit(TransitionsEnum.OPEN);

  //  this.stateService.transit(TransitionsEnum.CLOSE);

  }

  ngOnInit(): void {
  }

}
