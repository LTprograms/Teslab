class Node {
    constructor(data) {
        this._data = data;
        this._next = null;
        this._prev = null;
        this._left = null;
        this._right = null;
        this._middle = null;
    }
    /**
     * @param {Node} next
     */
    set next(next) {
        this._next = next
    }
    /**
     * @return {Node}
     */
    get next() {
        return this._next;
    }
    /**
     * @param {Node} prev
     */
    set prev(prev) {
        this._prev = prev
    }
    /**
     * @return {Node}
     */
    get prev() {
        return this._prev;
    }
    /**
     * @param {any} data
     */
    set data(data) {
        this._data = data
    }
    /**
     * @return {any}
     */
    get data() {
        return this._data;
    }
    toString() {
        return `${data.toString()}`;
    }
}

export default Node;