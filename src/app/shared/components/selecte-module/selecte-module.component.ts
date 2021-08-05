import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ModuleService} from "../../services/module.service";
import {IShipModule} from "../../interfaces/ship-module.interface";

@Component({
  selector: 'app-selecte-module',
  templateUrl: './selecte-module.component.html',
  styleUrls: ['./selecte-module.component.scss']
})
export class SelecteModuleComponent implements OnInit {

  public modules: IShipModule[] = [];

  @Output() onSelect: EventEmitter<IShipModule> = new EventEmitter<IShipModule>();

  constructor(public moduleService: ModuleService) { }

  ngOnInit(): void {
    this.modules = this.moduleService.getModules();
  }

  selectModule(module: IShipModule): void {
    this.onSelect.emit(module)
  }

}
