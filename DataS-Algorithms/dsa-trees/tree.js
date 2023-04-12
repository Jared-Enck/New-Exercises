/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues(total = 0, toVisitStack = [this.root]) {
    if (!this.root) return 0;
    let current = toVisitStack.pop();
    // Base case
    if (!current) return total;

    total += current.val

    for (let child of current.children) {
      toVisitStack.push(child)
    }
    return this.sumValues(total, toVisitStack)
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens(totalEvenNums = 0, toVisitStack = [this.root]) {
    if (!this.root) return 0;
    let current = toVisitStack.pop();
    // Base case.
    if (!current) return totalEvenNums;

    if (current.val % 2 === 0) totalEvenNums ++;

    for (let child of current.children) {
      toVisitStack.push(child)
    }

    return this.countEvens(totalEvenNums, toVisitStack)
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(
    lowerBound, 
    totalGreater = 0, 
    toVisitStack = [this.root]
  ) {
    if (!this.root) return 0;
    let current = toVisitStack.pop();
    // Base case.
    if (!current) return totalGreater;

    if (current.val > lowerBound) totalGreater ++;

    for (let child of current.children) {
      toVisitStack.push(child)
    }
    return this.numGreater(lowerBound, totalGreater, toVisitStack)
  }
}

module.exports = { Tree, TreeNode };
