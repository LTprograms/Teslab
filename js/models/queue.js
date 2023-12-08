class Queue { //Clase kiwi
    constructor() {
      this.first = null;
      this.last = null;
      this.size = 0;
    }
  
    insert(element) {
      const newNode = new Node(element);
  
      if (!this.first) {
        this.first = this.last = newNode;
      } else {
        this.last.setNext(newNode);
        this.last = newNode;
      }
  
      this.size++;
    }
  
    pop() {
      if (this.first) {
        const element = this.first.getElement();
        this.first = this.first.getNext();
        this.size--;
        return element;
      }
      return -1;
    }
  
    peek() {
      return this.first ? this.first.getElement() : -1;
    }
  
    length() {
      return this.size;
    }
  
    isEmpty() {
      return !this.first;
    }
}

