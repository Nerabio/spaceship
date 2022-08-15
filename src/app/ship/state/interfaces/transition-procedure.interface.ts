import {TransitionErrorInterface} from "./transition-error.interface";

export interface TransitionProcedureInterface {
  /**
   * Result of the procedure
   */
  result: boolean;

  /**
   * Data returned by transition procedure
   */
  data?: any;

  /**
   * Error returned by transition procedure
   */
  error?: TransitionErrorInterface;
}
