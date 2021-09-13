import { Component, OnInit } from '@angular/core';
import  cytoscape from 'cytoscape';
import {SpaceService} from "../../shared/services/space.service";
import {style} from "@angular/animations";

@Component({
  selector: 'app-graf',
  templateUrl: './graf.component.html',
  styleUrls: ['./graf.component.scss']
})
export class GrafComponent implements OnInit {

  constructor(private spaceService: SpaceService) { }

  ngOnInit(): void {
    const ship = this.spaceService.currentShip;
    const systemNavigation = ship.getSystemNavigation();
    const mapNavigation = systemNavigation?.getMap();



    var cy = cytoscape({
      container: document.getElementById('cy'), // container to render in
      elements: mapNavigation,

      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
           // 'background-color': '#666',
            'background-image': 'https://st2.depositphotos.com/4329009/10418/v/950/depositphotos_104188912-stock-illustration-%D0%BA%D1%80%D0%B5%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%B0%D1%8F-%D0%BA%D0%BE%D0%BD%D1%86%D0%B5%D0%BF%D1%86%D0%B8%D1%8F-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%8B%D0%B9-%D0%BD%D0%B0%D0%B1%D0%BE%D1%80-%D1%81%D0%B2%D0%B5%D1%82%D1%8F%D1%89%D0%B8%D1%85%D1%81%D1%8F.jpg',
            'label': 'data(id)',
            'color': '#fff',
            'background-fit': 'contain'
          }
        },
        {
          selector: '.currentPosition',
          css: {
            'border-width': '2px',
            'border-style': 'solid',
            'border-color': '#ffd600',
          }
        },
        {
          selector: '.targetPosition',
          css: {
            'border-width': '2px',
            'border-style': 'solid',
            'border-color': 'green',
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 1,
            'line-color': '#b1d2ff',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        }
      ],

      layout: {
        name: 'grid',
        rows: 3
      }

    });

    ship.getSystemNavigation()?.setCytoscape(cy);

    cy.on('tap', 'node', function(evt) {
      // clear class
      cy.nodes().forEach(n => {n.removeClass('targetPosition');})
      var node = evt.target;
      console.log( 'tapped ' + node.id() );
      //console.log(node.data());
      node.addClass('targetPosition');
      // node.animate({style: { backgroundColor: 'red' }});
      systemNavigation?.calcPath(node.id());
      // cy.center( node );
    });



      const currentPosition = cy.nodes('#' + systemNavigation?.getCurrentPositionId());
      console.log(currentPosition);
      if (currentPosition){
        currentPosition.addClass('currentPosition');
      }


    // cy.nodes().positions(function( node, i ){
    //   return {
    //     x: i * Math.floor(Math.random() * 200),
    //     y: i * 100 //Math.floor(Math.random() * 100)
    //   };
    // });

    // cy.nodes().forEach(function( ele ){
    //   console.log( ele.id() );
    // });

    // cy.add({
    //   group: 'nodes',
    //   data: { weight: 75 },
    //   position: { x: 200, y: 200 }
    // });

    // var eles = cy.add([
    //   { group: 'nodes', data: { id: 'n0' }, position: { x: 100, y: 100 } },
    //   { group: 'nodes', data: { id: 'n1' }, position: { x: 200, y: 200 } },
    //   { group: 'edges', data: { id: 'e0', source: 'n0', target: 'n1' } }
    // ]);

    // cy.animate({
    //   pan: { x: 100, y: 100 },
    //   zoom: 2
    // }, {
    //   duration: 1000
    // });



    // var aStar = cy.elements().aStar({ root: "#a", goal: "#e" });
    //
    // aStar.path.select();
    //
    // aStar.path.animate({
    //   style: { 'background-color': 'cyan' }
    // }, {
    //   duration: 2000,
    //   complete: function(){
    //     console.log('Animation complete');
    //   }
    // });

    // aStar.path.forEach(item => {
    //
    //   // this.zoom(cy, item.position().x, item.position().y);
    //   console.log(item.data());
    //   console.log(item.position());
    // })
  }


  zoom(cy: any, x: number, y: number): void {
    cy.animate({
      pan: { x: x, y: y },
      zoom: 2
    }, {
      duration: 500
    });
  }

}
