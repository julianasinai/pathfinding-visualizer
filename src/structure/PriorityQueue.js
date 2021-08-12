class MinBinaryHeap {
  constructor() {
    this.values = []
  }

  insert(element) {
    this.values.push(element);
    this.bubbleUp();
  }

  bubbleUp() {
    let current = this.values.length - 1;
    const currentValue = this.values[current];
    while(current > 0) {
      let parent = Math.floor((current - 1)/2);
      let parentValue = this.values[parent];
      if( currentValue >= parentValue) break;
      this.values[parent] = currentValue;
      this.values[current] = parentValue;
      current = parent
    }
  }

  extractMin() {
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
        if(leftChildValue < currentValue) {
          swap = leftChild;
        }
      }
      if(rightChild < length) {
        rightChildValue = this.values[rightChild];
        if(swap === null && rightChildValue < currentValue) || (swap !== null && rightChildValue < leftChildValue) {
          swap = rightChild;
        }
      }
      if(swap === null) break;
        this.values[current] = this.values[swap];
        this.values[swap] = currentValue;
        current = swap;
    }
  }
}

class MaxBinaryHeap {
  constructor(){
      this.values = [];
  }
  insert(element){
      this.values.push(element);
      this.bubbleUp();
  }
  bubbleUp(){
      let idx = this.values.length - 1;
      const element = this.values[idx];
      while(idx > 0){
          let parentIdx = Math.floor((idx - 1)/2);
          let parent = this.values[parentIdx];
          if(element <= parent) break;
          this.values[parentIdx] = element;
          this.values[idx] = parent;
          idx = parentIdx;
      }
  }
}

let heap = new MaxBinaryHeap();
heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
heap.insert(55);