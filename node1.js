// create a new node in a binary search tree
// with a 'data' property, and 'left' and 'right' children
export default class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left; // left child node
    this.right = right; // right child node
  }
}
