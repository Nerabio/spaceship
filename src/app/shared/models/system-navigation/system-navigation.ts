import cytoscape, {CollectionReturnValue} from "cytoscape";

export interface INavigation {
  getCurrentPositionId(): string;
  jumpTo(id: string): void;
  getMap(): any;
  setTargetNode(id: string): void;
  getTargetNode(): string | null;

  getCytoscape(): any;
  setCytoscape(cy: any): void;
  calcPath(selectId: string): void;
}

export class SystemNavigation implements INavigation{
  private targetNodeId: string | null;
  private cytoscape: any;
  private currentPosition: string;

  constructor(currentPosition: string) {
    this.targetNodeId = null;
    this.currentPosition = currentPosition;
  }

  calcPath(selectId: string): void {
    let pathComplexityFactor = 0;
    var aStar = this.cytoscape.elements().aStar({ root: `#${this.getCurrentPositionId()}`, goal: `#${selectId}` });
    aStar.path.select();
    this.animatePath(aStar.path);

    aStar.path.forEach((item: {
      data: () => any;
      position: () => any; }
    ) => {

      // this.zoom(cy, item.position().x, item.position().y);
      pathComplexityFactor += item.data()?.weight || 0;
      console.log(item.data());
      // console.log(item.position());
    });
    console.log(pathComplexityFactor);
  }

  private animatePath(path: CollectionReturnValue): void {
    path.animate({
      style: { 'background-color': 'green' }
    }, {
      duration: 1000,
      complete: function(){
        path.animate({
          style: { 'background-color': 'grey' }
        }, {
          duration: 1000
        });
      }
    });
  }

  getCytoscape() {
    throw this.cytoscape;
  }

  setCytoscape(cy: any): void {
    this.cytoscape = cy;
  }

  public getCurrentPositionId(): string {
    return this.currentPosition;
  }

  public jumpTo(id: string): void {}
  public calcPathToId(id: string): void {}

  public getMap(): any {
    return [ // list of graph elements to start with
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
    ]
  }

  getTargetNode(): string | null {
    return this.targetNodeId;
  }

  setTargetNode(id: string): void {
    this.targetNodeId = id;
  }
}
