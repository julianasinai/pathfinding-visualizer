export default class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(id, priority) {
    let newNode = new Node(id, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    let current = this.values.length - 1;
    const currentValue = this.values[current];
    while(current > 0) {
      let parent = Math.floor((current - 1)/2);
      let parentValue = this.values[parent];
      if( currentValue.priority >= parentValue.priority) break;
      this.values[parent] = currentValue;
      this.values[current] = parentValue;
      current = parent
    }
  }

  dequeue() {
    const min = this.values[0]
    const end = this.values.pop();
    this.values[0] = end;
    this.percolateDown();
    return min;
  }

  percolateDown() {
    let current = 0
    const length = this.values.length - 1;
    const currentValue = this.values[0];
    while(true) {
      let leftChild = 2*current + 1;
      let rightChild = 2*current + 2;
      let leftChildValue, rightChildValue;
      let swap = null;

      if(leftChild < length) {
        leftChildValue = this.values[leftChild];
        if(leftChildValue.priority < currentValue.priority) {
          swap = leftChild;
        }
      }
      if(rightChild < length) {
        rightChildValue = this.values[rightChild];
        if((swap === null && rightChildValue.priority < currentValue.priority) || (swap !== null && rightChildValue.priority < leftChildValue.priority)) {
          swap = rightChild;
        }
      }
      if(swap === null) break;
        this.values[current] = this.values[swap];
        this.values[swap] = currentValue;
        current = swap;
    }
  }

  empty() {
    return !this.values;
  }
}

class Node {
  constructor(id, priority) {
    this.id = id;
    this.priority = priority;
  }
}