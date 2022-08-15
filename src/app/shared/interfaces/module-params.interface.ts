import {ModuleParamsEnum} from "../enums/module-params.enum";

export interface ModuleParamsInterface {
  usage: Params[];
  production: Params[];
}

export type Params = {
  [key in keyof typeof ModuleParamsEnum]?: number;
}


