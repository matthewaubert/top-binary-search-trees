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

    // if value equals root.data
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
}

// const emptyTree = new Tree(); // tree.root === null

const arr1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr1);

tree.insert(12);
// tree.insert(5); // should not work b/c 5 is already in tree

// tree.delete(8);
// tree.delete(7);
// tree.delete(324);
tree.delete(342); // Error: value not found
prettyPrint(tree.root);
