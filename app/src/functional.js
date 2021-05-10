class Stack {
	constructor(val=null, tail=null, size=0) {
		this.val = val;
		this.tail = tail;
		this.size = size;
	}

	static push(st, val) {
		return new Stack(val, st, st.size + 1);
	}

	static tail(st) {
		return st.tail;
	}

	static head(st) {
		return st.val;
	}

	static size(st) {
		return st.size;
	}

	static empty(st) {
		return st.size === 0;
	}

	listAllElements() {
		if (this.val === null) return [];
		else return this.tail.listAllElements().concat([this.val]);
	}
}

class Queue {
	constructor(INS, POP, POPrev, POP2, INS2, HEAD, transferOps, size) {
		this.INS = INS;
		this.POP = POP;
		this.POPrev = POPrev;
		this.POP2 = POP2;
		this.INS2 = INS2;
		this.HEAD = HEAD;
		this.transferOps = transferOps;
		this.size = size;
	}

	static normalQueue(INS, POP, size) {
		return new Queue(INS, POP, new Stack(), new Stack(), new Stack(), new Stack(), 0, size);
	}

	static emptyQueue() {
		return new Queue(new Stack(), new Stack(), new Stack(), new Stack(), new Stack(), new Stack(), 0, 0);
	}

	static push(q, val, moves) {
		q = Queue.passive(q, moves);
		let newSize = q.size + 1;
		if (q.transferOps === 0) {
			if (Stack.empty(q.INS) && Stack.empty(q.POP)) { // special case: we place first element straight into POP. can we get rid of this?
				let newPOP = Stack.push(q.POP, val); // PUSH
				q = Queue.normalQueue(q.INS, newPOP, newSize);
				moves.push({new_queue: q, move_type: "PUSH", stacks: ["POP"]});
				return q;
			}
			let newINS = Stack.push(q.INS, val); // PUSH
			q = Queue.normalQueue(newINS, q.POP, newSize);
			moves.push({new_queue: q, move_type: "PUSH", stacks: ["INS"]});
			return q;
		}
		else {
			let newINS2 = Stack.push(q.INS2, val); // PUSH
			q = new Queue(q.INS, q.POP, q.POPrev, q.POP2, newINS2, q.HEAD, q.transferOps, newSize);
			moves.push({new_queue: q, move_type: "PUSH", stacks: ["INS2"]});
			return q;
		}
	}

	static pop(q, moves) {
		q = Queue.passive(q, moves);
		let newSize = q.size - 1;
		if (q.transferOps === 0) {
			let newPOP = Stack.tail(q.POP); // POP
			q = Queue.normalQueue(q.INS, newPOP, newSize);
			moves.push({new_queue: q, move_type: "POP", stacks: ["POP"]});
			return q;
		}
		else {
			let newTransferOps = q.transferOps - 1;
			let newHEAD = Stack.tail(q.HEAD); // POP
			q = new Queue(q.INS, q.POP, q.POPrev, q.POP2, q.INS2, newHEAD, newTransferOps, newSize);
			moves.push({new_queue: q, move_type: "POP", stacks: ["HEAD"]});
			if (q.transferOps === 0) q = Queue.endTransfer(q, moves);
			return q;
		}
	}

	static head(q) {
		if (q.transferOps === 0) {
			return Stack.head(q.POP);
		}
		else {
			return Stack.head(q.HEAD);
		}
	}

	static passive(q, moves) {
		if (q.transferOps === 0 && Stack.size(q.INS) === Stack.size(q.POP) && Stack.size(q.INS) > 0) {
			q = Queue.startTransfer(q, moves);
		}
		if (q.transferOps > 0) {
			let newTransferOps = q.transferOps - 1;
			if (!Stack.empty(q.INS)) { // first n operations
				let newINS = Stack.tail(q.INS);
				let newPOP2 = Stack.push(q.POP2, Stack.head(q.INS)); // FLIP INS onto POP2
				q = new Queue(newINS, q.POP, q.POPrev, newPOP2, q.INS2, q.HEAD, newTransferOps, q.size);
				moves.push({new_queue: q, move_type: "FLIP", stacks: ["INS", "POP2"]});
				let newPOP = Stack.tail(q.POP);
				let newPOPrev = Stack.push(q.POPrev, Stack.head(q.POP)); // FLIP POP onto POPrev
				q = new Queue(q.INS, newPOP, newPOPrev, q.POP2, q.INS2, q.HEAD, newTransferOps, q.size);
				moves.push({new_queue: q, move_type: "FLIP", stacks: ["POP", "POPrev"]});
			}
			else { // remaining n - d operations
				let newPOPrev = Stack.tail(q.POPrev);
				let newPOP2 = Stack.push(q.POP2, Stack.head(q.POPrev)); // FLIP POPrev onto POP2
				q = new Queue(q.INS, q.POP, newPOPrev, newPOP2, q.INS2, q.HEAD, newTransferOps, q.size);
				moves.push({new_queue: q, move_type: "FLIP", stacks: ["POPrev", "POP"]});
			}
			if (q.transferOps === 0) {
				q = Queue.endTransfer(q, moves);
			}
		}
		return q;
	}

	static startTransfer(q, moves) {
		let newTransferOps = 2 * Stack.size(q.POP);
		let newHEAD = q.POP; // ASSIGN HEAD TO POP
		q = new Queue(q.INS, q.POP, q.POPrev, q.POP2, q.INS2, newHEAD, newTransferOps, q.size);
		moves.push({new_queue: q, move_type: "BEGIN TRANSFER", stacks: []});
		return q;
	}

	static endTransfer(q, moves) {
		let newPOP = q.POP2; // ASSIGN POP to POP2
		let newINS = q.INS2; // ASSIGN INS to INS2
		q = Queue.normalQueue(newINS, newPOP, q.size);
		moves.push({new_queue: q, move_type: "END TRANSFER", stacks: []});
		return q;
	}

	static size(q) {
		return q.size;
	}

	static listAllElements(q) {
		let elements = [];
		while (Queue.size(q) > 0) {
			elements.push(Queue.head(q));
			q = Queue.pop(q);
		}
		return elements;
	}

	static print(q) {
		console.log("INS:", q.INS.listAllElements());
		console.log("POP:", q.POP.listAllElements());
		console.log("POPrev:", q.POPrev.listAllElements());
		console.log("POP2:", q.POP2.listAllElements());
		console.log("INS2:", q.INS2.listAllElements());
		console.log("HEAD:", q.HEAD.listAllElements());
		console.log("Transfer Ops:", q.transferOps);
	}

}


// queue array thing for each operation:
// 
// list of queues for each operation, go from one to another with a simple operation, and provide what that simple operation is
//
// each actual operation, push and pop, consists of a few simple operations:
//
// pop from stack: fade out
// push from stack: basically what already happens
// swap two stacks: highlight stacks, e.g. orange and blue box
// splitting up a big operation into simple ones and doing the simple ones one-by-one: how? user should be able to control speed somehow, in the future maybe helpful messages for each simple operation?
//
// miscellaneous visual things:
// 
// alignment: left-alignment makes most sense because everything is stationary except for new element
// showing INS, POP, etc. as pointers / highlighted elements instead of labels (maybe?)
// things shouldn't contradict the "hidden model" with all the pointers and elements that ever existed (this is very vague)
//
// versions:
//
// show parent arrows somehow
// maybe look for a library that still looks minimalistic
//

export { Stack, Queue }
