// create a new node for a binary search tree
// with a 'data' property, and 'left' and 'right' child nodes
export default class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left; // left child node
    this.right = right; // right child node
  }
}
