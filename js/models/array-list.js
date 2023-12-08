class ArrayList {

  constructor() {
    this.array[size];
    this.size = 0;
  }

  insert(element, index) {
    if (index < 0 || index > this.size) {
      console.error("Exception: IndexOutOfBoundsException!");
      return;
    }

    this.size++;

    if (index === 0) {
      for(let i = size-2; i>=0; i++){
        this.array[i+1] = this.array[i];
      }

      this.array[0] = element;
      
    } else {
      for(let i = size-2; i>=index; i++){
        this.array[i+1] = this.array[i];
      }

      this.array[index] = element;
    }
  }

  append(element) {
    this.size++;
    this.array[size-1] = element;
  }

  prepend(element) {
    this.size++;
    for(let i = size-2; i>=0; i++){
      this.array[i+1] = this.array[i];
    }

    this.array[0] = element;
  }

  removeLast() {
    if (this.size === 0) {
      return;
    }

    this.array[size-1] = null;
    this.size--;
  }

  remove(index) {
    if (index < 0 || index >= this.size) {
      return;
    }

    if (index === 0) {
      this.removeLast();
      return;
    }
    
    this.array[index] = null;
    for(let i = index; i<this.size-1; i++){
      this.array[i] = this.array[i+1];
    }
    this.size--;

    
  }

  removeFirst() {
    if (this.size === 0) {
      return;
    }
    
    for(let i = 0; i<this.size-1; i++){
      this.array[i] = this.array[i+1];
    }

    this.array[size-1] = null;
  }

  find(element) {
    for(let i = 0; i<this.size-1; i++){
      if(element === this.array[i]){
        return true;
      }
    }
    return false;
  }

  getItem(index) {
    if (index < 0 || index >= this.size) {
      console.log("Out of range");
      return -1;
    }
    return array[index];
  }

  isEmpty() {
    return this.size === 0;
  }

  length() {
    return this.size;
  }

  sort(reverse) {
    let current = this.head;

    while (current) {
      let next = current.getNext();

      while (next) {
        if ((reverse && current.getElement() < next.getElement()) || (!reverse && current.getElement() > next.getElement())) {
          const temp = current.getElement();
          current.setElement(next.getElement());
          next.setElement(temp);
        }

        next = next.getNext();
      }

      current = current.getNext();
    }
  }

  toString() {
    if (this.index === 0) {
      return "[]";
    }

    let result = "[";
    for (let i = 0; i < this.index - 1; i++) {
      result += this.array[i] + ", ";
    }
    result += this.array[this.index - 1] + "]";
    return result;
  }

  indexOf(element) {
    index = 0;
    for(let i = 0; i<size; i++){
      if(this.array[i] === element){
        return index;
      }
      index++;
    }
    return -1;
  }

  head() {
    return !this.size === 0 ? this.array[0]: -1;
  }

  tail() {
    return !this.size === 0 ? this.array[this.size-1]: null;
  }

 
}

