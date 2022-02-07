import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject, timer} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {StatesEnum} from '../enums/state.enum';
import {TransitionErrorInterface} from "../interfaces/transition-error.interface";
import {StateTransitionInterface} from "../interfaces/state-transition.interface";
import {TransitionsEnum} from "../enums/transitions.enum";
import {TransitionInterface} from "../interfaces/transition.interface";
import {TransitionProcedureInterface} from "../interfaces/transition-procedure.interface";
import {BackwardTransition, ErrorRecoveryTransition} from "../constants/transition.const";


/**
 * Time in ms to indicate long request
 */
const LONG_TRANSITION_TIME = 100;

/**
 * State service for the MTS Money widget
 * This is the finite automaton that implements payments, bindings etc processes
 * See diagram 'state.png'
 */
@Injectable()
export class StateService {
  /**
   * Observable that reports state transition
   */
  public state$!: Observable<[StatesEnum, any, TransitionErrorInterface | null]>;

  /**
   * Long transition indication
   */
  public transiting$: Observable<void>;

  /**
   * Available states
   */
  private states!: StateTransitionInterface[];

  /**
   * Current state
   */
  private currentState$!: BehaviorSubject<[StateTransitionInterface, any, TransitionErrorInterface | null]>;

  /**
   * Long transition indication source
   */
  private longTransit$ = new Subject<void>();

  /**
   * Use 3D secure OR sms code
   */
  private is3DSecure: boolean | undefined;

  /**
   * Allow debug output to console
   */
  private debugOn = true;

  constructor() {
    this.transiting$ = this.longTransit$.asObservable();
    this.createAutomaton();
  }

  /**
   * Reset state to starting
   */
  public reset(): void {
    if (this.debugOn) {
      console.log('StateService.reset');
    }

    this.currentState$.next([this.states[this.startingState], null, null]);
  }


  /**
   * Run transition. To see result - subscribe to state$
   *
   * @param transition The new state to transit to
   * @param args       Arguments for transition procedure
   *                   For simple transition args[0] is an error data if present
   * @return true      If it is a valid transition for this state
   *         false     If this state does not contain this transition
   */
  public transit(transition: TransitionsEnum, ...args: any[]): boolean {
    if (this.debugOn) {
      console.log('StateService.transit to', transition, 'with', (args || []).length, 'arguments');
    }

    const state = this.currentState$.getValue();
    const trans: TransitionInterface | undefined = state[0].transitions.find(t => t.transition === transition);

    if (!trans) {
      if (this.debugOn) {
        console.warn('\tStateService.transit no transition');
      }

      // It is impossible to do this transition from this state
      return false;
    }

    /**
     * Helper function to move to next state
     * @param next  Next state
     * @param data  Data from transition
     * @param error Error of transition
     */
    const goNext = (next: StatesEnum | undefined, data: any, error: TransitionErrorInterface | null): void => {
      if (this.debugOn) {
        console.log('\tStateService.transit goNext', next, data);
      }

      const nextState = this.states.find(s => s.state === next);
      if (this.debugOn) {
        console.log('\tStateService.transit goNext nextState is', nextState);
      }

      if (nextState) {
        this.currentState$.next([nextState, data, error]);
      } else {
        // Unknown state. Set error.
        this.currentState$.next([this.states[this.errorState], null, error]);
      }
    };

    // Transition has procedure
    if (trans.procedure) {
      if (this.debugOn) {
        console.log('\tStateService.transit run procedure');
      }

      // Notify app about long transition
      // longSub will be unsubscribed in trans.procedure
      const longSub = timer(LONG_TRANSITION_TIME).subscribe(() => {
        if (this.debugOn) {
          console.log('\tStateService.transit procedure runs long');
        }

        return this.longTransit$.next();
      });

      // Run transition procedure
      const transSub = trans.procedure(...args)
        .pipe(
          // Any exceptions are considered as failures, so .subscribe() is always work
          catchError(error => {
            if (this.debugOn) {
              console.error('\tStateService.transit procedure catchError', error);
            }

            return of({result: false, error});
          })
        )
        .subscribe(
          (result: TransitionProcedureInterface) => {
            if (this.debugOn) {
              console.log('\tStateService.transit procedure done', result);
            }

            // If we get here earlier than timer fires - we will not show loader
            // because subscription will be interrupted.
            // In any case we need to unsubscribe.
            longSub.unsubscribe();

            // Use timeout to prevent error for simple transitions
            setTimeout(() => transSub.unsubscribe(), 0);

            // Transit next
            goNext(result.result ?
                (typeof trans.success === 'function' ? trans.success() : trans.success) : trans.failure,
              result.data,
              result.error ?? null
            );
          }
        );
      // Transition is possible
      return true;
    } else {
      if (this.debugOn) {
        console.log('\tStateService.transit simple');
      }

      // Simple transition
      goNext(typeof trans.success === 'function' ? trans.success() : trans.success, trans.data ?? null, args?.[0] ?? null);
      // Transition is possible
      return true;
    }

  }

