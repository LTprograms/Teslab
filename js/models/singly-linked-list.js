class LinkedList {
    constructor() {
      this.first = null;
      this.last = null;
      this.size = 0;
    }
  
    insert(element, index) {
      if (index < 0 || index > this.size) {
        return;
      }
  
      if (index === 0) {
        this.prepend(element);
        return;
      }
  
      if (index === this.size - 1) {
        this.append(element);
        return;
      }
  
      const newNode = new Node(element);
  
      if (this.size === 0) {
        this.first = this.last = newNode;
      } else {
        let i = 0;
        let currentNode = this.first;
  
        while (i + 1 < index && currentNode.getNext() !== null) {
          currentNode = currentNode.getNext();
          i++;
        }
  
        newNode.setNext(currentNode.getNext());
        currentNode.setNext(newNode);
      }
  
      this.size++;
    }
  
    append(element) {
      const newNode = new Node(element);
  
      if (this.size === 0) {
        this.first = this.last = newNode;
      } else {
        this.last.setNext(newNode);
        this.last = newNode;
      }
  
      this.size++;
    }
  
    prepend(element) {
      const newNode = new Node(element);
  
      if (this.size === 0) {
        this.first = this.last = newNode;
      } else {
        newNode.setNext(this.first);
        this.first = newNode;
      }
  
      this.size++;
    }
  
    removeLast() {
      if (this.size !== 0) {
        if (this.first === this.last) {
          this.first = this.last = null;
        } else {
          let currentNode = this.first;
          while (currentNode.getNext().getNext() !== null) {
            currentNode = currentNode.getNext();
          }
          currentNode.setNext(null);
        }
        this.size--;
      }
    }
  
    removeCoincidence(element) {
        while(this.getItem(element)){
            if (this.size !== 0) {
                if (this.first.getElement() === element) {
                    this.removeFirst();
                    return;
                }
                if (this.last.getElement() === element) {
                    this.removeLast();
                    return;
                }
                let currentNode = this.first;
                while (
                    currentNode.getNext() !== null &&
                    currentNode.getNext().getElement() !== element
                ) {
                    currentNode = currentNode.getNext();
                }
                if (currentNode.getNext() !== null) {
                    currentNode.setNext(currentNode.getNext().getNext());
                    this.size--;
                }
            }
        }
    }
  
    remove(index) {
      if (index < 0 || index > this.size - 1) {
        return;
      }
      if (this.size !== 0) {
        if (index === 0) {
          this.removeFirst();
          return;
        }
        if (index === this.size - 1) {
          this.removeLast();
          return;
        }
        let currentNode = this.first;
        let i = 0;
        while (
          currentNode.getNext() !== null &&
          i + 1 < index
        ) {
          currentNode = currentNode.getNext();
          i++;
        }
        if (currentNode.getNext() !== null) {
          currentNode.setNext(currentNode.getNext().getNext());
          this.size--;
        }
      }
    }
  
    removeFirst() {
      if (this.size !== 0) {
        if (this.first === this.last) {
          this.first = this.last = null;
        } else {
          this.first = this.first.getNext();
        }
        this.size--;
      }
    }
  
    find(element) {
      if (this.size === 0) {
        return false;
      }
      if (this.first.getElement() === element || this.last.getElement() === element) {
        return true;
      }
      let currentNode = this.first;
      while (currentNode.getNext() !== null) {
        if (currentNode.getElement() === element) {
          return true;
        }
        currentNode = currentNode.getNext();
      }
      return false;
    }
  
    getItem(index) {
      if (index < 0 || index > this.size - 1) {
        console.log("Out of range");
        return -1;
      } else {
        if (index === 0) {
          return this.first.getElement();
        }
        if (index === this.size - 1) {
          return this.last.getElement();
        }
        let i = 0;
        let currentNode = this.first;
        while (currentNode.getNext() !== null && i <= index) {
          if (i === index) {
            return currentNode.getElement();
          }
          currentNode = currentNode.getNext();
          i++;
        }
        return -1;
      }
    }
  
    isEmpty() {
      return this.size === 0;
    }
  
    length() {
      return this.size;
    }
  
    indexOf(element) {
      if (this.size === 0) {
        return -1;
      } else {
        if (this.first.getElement() === element) {
          return 0;
        }
        if (this.last.getElement() === element) {
          return this.size - 1;
        }
        let currentNode = this.first;
        let i = 0;
        while (currentNode !== null) {
          if (currentNode.getElement() === element) {
            return i;
          }
          currentNode = currentNode.getNext();
          i++;
        }
        return -1;
      }
    }
  
    head() {
      return this.first ? this.first.getElement() : -1;
    }
  
    tail() {
      return this.last ? this.last.getElement() : -1;
    }
  
    min() {
      if (this.size === 0) {
        return 0;
      }
      let min = this.first.getElement();
      let currentNode = this.first;
      while (currentNode !== null) {
        if (min > currentNode.getElement()) {
          min = currentNode.getElement();
        }
        currentNode = currentNode.getNext();
      }
      return min;
    }
  
    max() {
      if (this.size === 0) {
        return 0;
      }
      let max = this.first.getElement();
      let currentNode = this.first;
      while (currentNode !== null) {
        if (max < currentNode.getElement()) {
          max = currentNode.getElement();
        }
        currentNode = currentNode.getNext();
      }
      return max;
    }
}
