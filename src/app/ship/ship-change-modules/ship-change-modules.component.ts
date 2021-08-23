import {Component, Input, OnInit} from '@angular/core';
import {IShipModule} from "../../shared/interfaces/ship-module.interface";
import {SpaceService} from "../../shared/services/space.service";
import {ModuleService} from "../../shared/services/module.service";
import {NgxSmartModalService} from "ngx-smart-modal";
import {Empty} from "../../shared/models/ship-modules/empty.model";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";


@Component({
  selector: 'app-ship-change-modules',
  templateUrl: './ship-change-modules.component.html',
  styleUrls: ['./ship-change-modules.component.scss']
})
export class ShipChangeModulesComponent implements OnInit {
  public targetSectionCoords = {x: 0, y: 0};
  public modules: Array<IShipModule[]> = [];
  constructor(public spaceService: SpaceService, public moduleService: ModuleService, public ngxSmartModalService: NgxSmartModalService) {
  }

  ngOnInit(): void {
     this.modules = this.spaceService.currentShip.getModules();
  }

  ngAfterViewInit() {
    this.ngxSmartModalService.setModalData([], 'popupOne');
  }

  setCoordsSection(x: number,y: number): void {
    this.targetSectionCoords = { x, y};
    this.ngxSmartModalService.getModal('popupOne').open()
  }

  onSelectModule(module: IShipModule): void {
    const { x, y } = this.targetSectionCoords;
    this.modules[x][y] = module;
    this.spaceService.currentShip.reCalculateShipParams();
  }

  drop(event: any) {
    console.log(event);
    moveItemInArray(this.modules, event.previousIndex, event.currentIndex);
    console.log(event.previousIndex, event.currentIndex);
  }
}
