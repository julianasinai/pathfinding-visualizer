export function bfs(grid, start, target) {
  let frontier = [start];
  let cameFrom = {};
  cameFrom[start] = null;
  let visitedSquaresInOrder = [start]
  
  while(!(frontier.length === 0)) {
    let current = frontier.shift();

    if(grid.isWall(current.toString())) continue;
    
    if(current === target) break;

    grid.neighbors(current).forEach(next => {
      if(!cameFrom[next]) {
        frontier.push(next);
        cameFrom[next] = current;
        visitedSquaresInOrder.push(next)
      }
    });
  }
  return visitedSquaresInOrder;
  //Retornar cameFrom depois
}