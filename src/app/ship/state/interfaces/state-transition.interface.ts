/**
 * Interface describing transition between states
 */
import {TransitionInterface} from "./transition.interface";
import {StatesEnum} from "../enums/state.enum";

export interface StateTransitionInterface {
  /**
   * Initial state
   */
  state: StatesEnum;

  /**
   * Available transitions from this state
   */
  transitions: TransitionInterface[];
}
