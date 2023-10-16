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

	//breadth search tree (BST)
	levelOrder(root = this.root) {
		if(root === null) return [];
		let results = [];
		let queue = [root];
		console.log(root);
        
      
		while (queue.length !== 0) {
			let subQueue = [];
			const n = queue.length;
      
			for (let i = 0; i < n; i++) {
				let node = queue.pop();
				subQueue.push(node.data);
				if (node.left) {
					queue.unshift(node.left);
				}
				if (node.right) {
					queue.unshift(node.right);
				}
			}
			results.push(subQueue);
		}
		console.log(results);
		return results;
	}

	levelOrderRecursive(root = this.root) {
		let result = [];
		function recc(root, level) {
			if (root === null) return [];

			if (result[level]) {
				result[level].push(root.data);
			} else {
				result[level] = [root.data];
			}
			recc(root.left, level + 1);
			recc(root.right, level + 1);
		}
		recc(root, 0);
		console.log(result);
		return result;
	}

	//depth search tree (DST) 
	inOrder(root = this.root) {
		let result = [];
		function order(root) {
			if (root === null) return;

			order(root.left);
			result.push(root.data);
			order(root.right);
		}
		order (root);
		console.log('inorder', result);
		return result;
	}

	postOrder(root = this.root) {
		let result = [];
		function order(root) {
			if (root === null) return;

			order(root.left);
			order(root.right);
			result.push(root.data);
			
		}
		order (root);
		console.log('post order', result);
		return result;
	}

	preOrder(root = this.root) {
		let result = [];
		function order(root) {
			if (root === null) return;

			result.push(root.data);
			order(root.left);
			order(root.right);
		}
		order (root);
		console.log('pre order', result);
		return result;
	}

	height(root = this.root) {
		if (root === null) return 0;

		let left = this.height(root.left);
		let right = this.height(root.right);
		if (left > right ) {
			return (left + 1);
		} else {
			return (right + 1);
		}
	}

	depth(key, root = this.root) {
		let dist = -1;
		function depthValue(root, key){
			if (root === null ) return dist;
            
			if (root.data === key ) {
				dist +=1;
			} else if (root.data > key) {
				depthValue(root.left, key);
				(dist +=1);
			} else {
				depthValue(root.right, key);
				(dist +=1);
			}
			
		}
		depthValue(root ,key);
		console.log('depth', dist);
		return dist;
	}

	isBalanced(root = this.root) {
		if (root === null ) return 0;
		let abs = Math.abs(this.height(root.left) - this.height(root.right));
		if (abs < 2) {
			return true;
		} else {
			return false;
		}
	}

    rebalance() {
        console.log('hi');
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

// console.log(tree.delete(8));
// tree.prettyPrint();

tree.levelOrder();
tree.levelOrderRecursive();
tree.inOrder();
tree.postOrder();
tree.preOrder();
console.log(tree.height());
console.log(tree.depth(5));
console.log(tree.isBalanced());
