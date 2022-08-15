import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

export interface IMenuItem {
  icon: string;
  route: string;

}

@Component({
  selector: 'app-view-menu',
  templateUrl: './view-menu.component.html',
  styleUrls: ['./view-menu.component.scss']
})
export class ViewMenuComponent implements OnInit {

  public menuItems: IMenuItem[] = [
    {
      icon: 'constellation-svgrepo-com',
      route: 'graph'
    },
    {
      icon: 'solar-system-sun-svgrepo-com',
      route: 'planets'
    },
    {
      icon: 'rocket-svgrepo-com',
      route: 'change'
    },
  ];

  public readonly iconSize = { width: 48, height: 48 }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
