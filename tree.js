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
  static #insertRec(root, value) {
    // base case: if tree root is empty, set root to new node containing value
    if (root === null) return new Node(value);

    // recursive step: if value < root, recursively insert value into left subtree
    if (value < root.data) root.left = Tree.#insertRec(root.left, value);
    // recursive step: if value > root, recursively insert value into right subtree
    else root.right = Tree.#insertRec(root.right, value);

    return root;
  }
}

// const emptyTree = new Tree(); // tree.root = null

const arr1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr1);
// prettyPrint(tree.root);

tree.insert(12);
prettyPrint(tree.root);
