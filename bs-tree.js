import Node from './bst-node.js';
import mergeSort from './merge-sort.js';

// create new balanced binary search tree
// with 'root' property and appropriate functionality
export default class Tree {
  constructor(array) {
    this.root = Tree.#buildTree(array); // root node of tree
  }

  // create a new balanced binary search tree
  // input: unsorted array with non-unique integers
  // output: level-0 root node of BST
  static #buildTree(array) {
    // sort array and remove duplicate nums
    const uniqueArray = [...new Set(array)];
    const sortedArray = mergeSort(uniqueArray);

    // return level-0 root node
    return Tree.#buildSubtree(sortedArray);
  }

  // helper func to recursively create subtrees of a balanced binary search tree
  // input: sorted array, array start index, array end index
  // output: root node of subtree
  static #buildSubtree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);

    return new Node(
      // data = array at mid index
      array[mid],
      // build leftChild recursively
      Tree.#buildSubtree(array, start, mid - 1),
      // build rightChild recursively
      Tree.#buildSubtree(array, mid + 1, end),
    );
  }

  // insert a new node into tree
  // input: value to insert, tree root (defaults to level-0 root)
  // output: root of modified tree
  insert(value, root = this.root) {
    // base case: if tree root is empty, set root to new node containing value
    if (root === null) return new Node(value);
    // edge case: if root.data equals value, return root
    if (root.data === value) return root;

    // recursive step: if value < root.data, insert value into left subtree
    // recursive step: if value > root.data, insert value into right subtree
    value < root.data
      ? (root.left = this.insert(value, root.left))
      : (root.right = this.insert(value, root.right));

    return root;
  }

  // delete from tree node that matches value
  // input: value to delete, tree root (defaults to level-0 root)
  // output: root of modified tree
  delete(value, root = this.root) {
    // edge case: if root is empty (i.e. value not found), throw error
    if (root === null) throw new Error('value not found');

    // recursive step: if value < root.data, delete value from left subtree
    if (value < root.data) root.left = this.delete(value, root.left);
    // recursive step: if value > root.data, delete value from right subtree
    else if (value > root.data) root.right = this.delete(value, root.right);

    // base case: if value equals root.data
    if (value === root.data) {
      // if root is leaf node, return null
      if (root.left === null && root.right === null) return null;
      // else if root has only left child, delete root node and return left child
      else if (root.right === null) return root.left;
      // else if root has only right child, delete root node and return right child
      else if (root.left === null) return root.right;
      // else root has both children
      // set root data to inorder successor data, delete inorder successor
      root.data = Tree.#findDeleteInorderSuccessor(root).data;
    }

    return root;
  }

  // helper func to delete and return given node's inorder successor node
  static #findDeleteInorderSuccessor(node) {
    let parent = node;
    let successor = node.right;
    // while there is a left child:
    while (successor.left !== null) {
      parent = successor; // reassign parent
      successor = successor.left; // traverse to left child
    }

    // reassign parent left child to successor right child (deleting successor)
    parent.left = successor.right;

    return successor;
  }

  // find and return node with the given value
  // input: value to find, tree root (defaults to level-0 root)
  // output: node that matches value
  find(value, root = this.root) {
    // edge case: if root is empty (i.e. value not found), throw error
    if (root === null) throw new Error('value not found');

    // recursive step: if value < root.data, find value in left subtree
    if (value < root.data) return this.find(value, root.left);
    // recursive step: if value > root.data, find value in right subtree
    else if (value > root.data) return this.find(value, root.right);

    // base case: if value equals root.data, return root
    if (value === root.data) return root;
  }

  // traverse tree in breadth-first level order and perform operation
  // input: optional callback (if provided, runs all nodes thru cb)
  // output: undefined if callback provided, array of node values otherwise
  levelOrder(cb) {
    if (this.root === null) return; // edge case: if tree is empty, return

    const q = [this.root]; // init queue to root node
    const values = [];

    // while there is at least one discovered node
    while (q.length > 0) {
      const current = q.shift(); // dequeue current from q
      // if cb, run on current; else, push current.data to values array
      cb ? cb(current) : values.push(current.data);
      // enqueue current children
      if (current.left) q.push(current.left);
      if (current.right) q.push(current.right);
    }

    // if cb, return nothing; else, return values array
    return cb ? undefined : values;
  }

  // traverse tree in depth-first in-order and perform operation
  // input: optional callback (if provided, runs all nodes thru cb)
  // output: undefined if callback provided, array of node values otherwise
  inOrder(cb) {
    const values = Tree.#inOrderRec(this.root, cb);
    return cb ? undefined : values;
  }

  // helper func to recursively traverse tree in depth-first in-order and perform operation
  // input: root node, optional callback (if provided, runs all nodes thru cb)
  // output: empty array if callback provided, array of node values otherwise
  static #inOrderRec(root, cb) {
    // base case: if root is null, return empty array
    if (root === null) return [];

    const values = [];

    // recursive step: inOrder traverse left subtree
    values.push(...Tree.#inOrderRec(root.left, cb));
    // visit center node
    cb ? cb(root) : values.push(root.data);
    // recursive step: inOrder traverse right subtree
    values.push(...Tree.#inOrderRec(root.right, cb));

    // if cb, return nothing; else, return values array
    return values;
  }

  // traverse tree in depth-first pre-order and perform operation
  // input: optional callback (if provided, runs all nodes thru cb)
  // output: undefined if callback provided, array of node values otherwise
  preOrder(cb) {
    const values = Tree.#preOrderRec(this.root, cb);
    return cb ? undefined : values;
  }

  // helper func to recursively traverse tree in depth-first pre-order and perform operation
  // input: root node, optional callback (if provided, runs all nodes thru cb)
  // output: empty array if callback provided, array of node values otherwise
  static #preOrderRec(root, cb) {
    // base case: if root is null, return empty array
    if (root === null) return [];

    const values = [];

    // visit center node
    cb ? cb(root) : values.push(root.data);
    // recursive step: inOrder traverse left subtree
    values.push(...Tree.#preOrderRec(root.left, cb));
    // recursive step: inOrder traverse right subtree
    values.push(...Tree.#preOrderRec(root.right, cb));

    // if cb, return nothing; else, return values array
    return values;
  }

  // traverse tree in depth-first post-order and perform operation
  // input: optional callback (if provided, runs all nodes thru cb)
  // output: undefined if callback provided, array of node values otherwise
  postOrder(cb) {
    const values = Tree.#postOrderRec(this.root, cb);
    return cb ? undefined : values;
  }

  // recursively traverse tree in depth-first post-order and perform operation
  // input: root node, optional callback (if provided, runs all nodes thru cb)
  // output: empty array if callback provided, array of node values otherwise
  static #postOrderRec(root, cb) {
    // base case: if root is null, return empty array
    if (root === null) return [];

    const values = [];

    // recursive step: inOrder traverse left subtree
    values.push(...Tree.#postOrderRec(root.left, cb));
    // recursive step: inOrder traverse right subtree
    values.push(...Tree.#postOrderRec(root.right, cb));
    // visit center node
    cb ? cb(root) : values.push(root.data);

    // if cb, return nothing; else, return values array
    return values;
  }

  // return height of given node (defaults to instance's level-0 root node)
  // (height: num of edges in longest path from input node to leaf node)
  height(node = this.root) {
    // base case & recursive step: find height of left & right subtrees if exist
    const leftHeight = node.left ? 1 + this.height(node.left) : 0;
    const rightHeight = node.right ? 1 + this.height(node.right) : 0;

    // return greater value of right or left subtree height
    return Math.max(leftHeight, rightHeight);
  }

  // return depth of given node in given tree root (defaults to instance's level-0 root)
  // (depth: num of edges in longest path from input node to tree's root node)
  depth(node, root = this.root) {
    // edge case: if root is empty (i.e. value not found), throw error
    if (root === null) throw new Error('node not found');

    // recursive step: if node.data < root.data, find depth of left subtree
    const leftHeight =
      node.data < root.data ? 1 + this.depth(node, root.left) : 0;
    // recursive step: if node.data > root.data, find depth of right subtree
    const rightHeight =
      node.data > root.data ? 1 + this.depth(node, root.right) : 0;

    // base case: return greater value of right or left subtree depth
    return Math.max(leftHeight, rightHeight);
  }

  // check if tree is balanced
  // (balanced: diff btw heights of left and right subtree of every node is not more than 1)
  // output: boolean value
  isBalanced() {
    // check if diff btw heights of subtrees is no more than 1
    return (
      Math.abs(this.height(this.root.left) - this.height(this.root.right)) <= 1
    );
  }

  // rebalance an unbalanced tree
  rebalance() {
    // get ordered array of values from tree
    const values = this.inOrder();
    // build new tree and set to root of this tree
    this.root = Tree.#buildTree(values);
  }
}
