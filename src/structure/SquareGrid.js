const NEIGHBORS_LOCATION = [[1,0], [-1,0], [0,-1], [0,1]];//Right, Left, Top, Bottom

class Graph {
  constructor(numNodes) {
    this.numNodes = numNodes;
    this.edges = {};
    
    for(let id = 0; id < numNodes; id++) {
      this.edges[id] = []
    }
  }
}

export default class SquareGrid extends Graph {
  constructor(height, width) {
    super(height*width);
    this.height = height;
    this.width = width;
    this.walls = new Set();

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let id = this.toId(x, y);
        NEIGHBORS_LOCATION.forEach((dir) => {
          let x_neighbor = x + dir[0], y_neighbor = y + dir[1];
          if (this.inBounds(x_neighbor, y_neighbor) && !this.isWall(id)) {
            this.edges[id].push(this.toId(x_neighbor, y_neighbor));
          }
        });
      }
    }
  }

  /***2D/1D mapping***/
  toId(x, y) {
    x = Math.min(this.width-1, Math.max(0, x));
    y = Math.min(this.height-1, Math.max(0, y));
    return x + y*this.width;
  };

  fromId(id) {
    return [id % this.width, Math.floor(id/this.width)];
  };
  /*******************/

  inBounds(x, y) { return 0 <= x && x < this.width && 0 <= y && y < this.height };

  isWall(id) { return this.walls.has(id) };
  
  neighbors(id) {
    return this.edges[id]
  };
}
