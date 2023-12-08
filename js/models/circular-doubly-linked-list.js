class DoubleCircularLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    append(element) {
        const newNode = new Node(element);

        if (!this.head) {
            this.head = newNode;
            newNode.setNext(this.head);
            newNode.setPrev(this.head);
        } else {
            const currentTail = this.head.getPrev();
            currentTail.setNext(newNode);
            newNode.setPrev(currentTail);
            newNode.setNext(this.head);
            this.head.setPrev(newNode);
        }

        this.size++;
    }

    insert(element, index) {
        if (index < 0 || index > this.size) {
            return;
        }

        const newNode = new Node(element);

        if (index === 0) {
            newNode.setNext(this.head);
            newNode.setPrev(this.head.getPrev());
            this.head.getPrev().setNext(newNode);
            this.head.setPrev(newNode);
            this.head = newNode;
        } else {
            let currentIndex = 0;
            let currentNode = this.head;

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

    removeCoincidence(element){
        while(this.getItem(element)){
            if (this.size === 0) {
                return;
            }

            if (this.head.getElement() === element) {
                this.removeFirst();

                if (this.size === 0) {
                    this.head = null;
                }

                return;
            }

            let currentNode = this.head;

            while (currentNode.getNext() !== this.head && currentNode.getNext().getElement() !== element) {
                currentNode = currentNode.getNext();
            }

            if (currentNode.getNext() !== this.head) {
                currentNode.getNext().setPrev(currentNode.getPrev());
                currentNode.getPrev().setNext(currentNode.getNext());
            }
        }
    }

    remove(index) {
        if (index < 0 || index >= this.size) {
          return;
        }
    
        if (index === 0) {
          this.removeLast();
          return;
        }
    
        let currentNode = this.head;
        let prevNode = null;
        let currentIndex = 0;
    
        while (currentIndex < index) {
          prevNode = currentNode;
          currentNode = currentNode.getNext();
          currentIndex++;
        }
    
        prevNode.setNext(currentNode.getNext());
        this.size--;
    }

    removeFirst() {
        if (this.size === 0) {
            return;
        }

        if (this.size === 1) {
            this.head = null;
        } else {
            this.head.getPrev().setNext(this.head.getNext());
            this.head.getNext().setPrev(this.head.getPrev());
            this.head = this.head.getNext();
        }

        this.size--;
    }

    find(element) {
        let currentNode = this.head;
    
        while (currentNode) {
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

        let currentIndex = 0;
        let currentNode = this.head;

        while (currentIndex < index) {
            currentNode = currentNode.getNext();
            currentIndex++;
        }

        return currentNode.getElement();
    }

    toString() {
        if (this.size === 0) {
            return "[]";
        }

        let result = [];
        let currentNode = this.head;

        do {
            result.push(currentNode.getElement());
            currentNode = currentNode.getNext();
        } while (currentNode !== this.head);

        return `[${result.join(' ')}]`;
    }
}


