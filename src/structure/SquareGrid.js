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
    this.walls = []
    this.neighborsLocation = [[1,0], [0,1], [-1,0], [0,-1]]//Right, Top, Left, Bottom

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let id = this.to_id(x, y);
        this.neighborsLocation.forEach((dir) => {
          let x_neighbor = x + dir[0], y_neighbor = y + dir[1];
          if (this.is_valid) {
            this.edges[id].push(this.to_id(x_neighbor, y_neighbor));
          }
        });
      }
    }
  }

  //***2D/1D mapping***
  to_id(x, y) {
    x = Math.min(this.width-1, Math.max(0, x));
    y = Math.min(this.height-1, Math.max(0, y));
    return x + y*this.width;
  }

  from_id(id) {
    return [id % this.width, Math.floor(id/this.width)];
  }
  //*******************

  is_valid(x, y) { return ((0 <= x) && (x <= this.width)) && ((0 <= y) && (y <= this.height)) }
}