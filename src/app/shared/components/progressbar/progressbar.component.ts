import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {
  @Input() value: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
