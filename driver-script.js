import Tree from './bs-tree.js';
import prettyPrint from './pretty-print.js';

runDriverScript(21);

// create binary search tree with n nodes and test its functionality
function runDriverScript(n) {
  // create new bs tree from array of random integers < 100
  const ints = getRandomInts(n, 0, 100);
  console.log('creating binary search tree from random integers < 100...');
  const bsTree = new Tree(ints);
  confirmBalance(bsTree); // confirm tree is balanced
  // print out all elements in level-, pre-, post-, and in-order
  printAllOrders(bsTree);

  // unbalance tree by adding several ints > 100
  const largeInts = getRandomInts(3, 100, 500);
  console.log('adding three random integers > 100...');
  largeInts.forEach(int => bsTree.insert(int));
  confirmBalance(bsTree); // confirm tree is balanced

  // balance tree by calling rebalance()
  console.log('rebalancing...');
  bsTree.rebalance();
  confirmBalance(bsTree); // confirm tree is balanced
  // print out all elements in level-, pre-, post-, and in-order
  printAllOrders(bsTree);

  prettyPrint(bsTree.root);
}

// return n-length array of integers all btw min and max
function getRandomInts(n, min, max) {
  const array = [];
  // do this n times
  for (let i = 0; i < n; i++) {
    // push num < 100 to array
    array.push(getRandomInt(min, max));
  }

  return array;
}

// return random integer btw min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// print all orders (level-, pre-, post-, and in-) of given tree
function printAllOrders(tree) {
  console.log(
    'level-order:',
    tree.levelOrder(),
    'pre-order:',
    tree.preOrder(),
    'post-order:',
    tree.postOrder(),
    'in-order:',
    tree.inOrder(),
  );
}

// print message stating whether given tree is balanced
function confirmBalance(tree) {
  console.log(`tree is balanced? ${tree.isBalanced()}`);
}
