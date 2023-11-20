import Node from './node.js';
import mergeSort from './merge-sort.js';
import prettyPrint from './pretty-print.js';

// create new binary search tree with appropriate functionality
export default class Tree {
  constructor(array) {
    this.root = Tree.#buildTree(array); // root node of tree
  }

  // create a balanced binary search tree
  // input: unsorted array with non-unique items
  // output: level-0 root node of BST
  static #buildTree(array) {
    // sort array and remove duplicate nums
    const uniqueArray = [...new Set(array)];
    const sortedArray = mergeSort(uniqueArray);

    // return level-0 root node
    return Tree.#buildBranch(sortedArray, 0, sortedArray.length - 1);
  }

  // recursively create branches of a balanced binary search tree
  // input: sorted array, array start index, array end index
  // output: node of BST
  static #buildBranch(array, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);

    return new Node(
      // data = array at mid index
      array[mid],
      // build leftChild recursively
      Tree.#buildBranch(array, start, mid - 1),
      // build rightChild recursively
      Tree.#buildBranch(array, mid + 1, end),
    );
  }

  // insert a new node to tree; input: node data value
  insert(value) {
    this.root = Tree.#insertRec(this.root, value);
  }

  // recursively traverse down tree nodes to insert value at leaf node
  // input: tree root, value to insert
  // output: root of modified tree
  static #insertRec(root, value) {
    // base case: if tree root is empty, set root to new node containing value
    if (root === null) return new Node(value);
    // edge case: if root.data equals value, return root
    if (root.data === value) return root;

    // recursive step: if value < root.data, recursively insert value into left subtree
    if (value < root.data) root.left = Tree.#insertRec(root.left, value);
    // recursive step: if value > root.data, recursively insert value into right subtree
    else root.right = Tree.#insertRec(root.right, value);

    return root;
  }

  // delete node that matches value from tree
  delete(value) {
    this.root = Tree.#deleteRec(this.root, value);
  }

  // recursively traverse down tree nodes to find value and delete matching node
  // input: tree root, value to delete
  // output: root of modified tree
  static #deleteRec(root, value) {
    // edge case: if root is empty (i.e. value not found), throw error
    if (root === null) throw new Error('value not found');

    // if value < root.data, delete value from left subtree
    if (value < root.data) root.left = Tree.#deleteRec(root.left, value);
    // if value > root.data, delete value from right subtree
    else if (value > root.data) root.right = Tree.#deleteRec(root.right, value);

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

  // delete and return inorder successor node
  // input: tree node
  // output: input node's inorder successor
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

  // return node with the given value; input: value
  find(value) {
    return Tree.#findRec(this.root, value);
  }

  // recursively traverse down tree nodes to find value
  // input: tree root, value to find
  // output: node that matches value
  static #findRec(root, value) {
    // edge case: if root is empty (i.e. value not found), throw error
    if (root === null) throw new Error('value not found');

    // if value < root.data, find value in left subtree
    if (value < root.data) return Tree.#findRec(root.left, value);
    // if value > root.data, find value in right subtree
    else if (value > root.data) return Tree.#findRec(root.right, value);

    // base case: if value equals root.data, return root
    if (value === root.data) return root;
  }

  // traverse tree in breadth-first level order and perform operation
  // input: optional callback - if provided, runs all nodes through cb
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
  // input: optional callback - if provided, runs all nodes thru cb
  // output: undefined if callback provided, array of node values otherwise
  inOrder(cb) {
    const values = Tree.#inOrderRec(this.root, cb);
    return cb ? undefined : values;
  }

  // recursively traverse tree depth first in-order and perform operation
  // input: root node, optional callback - if provided, runs all nodes thru cb
  // output: empty array if callback provided, array of node values otherwise
  static #inOrderRec(root, cb) {
    // base case: if root is null, return
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

  // traverse tree in depth-first in-order and perform operation
  // input: optional callback - if provided, runs all nodes thru cb
  // output: undefined if callback provided, array of node values otherwise
  preOrder(cb) {
    const values = Tree.#preOrderRec(this.root, cb);
    return cb ? undefined : values;
  }

  // recursively traverse tree depth first in-order and perform operation
  // input: root node, optional callback - if provided, runs all nodes thru cb
  // output: empty array if callback provided, array of node values otherwise
  static #preOrderRec(root, cb) {
    // base case: if root is null, return
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
}

// const emptyTree = new Tree(); // tree.root === null

const arr1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr1);

tree.insert(12);
// tree.insert(5); // should not work b/c 5 is already in tree

// tree.delete(8);
// tree.delete(7);
// tree.delete(324);
// tree.delete(342); // Error: value not found
// prettyPrint(tree.root);

// console.log(tree.find(5)); // Node { data: 5, left: null, right: Node { ... } }

// console.log(tree.levelOrder()); // [8, 4, 67, 1, 5, 9, 324, 3, 7, 23, 6345, 12]
// tree.levelOrder(el => console.log(el.data)); // prints each node data to console

// console.log(tree.inOrder()); // [1, 3, 4, 5, 7, 8, 9, 12, 23, 67, 324, 6345]
// tree.inOrder(el => console.log(el.data)); // prints each node data to console

// console.log(tree.preOrder()); // [8, 4, 1, 3, 5, 7, 67, 9, 23, 12, 324, 6345]
// tree.preOrder(el => console.log(el.data)); // prints each node data to console
