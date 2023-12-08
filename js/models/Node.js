class Node {

    //------------------------- Constructor ------------------------

    constructor(element) {
        this._element = element;
        this._next = null;
        this._prev = null;
        this._left = null;
        this._right = null;
        this._middle = null;
        this._parent = null;
    }
  
    //------------------------- Get & Set ----------------------------
  
    getElement() {
      return this._element;
    }
  
    setElement(element) {
      this._element = element;
    }
  
    getNext() {
      return this._next;
    }
  
    setNext(node) {
      this._next = node;
    }
  
    getPrev() {
      return this._prev;
    }
  
    setPrev(node) {
      this._prev = node;
    }
  
    getLeft() {
      return this._left;
    }

    setLeft(node) {
      this._left = node;
    }
  
    getRight() {
      return this._right;
    }
  
    setRight(node) {
      this._right = node;
    }
    
    getMiddle(){
        return this._middle;
    }

    setMiddle(){
        return this._middle;
    }
    
    getParent() {
      return this.parent;
    }

  }
