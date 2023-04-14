class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    if (!this.nodes.has(vertex)) this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex)
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    if (!v1.adjacent.has(v2)) v1.adjacent.add(v2)
    if (!v2.adjacent.has(v1)) v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let neighbor of vertex.adjacent) {
      this.removeEdge(neighbor,vertex)
    }
    this.nodes.delete(vertex)
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(
    vertex, 
    result = [],
    toVisitStack = [vertex] ,
    seen = new Set([vertex.value])
  ) {
    if (!toVisitStack.length) return result;

    let currVector = toVisitStack.pop()
    result.push(currVector.value)

    for (let neighbor of currVector.adjacent) {
      if (!seen.has(neighbor.value)) {
        seen.add(neighbor.value)
        toVisitStack.push(neighbor)
      }
    }
    return this.depthFirstSearch(currVector, result, toVisitStack, seen)
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(
    vertex, 
    result = [],
    toVisitQueue = [vertex] ,
    seen = new Set([vertex.value])
  ) {
    if (!toVisitQueue.length) return result;

    let currVector = toVisitQueue.shift()
    result.push(currVector.value)

    for (let neighbor of currVector.adjacent) {
      if (!seen.has(neighbor.value)) {
        seen.add(neighbor.value)
        toVisitQueue.push(neighbor)
      }
    }
    return this.breadthFirstSearch(currVector, result, toVisitQueue, seen)
  }
}

module.exports = {Graph, Node}