import Tree from './bs-tree.js';
import prettyPrint from './pretty-print.js';

// const emptyTree = new Tree(); // tree.root === null

const arr1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr1);

// tree.insert(12);
// tree.insert(5); // should not work b/c 5 is already in tree

// tree.delete(8);
// tree.delete(324);
// tree.delete(342); // Error: value not found
// prettyPrint(tree.root);

// console.log(tree.find(5)); // Node { data: 5, left: null, right: Node { ... } }

// console.log(tree.levelOrder()); // [8, 4, 67, 1, 5, 9, 324, 3, 7, 23, 6345]
// tree.levelOrder(el => console.log(el.data)); // prints each node data to console

// console.log(tree.inOrder()); // [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]
// tree.inOrder(el => console.log(el.data)); // prints each node data to console

// console.log(tree.preOrder()); // [8, 4, 1, 3, 5, 7, 67, 9, 23, 324, 6345]
// tree.preOrder(el => console.log(el.data)); // prints each node data to console

// console.log(tree.postOrder()); // [3, 1, 7, 5, 4, 23, 9, 6345, 324, 67, 8]
// tree.postOrder(el => console.log(el.data)); // prints each node data to console

// console.log(tree.height()); // 3
// console.log(tree.height(tree.root.left)); // 2
// console.log(tree.height(new Node(10))); // 0
// console.log(tree.depth(tree.root.right.right.right)); // 3
// console.log(tree.depth(tree.root.right)); // 1
// console.log(tree.depth(new Node(10))); // Error: node not found

console.log(tree.isBalanced()); // true
tree.insert(12);
tree.insert(13);
prettyPrint(tree.root);
console.log(tree.isBalanced()); // false

tree.rebalance();
prettyPrint(tree.root);
console.log(tree.isBalanced()); // true
