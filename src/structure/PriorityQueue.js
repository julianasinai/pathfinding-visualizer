export default class PriorityQueue {
  constructor() {
    this.values = [0];
    this.currentSize = 0;
  }

  enqueue(id, priority) {
    let newNode = new Node(id, priority);
    this.values.push(newNode);
    this.currentSize += 1;
    this.percolateUp(this.currentSize);
  }

  percolateUp(i) {
    while(Math.floor(i/2) > 0) {
      if(this.values[i].priority < this.values[Math.floor(i/2)].priority) {
        let tmp = this.values[Math.floor(i/2)];
        this.values[Math.floor(i/2)] = this.values[i];
        this.values[i] = tmp;
      }
      i = Math.floor(i/2)
    }
  }

  dequeue() {
    const min = this.values[1];
    this.values[1] = this.values[this.currentSize];
    this.currentSize -= 1
    this.values.pop();
    this.percolateDown(1);
    return min;
  }

  percolateDown(i) {
    while(i*2 <= this.currentSize) {
      let mc = this.minChild(i)
      if(this.values[i].priority > this.values[mc].priority) {
        let tmp = this.values[i];
        this.values[i] = this.values[mc];
        this.values[mc] = tmp;
      }
      i = mc
    } 
  }

  minChild(i) {
    if((i*2 + 1) > this.currentSize) return i*2;
    else {
      if(this.values[i*2].priority < this.values[i*2 + 1].priority) return i*2;
      else return i*2 + 1;
    }
  }

  empty() {
    return this.currentSize === 0;
  }
}

class Node {
  constructor(id, priority) {
    this.id = id;
    this.priority = priority;
  }
}