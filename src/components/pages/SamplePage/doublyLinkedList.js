class Node {
  constructor(value) {
    this.data = value;
    this.next = null;
    this.previous = null;
  }
}

export default class DoublyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  print = () => {
    let currentnode = this.head;
    let count = 0;
    console.log('Print List')// eslint-disable-line
    while (count < this.length) {
      if (currentnode != null) {
       console.log(currentnode.data);// eslint-disable-line
      }
      currentnode = currentnode.next;
      count += 1;
    }
  }

  add = (value, position) => {
    const node = new Node(value);
    if (this.length) {
      if (position === 0) {
        node.next = this.head;
        this.head.previous = node;
        this.head = node;
      } else if (position === this.length) {
        this.tail.next = node;
        node.previous = this.tail;
        this.tail = node;
      } else {
        let currentnode = this.head;
        let count = 0;
        while (count < position - 1) {
          currentnode = currentnode.next;
          count += 1;
        }
        const nextcurr = currentnode.next;
        node.next = nextcurr;
        nextcurr.previous = node;
        currentnode.next = node;
        node.previous = currentnode;
      }
    } else {
      this.head = node;
      this.tail = node;
    }
    this.length += 1;
    return node;
  }

  remove = (position) => {
    if (position === 1) {
      const curr = this.head.next;
      this.head = this.head.next;
      curr.previous = null;
    } else if (position === this.length) {
      this.tail = this.tail.previous;
      this.tail.next = null;
    } else {
      let currentnode = this.head;
      let count = 0;
      while (count < position - 1) {
        currentnode = currentnode.next;
        count += 1;
      }
      const nextnode = currentnode.next;
      const previousnode = currentnode.previous;
      previousnode.next = nextnode;
      nextnode.previous = previousnode;
      currentnode = null;
    }
    this.length -= 1;
    return 'deleted';
  }

  getNodeAt = (position) => {
    let currentnode = this.head;
    let count = 0;
    while (count < position - 1) {
      currentnode = currentnode.next;
      count += 1;
    }
    return currentnode;
    console.log('The node value is ' + currentnode.data);// eslint-disable-line
  }
}
