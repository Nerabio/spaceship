import {ModuleParamsInterface, Params} from "../interfaces/module-params.interface";

export class ShipParams {
  distanse: number;
  strength: number;
  energy: number;
  shieldingField: number;
  constructor() {
    this.distanse = 0;
    this.strength = 0;
    this.energy = 0;
    this.shieldingField = 0;
  }

  applyModuleParams(moduleParams: ModuleParamsInterface): void {
    moduleParams.usage.forEach((usageParam: Params) => {
      console.log(usageParam);
      if(usageParam?.ENERGY){
        this.energy -= usageParam?.ENERGY;
      }
      if(usageParam?.DISTANCE){
        this.distanse -= usageParam?.DISTANCE;
      }
      if(usageParam?.STRENGTH){
        this.strength -= usageParam?.STRENGTH;
      }
      if(usageParam?.SHIELDING_FIELD){
        this.shieldingField -= usageParam?.SHIELDING_FIELD;
      }
    });

    moduleParams.production.forEach((productionParam: Params) => {
      if(productionParam?.ENERGY){
        this.energy += productionParam?.ENERGY;
      }
      if(productionParam?.DISTANCE){
        this.distanse += productionParam?.DISTANCE;
      }
      if(productionParam?.STRENGTH){
        this.strength += productionParam?.STRENGTH;
      }
      if(productionParam?.SHIELDING_FIELD){
        this.shieldingField += productionParam?.SHIELDING_FIELD;
      }
    });
  }
}
