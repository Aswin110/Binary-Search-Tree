class Node {
	constructor(data, left = null, right = null) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
}

class Tree {
	constructor(arr) {
		let sortedArray = [...new Set(arr.sort((a, b) => a - b))];
		this.root = this.buildTree(sortedArray);
	}

	isEmpty() {
		this.root === null;
	}

	buildTree(array, start = 0, end = array.length - 1) {
		if (start > end) return null;

		let mid = Math.floor((start + end) / 2);
		let root = new Node(array[mid]);

		root.left = this.buildTree(array, start, mid - 1);
		root.right = this.buildTree(array, mid + 1, end);
		return root;
	}

	insert(value, node = this.root) {
		if (node === null) {
			return new Node(value); 
		}

		if (node.data > value) {
			node.left = this.insert(value, node.left);
		} else {
			node.right = this.insert(value, node.right);
		}

		return node;
	}

	delete(value, node = this.root) {
		if ( node === null ) {
			return node;
		}

		if (node.data === value) {
			if (node.left === null && node.right === null) {
				return null;
			} 
            
			else if (node.left === null && node.right !== null) {
				return node.right;
			} 
            
			else if (node.left !== null && node.right === null) {
				return node.left;
			} 
            
			else if (node.left !== null && node.right !== null) {
				let successor = node.right;
				while (successor.left !== null) {
					let temp = successor;
					successor = successor.left;
					temp.left = successor.right;
				}
				console.log('successor' , successor, 'node ', node);
				node.data = successor.data;

			}
		}

		if (node.data > value) {
			node.left = this.delete(value, node.left);
		} else {
			node.right = this.delete(value, node.right);
		}
		return node;
	}

	find(value, node = this.root) {
		if(node.data === value) {
			return node;
		} 
 
		if (node.data > value) {
			return this.find(value, node.left);
		} else {
			return this.find(value, node.right);
		}
        
	}

	prettyPrint(node = this.root, prefix = '', isLeft = true) {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
		if (node.left !== null) {
			this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
		}
	}
}


let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// console.log(tree);
// tree.prettyPrint();
tree.insert(10);
tree.prettyPrint();
// console.log(tree.find(7));

// console.log(tree.delete(10));
// tree.prettyPrint();

// console.log(tree.delete(9));
// tree.prettyPrint();

console.log(tree.delete(8));
tree.prettyPrint();