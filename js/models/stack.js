class Stack {
    constructor() {
      this.size = 0;
      this.last = null;
    }
  
    insert(element) {
      const newNode = new Node(element);
      newNode.setPrev(this.last);
      this.last = newNode;
      this.size++;
    }
  
    pop() {
      if (this.size !== 0) {
        const num = this.last.getElement();
        this.last = this.last.getPrev();
        this.size--;
        return num;
      }
      return -1;
    }
  
    peek() {
      return this.size === 0 ? -1 : this.last.getElement();
    }
  
    length() {
      return this.size;
    }
  
    isEmpty() {
      return this.size === 0;
    }
}

  
