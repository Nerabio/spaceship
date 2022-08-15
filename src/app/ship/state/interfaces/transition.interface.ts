import {TransitionsEnum} from "../enums/transitions.enum";
import {TransitionProcedureType} from "../types/transition-procedure.type";
import {StatesEnum} from "../enums/state.enum";

export interface TransitionInterface {
  /**
   * Transition
   */
  transition: TransitionsEnum;

  /**
   * Procedure to run in transition
   * If need to run many procedures - then combine it to one and use this combined procedure
   * If procedure returns true then transition go to success state
   * If procedure returns false then transition go to failure state
   * If procedure is null then transition go to success state
   * If procedure is defined but failure is not defined then state will go to error state and stuck where
   */
  procedure?: TransitionProcedureType;

  /**
   * State if transition is success
   */
  success: StatesEnum | (() => StatesEnum);

  /**
   * State if transition is failed
   */
  failure?: StatesEnum;

  /**
   * Static data to pass with simple transition.
   * It fill be forced to null if not defined
   */
  data?: any;
}
