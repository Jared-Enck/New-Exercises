class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val)
    if (!this.root) {
      this.root = newNode
      return this
    }
    let current = this.root

    while (current) {
      if (current.val > val) {
        if (!current.left) {
          current.left = newNode
          return this
        }
        current = current.left
      } else {
        if (!current.right) {
          current.right = newNode
          return this
        }
        current = current.right
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode
      return this
    }
    function insertHelper(node) {
      if (node.val > val) {
        if (!node.left) return node.left = newNode
        return insertHelper(node.left)
      }
      if (!node.right) return node.right = newNode
      return insertHelper(node.right)
    }
    insertHelper(this.root)
    return this
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;

    while (current) {
      if (current.val === val) return current;

      current = 
        val < current.val
          ? current.left
          : current.right;
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if (current === null) return undefined;
    if (current.val === val) return current
    if (val > current.val) {
      return this.findRecursively(val, current.right)
    }
    return this.findRecursively(val, current.left)
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const vals = []

    function dfsPreHelper(node) {
      if (!node) return;
      vals.push(node.val)
      if (node.left) dfsPreHelper(node.left)
      if (node.right) dfsPreHelper(node.right)
    }

    dfsPreHelper(this.root)
    return vals
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const vals = []

    function dfsInHelper(node) {
      if (!node) return;
      if (node.left) dfsInHelper(node.left)
      vals.push(node.val)
      if (node.right) dfsInHelper(node.right)
    }

    dfsInHelper(this.root)
    return vals
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const vals = []

    function dfsPostHelper(node) {
      if (!node) return;
      if (node.left) dfsPostHelper(node.left)
      if (node.right) dfsPostHelper(node.right)
      vals.push(node.val)
    }

    dfsPostHelper(this.root)
    return vals
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs(visited = [],toVisitQ = [this.root]) {
    if (!toVisitQ.length) return visited;
    
    let current = toVisitQ.shift()
    visited.push(current.val)

    if (current.left) toVisitQ.push(current.left)
    if (current.right) toVisitQ.push(current.right)

    return this.bfs(visited, toVisitQ)
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
