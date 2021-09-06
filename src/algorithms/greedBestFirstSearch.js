import PriorityQueue from "../structure/PriorityQueue";

function heuristic(a, b) {
  let [xa, ya] = a;
  let [xb, yb] = b;
  return Math.abs(xa - xb) + Math.abs(ya - yb);
}

export function greedBestFirstSearch(grid, start, target) {
  let frontier = new PriorityQueue();
  frontier.enqueue(start, 0);
  let cameFrom = {};
  cameFrom[start] = null;
  let visitedSquaresInOrder = [start];

  while(!frontier.empty()) {
    let current = frontier.dequeue();

    if(grid.isWall(current.id.toString())) continue;

    if(current.id === target) break;

    grid.neighbors(current.id).forEach(next => {
      if(!cameFrom[next]) {
        let targetCoords = grid.fromId(target);
        let nextCords = grid.fromId(next);
        let priority = heuristic(targetCoords, nextCords);
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