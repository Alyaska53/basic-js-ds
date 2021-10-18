const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

module.exports = class BinarySearchTree {
  constructor() {
    this.treeNode = null;
  }

  root() {
    return this.treeNode;
  }

  add(data) {
    let newNode = new Node(data);

    if (this.treeNode === null) {
      this.treeNode = newNode;
    } else {
      this.addNode(this.treeNode, newNode);
    }
  }

  addNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.addNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.addNode(node.right, newNode);
      }
    }
  }

  has(data) {
    return (this.find(data)) ? true : false;
  }

  find(data) {
    return this.search(this.treeNode, data);
  }

  search(node, data) {
    if (node === null) return null;

    if (data < node.data) {
      return this.search(node.left, data);
    } else if (data > node.data) {
      return this.search(node.right, data)
    } else {
      return node;
    }
  }

  remove(data) {
    this.treeNode = this.removeNode(this.treeNode, data);
  }

  removeNode(node, data) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      } 
      
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      let newNode = this.findMinNode(node.right);
      
      node.data = newNode.data;
      node.right = this.removeNode(node.right, newNode.data);
      return node;
    }
  }

  findMinNode(node) {
    return (node.left === null) ? node : this.findMinNode(node.left);
  }

  min() {
    let node = this.treeNode;
    
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    let node = this.treeNode;
    
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}