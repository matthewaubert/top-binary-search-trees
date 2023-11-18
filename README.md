# Binary Search Trees

This repo was made as part of <a href="https://www.theodinproject.com/lessons/javascript-binary-search-trees">The Odin Project: JavaScript course</a> in order to practice what I've learned about data structures and algorithms, particularly binary search trees.

## Assignment

Build a balanced binary search tree. Do not use duplicate values because they make it more complicated and result in trees that are much harder to balance. Therefore, be sure to always remove duplicate values or check for an existing value before inserting.

#### Build two classes or factories:

1. `Node` class/factory, containing a `data` property (for the data it stores), as well as its `left` and `right` children
1. `Tree` class/factory, which accepts an array when initialized and contains a `root` attribute, which uses the return value of `buildTree`

#### Build the following functions in the `Tree` class/factory:

1. `buildTree()` takes an array of data (e.g. [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of `Node` instances appropriately placed (with duplicates removed). It will return the level-0 root node.

1. `insert(value)` inserts a new node with the provided `value`

1. `delete(value)` deletes the node with the provided `value`

1. `find(value)` returns the note with the provided `value`

1. `levelOrder(callback)` accepts an optional callback function as a parameter. It traverses the tree in breadth-first level order and provides each node as an argument to the callback (as a result, the callback will perform its operation on each node following the order in which they are traversed). It may be implemented using iteration or recursion (try both!). It returns an array of values if no callback is provided as an argument.

1. `inOrder(callback)`, `preOrder(callback)`, `postOrder(callback)` that also accept an optional callback function as a parameter. Each of these traverse the tree in their respective depth-first order and provide each node as an argument to the callback. They return an array of values if no callback is given as an argument.

1. `height(node)` returns the height of the provided `node` ("height" being defined as the number of edges in the longest path from a given node to a leaf node)

1. `depth(node)` returns the depth of the provided `node` ("depth" being defined as the number of edges in the path from a given node to the tree's root node)

1. `isBalanced()` checks whether a tree is balanced and provides a boolean value ("balanced" being defined as a tree in which the difference between heights of the left and right subtrees of every node is not more than 1)

1. `rebalance()` rebalances an unbalanced tree. (Tip: I'll want to use a traversal method to provide a new array to the buildTree function.)

#### To tie it all together, write a simple driver script that does the following:

1. Create a binary search tree from an array of random numbers < 100. (Create a helper function that returns an array of random numbers every time it's called.)

1. Confirm that the tree is balanced by calling `isBalanced()`

1. Print out all elements in level-, pre-, post-, and in-order

1. Unbalance the tree by adding several numbers > 100

1. Confirm that the tree is unbalanced by calling `isBalanced()`

1. Balance the tree by calling `rebalance()`

1. Confirm that the tree is balanced by calling `isBalanced()`

1. Print out all elements in level-, pre-, post-, and in-order