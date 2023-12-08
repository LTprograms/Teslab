class Tree {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
        this.size++;
        this.heapifyUp();
    }

    insertNode(node, newNode) {
        if (newNode.getElement() < node.getElement()) {
            if (node.getLeft() === null) {
                node.setLeft(newNode);
            } else {
                this.insertNode(node.getLeft(), newNode);
            }
        } else {
            if (node.getRight() === null) {
                node.setRight(newNode);
            } else {
                this.insertNode(node.getRight(), newNode);
            }
        }
    }

    heapifyUp() {
        let node = this.getLastNode();
        while (node !== this.root && node.getElement() > node.getParent().getElement()) {
            this.swap(node, node.getParent());
            node = node.getParent();
        }
    }

    remove() {
        if (this.root === null) {
            return null;
        }
    
        const removedValue = this.root.getElement();
        let lastNode = this.getLastNode();
        this.swap(this.root, lastNode);
        this.removeLastNode();
        this.heapifyDown();
    
        return removedValue;
    }

    heapifyDown() {
        let node = this.root;
        while (node.getLeft() !== null) {
            let biggerChild = node.getLeft();
            if (node.getRight() !== null && node.getRight().getElement() > node.getLeft().getElement()) {
                biggerChild = node.getRight();
            }
    
            if (node.getElement() < biggerChild.getElement()) {
                this.swap(node, biggerChild);
                node = biggerChild;
            } else {
                break;
            }
        }
    }

    getLastNode() {
        if (this.root === null) {
            return null;
        }
        
        let current = this.root;
        while (current.getRight() !== null) {
            current = current.getRight();
        }
        
        return current;
    }

    swap(node1, node2) {
        const temp = node1.value;
        node1.value = node2.value;
        node2.value = temp;
    }
}
