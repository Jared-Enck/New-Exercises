/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0

    for (let val in vals) this.push(vals[val]);
  }
  logList() {
    console.log(`head: ${this.head.val} | tail: ${this.tail.val} | length: ${this.length}`)
    console.log('Items:')
    let cur = this.head
    while(cur) {
      console.log(cur.val)
      cur = cur.next
    }
  }

  /** _get(idx): retrieve node at idx. */

  _get(idx) {
    let cur = this.head;
    let count = 0;

    while (cur !== null && count != idx) {
      count += 1;
      cur = cur.next;
    }

    return cur;
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val)
    if (this.head === null) this.head = newNode
    if (this.tail !== null) this.tail.next = newNode
    this.tail = newNode
    this.length ++
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val)
    if (this.head === null) this.tail = newNode
    if (this.head !== null) newNode.next = this.head
    this.head = newNode
    this.length ++
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.head === null) throw new Error("No items in list.");
    let removed;
    if (this.length === 1) {
      removed = this.head
      this.head = null
      this.tail = null
    }
    let current = this.head
    while (current !== null) {
      if (current.next === this.tail) {
        removed = this.tail
        this.tail = current        
      }
      current = current.next
    }
    this.length --
    return removed.val
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.head === null) throw new Error("No items in list.")
    let removed;
    if (this.length === 1) {
      removed = this.head
      this.head = null
      this.tail = null
    } else {
      removed = this.head
      this.head = this.head.next
    }
    this.length --
    return removed.val
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx > this.length - 1 || idx < 0) {
      throw new Error('Invalid index.')
    }

    return this._get(idx).val
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx > this.length - 1 || idx < 0) {
      throw new Error('Invalid index.')
    }

    let cur = this._get(idx)
    cur.val = val
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) {
      throw new Error('Invalid index.')
    }    
    if (idx === 0) return this.unshift(val)
    if (idx === this.length) return this.push(val)

    const newNode = new Node(val)
    const prevNode = this._get(idx-1)
    newNode.next = prevNode.next
    prevNode.next = newNode
    this.length ++
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx > this.length -1 || idx < 0) {
      throw new Error('Invalid index.')
    }    
    if (idx === 0) return this.shift()
    if (idx === this.length -1) return this.pop()

    const prevNode = this._get(idx-1)
    const cur = this._get(idx)
    const removed = cur
    prevNode.next = cur.next
    this.length --
    return removed.val
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) {
      return 0
    }
    let total = 0
    let count = 0
    let current = this.head
    while(current) {
      total += current.val
      count ++
      current = current.next
    }
    return total / count
  }
}

module.exports = LinkedList;
