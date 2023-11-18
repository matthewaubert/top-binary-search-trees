// create a new node in a binary search tree
// with a 'data' property, and 'left' and 'right' children
export default class Node {
  constructor(data = null, leftChild = null, rightChild = null) {
    this.data = data;
    this.leftChild = leftChild; // left child node
    this.rightChild = rightChild; // right child node
  }
}
