import PriorityQueue from "../structure/PriorityQueue";

function heuristic(a, b) {
  let [xa, ya] = a;
  let [xb, yb] = b;
  return Math.abs(xa - xb) + Math.abs(ya - yb);
}

export function astar(grid, start, target) {
  let frontier = new PriorityQueue();
  frontier.enqueue(start, 0);
  let cameFrom = {};
  cameFrom[start] = null;
  let costSoFar = {};
  costSoFar[start] = 0;
  let visitedSquaresInOrder = [start];

  while(!frontier.empty()) {
    let current = frontier.dequeue();

    if(grid.isWall(current.id.toString())) continue;

    if(current.id === target) break;

    grid.neighbors(current.id).forEach(next => {
      let newCost = costSoFar[current.id] + grid.cost(current.id, next);
      if(!costSoFar[next] || newCost < costSoFar[next]) {
        costSoFar[next] = newCost;
        let targetCoords = grid.fromId(target);
        let nextCords = grid.fromId(next);
        let priority = newCost + heuristic(targetCoords, nextCords);
        frontier.enqueue(next, priority);
        cameFrom[next] = current.id;
        visitedSquaresInOrder.push(next);
      }
    });
  }
  
  let current = target;
  let shortestPath = [];
  if(!cameFrom[current]) return {visitedSquaresInOrder, shortestPath};
  while(current !== start) {
    shortestPath.push(current);
    current = cameFrom[current];
  }
  shortestPath.push(start);
  shortestPath.reverse();
  console.log("vvv", visitedSquaresInOrder)
  return {visitedSquaresInOrder, shortestPath};
}