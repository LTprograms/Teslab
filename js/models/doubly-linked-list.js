class DoubleLinkedList {
    constructor() {
      this.first = null;
      this.last = null;
      this.size = 0;
    }
  
    insert(element, index) {
      if (index < 0 || index >= this.size) {
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
        let currentIndex = 0;
        let currentNode = this.first;
  
        while (currentIndex < index - 1) {
          currentNode = currentNode.getNext();
          currentIndex++;
        }
  
        newNode.setNext(currentNode.getNext());
        newNode.setPrev(currentNode);
        currentNode.getNext().setPrev(newNode);
        currentNode.setNext(newNode);
      }
  
      this.size++;
    }
  
    append(element) {
      const newNode = new Node(element);
  
      if (!this.first) {
        this.first = this.last = newNode;
      } else {
        newNode.setPrev(this.last);
        this.last.setNext(newNode);
        this.last = newNode;
      }
  
      this.size++;
    }
  
    prepend(element) {
      const newNode = new Node(element);
  
      if (!this.first) {
        this.first = this.last = newNode;
      } else {
        newNode.setNext(this.first);
        this.first.setPrev(newNode);
        this.first = newNode;
      }
  
      this.size++;
    }
  
    removeLast() {
        if (this.size !== 0) {
            if (this.first === this.last) {
                this.first = this.last = null;
            } else {
                this.last = this.last.getPrev();
                this.last.setNext(null);
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

                while (currentNode.getNext() && currentNode.getNext().getElement() !== element) {
                    currentNode = currentNode.getNext();
                }

                if (currentNode.getNext()) {
                    currentNode.setNext(currentNode.getNext().getNext());
                    currentNode.getNext().setPrev(currentNode);
                    this.size--;
                }
            }
        }

    }
  
    remove(index) {
      if (index < 0 || index >= this.size) {
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
  
        let currentIndex = 0;
        let currentNode = this.first;
  
        while (currentIndex < index - 1) {
          currentNode = currentNode.getNext();
          currentIndex++;
        }
  
        currentNode.setNext(currentNode.getNext().getNext());
        currentNode.getNext().setPrev(currentNode);
        this.size--;
      }
    }
  
    removeFirst() {
      if (this.size !== 0) {
        if (this.first === this.last) {
          this.first = this.last = null;
        } else {
          this.first = this.first.getNext();
          this.first.setPrev(null);
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
  
      while (currentNode.getNext()) {
        if (currentNode.getElement() === element) {
          return true;
        }
        currentNode = currentNode.getNext();
      }
  
      return false;
    }
  
    getItem(index) {
      if (index < 0 || index >= this.size) {
        console.log("Out of range");
        return -1;
      }
  
      if (index === 0) {
        return this.first.getElement();
      }
  
      if (index === this.size - 1) {
        return this.last.getElement();
      }
  
      let currentIndex = 0;
      let currentNode = this.first;
  
      while (currentIndex < index) {
        currentNode = currentNode.getNext();
        currentIndex++;
      }
  
      return currentNode.getElement();
    }
  
    isEmpty() {
      return !this.first;
    }
  
    length() {
      return this.size;
    }
  
    indexOf(element) {
      if (this.size === 0) {
        return -1;
      }
  
      if (this.first.getElement() === element) {
        return 0;
      }
  
      if (this.last.getElement() === element) {
        return this.size - 1;
      }
  
      let currentNode = this.first;
      let index = 0;
  
      while (currentNode) {
        if (currentNode.getElement() === element) {
          return index;
        }
        currentNode = currentNode.getNext();
        index++;
      }
  
      return -1;
    }
  
    head() {
      return this.first ? this.first.getElement() : -1;
    }
  
    tail() {
      return this.last ? this.last.getElement() : -1;
    }
}