  /**
   * Get starting state index
   */
  private get startingState(): number {
    return 0;
  }

  /**
   * Get error state index
   */
  private get errorState(): number {
    return this.states.length - 1;
  }

  /**
   * Create Finite Automaton.
   * This is NOT a general automaton, this is a concrete one.
   * So create it manually and fill with states.
   */
  private createAutomaton(): void {
    if (this.debugOn) {
      console.log('StateService.createAutomaton');
    }

    this.states = [];

    // Binding list
    // this.states.push(this.create_ST_BINDINGS_LIST()); // <<<<< This must be FIRST - initial state
    // this.states.push(this.create_ST_ADD_NEW_CARD());
    // this.states.push(this.create_ST_GET_BINDINGS_ERROR());
    // this.states.push(this.create_ST_PAY_NEW_CARD_ERROR());
    // this.states.push(this.create_ST_PAYMENT_ERROR());
    // this.states.push(this.create_ST_3D_SECURE());
    // this.states.push(this.create_ST_ENTER_SMS());
    // this.states.push(this.create_ST_3D_SECURE_ERROR());
    // this.states.push(this.create_ST_SMS_ERROR());
    // this.states.push(this.create_ST_PAYMENT_OK());
    // this.states.push(this.create_ST_ERROR()); // <<<<< This must be LAST - error state

    this.states.push(this.create_OPEN());
    this.states.push(this.create_CLOSE());
    this.states.push(this.create_ST_ERROR());

    // Start from 0th state
    this.currentState$ =
      new BehaviorSubject<[StateTransitionInterface, any, TransitionErrorInterface | null]>([this.states[this.startingState], null, null]);

    // Create output state
    this.state$ = this.currentState$.pipe(
      map(([st, data, error]: [StateTransitionInterface, any, TransitionErrorInterface | null]) => {
        if (this.debugOn) {
          console.log('\tStateService.createAutomaton state changed', st, data, error);
        }

        return [st.state, data, error];
      })
    );
  }

  /**
   * Create state and transitions
   */
  private create_ST_BINDINGS_LIST(): StateTransitionInterface {
    return {
      state: StatesEnum.ST_BINDINGS_LIST,
      transitions: [
        {
          transition: TransitionsEnum.TR_ADD_NEW_CARD,
          success: StatesEnum.ST_ADD_NEW_CARD
        },
        {
          transition: TransitionsEnum.TR_SELECT_EXISTING_BINDING,
          //procedure: this.mtsMoneyService.payBinding.bind(this.mtsMoneyService),
          success: () => this.is3DSecure ? StatesEnum.ST_3D_SECURE : StatesEnum.ST_ENTER_SMS,
          failure: StatesEnum.ST_PAYMENT_ERROR
        },
        {
          transition: TransitionsEnum.TR_GET_BINDINGS_ERROR,
          success: StatesEnum.ST_GET_BINDINGS_ERROR
        }
      ]
    };
  }

  /**
   * Create state and transitions
   */
  private create_ST_GET_BINDINGS_ERROR(): StateTransitionInterface {
    return {
      state: StatesEnum.ST_GET_BINDINGS_ERROR,
      transitions: [{
        transition: TransitionsEnum.TR_RETRY,
        success: StatesEnum.ST_BINDINGS_LIST,
        data: ErrorRecoveryTransition
      }]
    };
  }

  /**
   * Create state and transitions
   */
  private create_ST_ADD_NEW_CARD(): StateTransitionInterface {
    return {
      state: StatesEnum.ST_ADD_NEW_CARD,
      transitions: [
        {
          transition: TransitionsEnum.TR_CANCEL,
          success: StatesEnum.ST_BINDINGS_LIST,
          data: BackwardTransition
        },
        {
          transition: TransitionsEnum.TR_ADDING_NEW_CARD,
          // procedure: null, //this.mtsMoneyService.addNewCard.bind(this.mtsMoneyService),
          success: () => this.is3DSecure ? StatesEnum.ST_3D_SECURE : StatesEnum.ST_BINDINGS_LIST,
          failure: StatesEnum.ST_ADD_NEW_CARD_ERROR
        }
      ]
    };
  }

  /**
   * Create state and transitions
   */
  private create_ST_PAY_NEW_CARD_ERROR(): StateTransitionInterface {
    return {
      state: StatesEnum.ST_ADD_NEW_CARD_ERROR,
      transitions: [
        {
          transition: TransitionsEnum.TR_CANCEL,
          success: StatesEnum.ST_BINDINGS_LIST,
          data: ErrorRecoveryTransition
        },
        {
          transition: TransitionsEnum.TR_RETRY,
          success: StatesEnum.ST_ADD_NEW_CARD
        }
      ]
    };
  }

