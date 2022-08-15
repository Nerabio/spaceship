import {Observable} from "rxjs";
import {TransitionProcedureInterface} from "../interfaces/transition-procedure.interface";

export type TransitionProcedureType = (...args: any[]) => Observable<TransitionProcedureInterface>;
