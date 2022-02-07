import {Component, OnInit} from '@angular/core';
import {StateService} from "./services/state.service";
import {TransitionsEnum} from "./enums/transitions.enum";
import {StatesEnum} from "./enums/state.enum";
import {TransitionErrorInterface} from "./interfaces/transition-error.interface";

export interface IStateDate {
  container?: [StatesEnum, any, any];
}

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  constructor(private stateService: StateService) {
    this.stateService.state$.subscribe((state) => {
      this.stateHandler({container: state} as IStateDate);
    });
  }

  stateHandler(stateData: IStateDate): void {
    if(!stateData?.container) return;

    const state = stateData?.container[0] as StatesEnum;
    const target = stateData?.container[2] as HTMLElement;
    if(!target) return;

    switch (state) {
      case StatesEnum.OPEN:
        target.innerText = 'open';
        target.style.background = 'green';
      break;
      case StatesEnum.CLOSE:
        target.innerText = 'close'
        target.style.background = 'red';
      break;
    }
  }


  ngOnInit(): void {
  }

  onClick(ev: Event): void {
    this.stateService.transit(TransitionsEnum.CLICK, ev.target);
  }
}
