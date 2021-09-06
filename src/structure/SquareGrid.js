const NEIGHBORS_LOCATION = [[1,0], [-1,0], [0,-1], [0,1]];//Right, Left, Top, Bottom

class Graph {
  constructor(numNodes) {
    this.numNodes = numNodes;
    this.edges = {};
    this.weights = {};

    for(let id = 0; id < numNodes; id++) {
      this.edges[id] = [];
      this.weights[id] = 1;
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
        let neighbors = NEIGHBORS_LOCATION;
        if( (x + y) % 2 === 0) neighbors.reverse();
        neighbors.forEach((dir) => {
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

  addWall(id) {
    this.walls.add(id);
  }

  removeWall(id) {
    this.walls.delete(id);
  }
  
  neighbors(id) {
    return this.edges[id]
  };

  cost(fromId, toId) {
    let [xa, ya] = this.fromId(fromId);
    let [xb, yb] = this.fromId(toId);
    let adjust = 0
    if((xa + xb) % 2 === 0 && xb !== xa) adjust = 1;
    if((xa + xb) % 2 === 1 && yb !== ya) adjust = 1;
    
    return this.weights[toId] + 0.001*adjust;
  };

  setSquareWeight(id, weight) {
    this.weights[id] = weight
  };
}