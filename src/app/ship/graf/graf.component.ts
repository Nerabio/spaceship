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
          data: { id: 'a' }
        },
        { // node b
          data: { id: 'b' }
        },
        {
          data: { id: 'c' }
        },
        {
          data:{ id: 'd'}
        },
        { // edge ab
          data: { id: 'ab', source: 'a', target: 'b' },
          
        },
        {
          data: { id: 'cb', source: 'c', target: 'b' }
        },
        {
          data: { id: 'ca', source: 'c', target: 'a' }
        },
        {
          data:{ id: 'ad', source: 'a', target: 'd'}
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
        rows: 1
      }
    
    });


    cy.on('tap', 'node', function(evt){
      var node = evt.target;
      console.log( 'tapped ' + node.id() );
      cy.center( node );
    });

    cy.nodes().positions(function( node, i ){
      return {
        x: i * 200 * Math.random(),
        y: i * 180 * Math.random()
      };
    });

    cy.nodes().forEach(function( ele ){
      console.log( ele.id() );
    });

  }

}