  /**
   * Create state and transitions
   */
  private create_ST_PAYMENT_ERROR(): StateTransitionInterface {
    return {
      state: StatesEnum.ST_PAYMENT_ERROR,
      transitions: [
        {
          transition: TransitionsEnum.TR_CANCEL,
          success: StatesEnum.ST_BINDINGS_LIST,
          data: ErrorRecoveryTransition
        }
      ]
    };
  }

  /**
   * Create state and transitions
   */
  private create_ST_3D_SECURE(): StateTransitionInterface {
    return {
      state: StatesEnum.ST_3D_SECURE,
      transitions: [
        {
          transition: TransitionsEnum.TR_CANCEL,
          success: StatesEnum.ST_BINDINGS_LIST,
          data: BackwardTransition
        },
        {
          transition: TransitionsEnum.TR_PAYED_WITHOUT_CONFIRMATION,
          success: StatesEnum.ST_PAYMENT_OK
        },
        {
          transition: TransitionsEnum.TR_ADDED_WITHOUT_CONFIRMATION,
          success: StatesEnum.ST_BINDINGS_LIST
        },
        {
          transition: TransitionsEnum.TR_PROCESS_3D_SECURE,
          //  procedure: null, //this.mtsMoneyService.check3DSecure.bind(this.mtsMoneyService),
          success: StatesEnum.ST_PAYMENT_OK,
          failure: StatesEnum.ST_3D_SECURE_ERROR
        },
        {
          transition: TransitionsEnum.TR_PROCESS_3D_SECURE_ADDING,
          //   procedure: null, //this.mtsMoneyService.check3DSecureAdding.bind(this.mtsMoneyService),
          success: StatesEnum.ST_BINDINGS_LIST,
          failure: StatesEnum.ST_3D_SECURE_ERROR
        },
        {
          transition: TransitionsEnum.TR_INCORRECT_CONFIRMATION,
          success: StatesEnum.ST_3D_SECURE_ERROR
        }
      ]
    };
  }

  /**
   * Create state and transitions
   */
  private create_ST_ENTER_SMS(): StateTransitionInterface {
    return {
      state: StatesEnum.ST_ENTER_SMS,
      transitions: [
        {
          transition: TransitionsEnum.TR_CANCEL,
          success: StatesEnum.ST_BINDINGS_LIST,
          data: BackwardTransition
        },
        {
          transition: TransitionsEnum.TR_PAYED_WITHOUT_CONFIRMATION,
          success: StatesEnum.ST_PAYMENT_OK
        },
        {
          transition: TransitionsEnum.TR_PROCESS_SMS_CODE,
          //  procedure: null, //this.mtsMoneyService.checkSMSCode.bind(this.mtsMoneyService),
          success: StatesEnum.ST_PAYMENT_OK,
          failure: StatesEnum.ST_SMS_ERROR
        },
        {
          transition: TransitionsEnum.TR_INCORRECT_CONFIRMATION,
          success: StatesEnum.ST_3D_SECURE_ERROR
        },
        {
          transition: TransitionsEnum.TR_RETRY,
          success: StatesEnum.ST_BINDINGS_LIST
        }
      ]
    };
  }

  /**
   * Create state and transitions
   */
  private create_ST_3D_SECURE_ERROR(): StateTransitionInterface {
    return {
      state: StatesEnum.ST_3D_SECURE_ERROR,
      transitions: [
        {
          transition: TransitionsEnum.TR_CANCEL,
          success: StatesEnum.ST_BINDINGS_LIST,
          data: ErrorRecoveryTransition
        }
      ]
    };
  }

  /**
   * Create state and transitions
   */
  private create_ST_SMS_ERROR(): StateTransitionInterface {
    return {
      state: StatesEnum.ST_SMS_ERROR,
      transitions: [
        {
          transition: TransitionsEnum.TR_CANCEL,
          success: StatesEnum.ST_BINDINGS_LIST,
          data: ErrorRecoveryTransition
        },
        {
          transition: TransitionsEnum.TR_RETRY,
          success: StatesEnum.ST_ENTER_SMS
        }
      ]
    };
  }

  /**
   * Create state and transitions
   */
  private create_ST_PAYMENT_OK(): StateTransitionInterface {
    return {
      state: StatesEnum.ST_PAYMENT_OK,
      transitions: []
    };
  }

  /**
   * Create state and transitions
   */
  private create_ST_ERROR(): StateTransitionInterface {
    return {
      state: StatesEnum.ST_ERROR,
      transitions: []
    };
  }


  private create_OPEN(): StateTransitionInterface {
    return {
      state: StatesEnum.OPEN,
      transitions: [
        {
          transition: TransitionsEnum.CLICK,
          success: StatesEnum.CLOSE,
        }
      ]
    }
  }

  private create_CLOSE(): StateTransitionInterface {
    return {
      state: StatesEnum.CLOSE,
      transitions: [
        {
          transition: TransitionsEnum.CLICK,
          success: StatesEnum.OPEN,
        }
      ]
    }
  }


}
