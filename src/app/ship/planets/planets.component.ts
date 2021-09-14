import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  private body: HTMLElement | null | undefined;
  private universe: HTMLElement | null | undefined;
  private solarsys: HTMLElement | null | undefined;

  constructor() { }

  // setView(view: string): void {
  //   //this.universe?.classList.remove();
  //   this.universe?.classList.add(view);
  // }

  ngOnInit(): void {
    // this.body = document.body;
    // this.universe = document.getElementById('universe');
    // this.solarsys = document.getElementById('solar-system');

    //this.body.classList.remove('view-2D', 'opening');
    // this.body.classList.add('view-3D', 'opening');
    // this.body.classList.add('view-3D');

    // $("#toggle-data").click(function(e) {
    //   body.toggleClass("data-open data-close");
    //   e.preventDefault();
    // });
    //
    // $("#toggle-controls").click(function(e) {
    //   body.toggleClass("controls-open controls-close");
    //   e.preventDefault();
    // });

    // $("#data a").click(function(e) {
    //   var ref = $(this).attr("class");
    //   solarsys.removeClass().addClass(ref);
    //   $(this).parent().find('a').removeClass('active');
    //   $(this).addClass('active');
    //   e.preventDefault();
    // });

    // $(".set-view").click(function() { body.toggleClass("view-3D view-2D"); });
    // $(".set-zoom").click(function() { body.toggleClass("zoom-large zoom-close"); });
    // $(".set-speed").click(function() { setView("scale-stretched set-speed"); });
    // $(".set-size").click(function() { setView("scale-s set-size"); });
    // $(".set-distance").click(function() { setView("scale-d set-distance"); });


  }

}
