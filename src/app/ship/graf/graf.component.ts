import { Component, OnInit } from '@angular/core';
import  cytoscape from 'cytoscape';

@Component({
  selector: 'app-graf',
  templateUrl: './graf.component.html',
  styleUrls: ['./graf.component.scss']
})
export class GrafComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var cy = cytoscape({

      container: document.getElementById('cy'), // container to render in

      elements: [ // list of graph elements to start with
        { // node a
          data: { id: 'a', weight: 45 },
          position: { x: 100, y: 100 },
        },
        { // node b
          data: { id: 'b', weight: 55 },
          position: { x: 150, y: 150 },
        },
        {
          data: { id: 'c', weight: 45 },
          position: { x: 200, y: 200 },
        },
        {
          data:{ id: 'd'},
          position: { x: 250, y: 250 },
        },
        {
          data:{ id: 'e', weight: 85 },
          position: { x: 300, y: 300 },
        },
        { // edge ab
          data: { id: 'ab', source: 'a', target: 'b', weight: 45 },

        },
        {
          data: { id: 'cb', source: 'c', target: 'b', weight: 45 }
        },
        {
          data: { id: 'ca', source: 'c', target: 'a', weight: 45 }
        },
        {
          data:{ id: 'ad', source: 'a', target: 'd', weight: 45}
        },
        {
          data:{ id: 'ce', source: 'c', target: 'e', weight: 45}
        }
      ],

      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(id)'
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
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


    cy.on('tap', 'node', function(evt){
      var node = evt.target;
      console.log( 'tapped ' + node.id() );
      console.log(node.data());
      // cy.center( node );
    });

    // cy.nodes().positions(function( node, i ){
    //   return {
    //     x: i * Math.floor(Math.random() * 200),
    //     y: i * 100 //Math.floor(Math.random() * 100)
    //   };
    // });

    cy.nodes().forEach(function( ele ){
      console.log( ele.id() );
    });

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


    var aStar = cy.elements().aStar({ root: "#a", goal: "#e" });

    aStar.path.select();

    aStar.path.animate({
      style: { 'background-color': 'cyan' }
    }, {
      duration: 2000,
      complete: function(){
        console.log('Animation complete');
      }
    });

    aStar.path.forEach(item => {

      // this.zoom(cy, item.position().x, item.position().y);
      console.log(item.data());
      console.log(item.position());
    })
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
