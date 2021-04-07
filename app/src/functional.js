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

	static push(q, val) {
		console.log(q);
		q = Queue.passive(q);
		console.log(q);
		let newSize = q.size + 1;
		if (q.transferOps === 0) {
			if (Stack.empty(q.INS) && Stack.empty(q.POP)) { // special case: we place first element straight into POP. can we get rid of this?
				let newPOP = Stack.push(q.POP, val);
				return Queue.normalQueue(q.INS, newPOP, newSize);
			}
			let newINS = Stack.push(q.INS, val);
			return Queue.normalQueue(newINS, q.POP, newSize);
		}
		else {
			let newINS2 = Stack.push(q.INS2, val);
			return new Queue(q.INS, q.POP, q.POPrev, q.POP2, newINS2, q.HEAD, q.transferOps, newSize);
		}
	}

	static pop(q) {
		q = Queue.passive(q);
		let newSize = q.size - 1;
		if (q.transferOps === 0) {
			let newPOP = Stack.tail(q.POP);
			return Queue.normalQueue(q.INS, newPOP, newSize);
		}
		else {
			let newTransferOps = q.transferOps - 1;
			let newHEAD = Stack.tail(q.HEAD);
			q = new Queue(q.INS, q.POP, q.POPrev, q.POP2, q.INS2, newHEAD, newTransferOps, newSize);
			if (q.transferOps === 0) q = Queue.endTransfer(q);
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

	static passive(q) {
		if (q.transferOps === 0 && Stack.size(q.INS) === Stack.size(q.POP)) {
			q = Queue.startTransfer(q);
		}
		if (q.transferOps > 0) {
			let newTransferOps = q.transferOps - 1;
			if (!Stack.empty(q.INS)) { // first n operations
				let newINS = Stack.tail(q.INS);
				let newPOP2 = Stack.push(q.POP2, Stack.head(q.INS));
				q = new Queue(newINS, q.POP, q.POPrev, newPOP2, q.INS2, q.HEAD, newTransferOps, q.size);
				let newPOP = Stack.tail(q.POP);
				let newPOPrev = Stack.push(q.POPrev, Stack.head(q.POP));
				q = new Queue(q.INS, newPOP, newPOPrev, q.POP2, q.INS2, q.HEAD, newTransferOps, q.size);
			}
			else { // remaining n - d operations
				let newPOPrev = Stack.tail(q.POPrev);
				let newPOP2 = Stack.push(q.POP2, Stack.head(q.POPrev));
				q = new Queue(q.INS, q.POP, newPOPrev, newPOP2, q.INS2, q.HEAD, newTransferOps, q.size);
			}
			if (q.transferOps === 0) {
				q = Queue.endTransfer(q);
			}
		}
		return q;
	}

	static startTransfer(q) {
		let newTransferOps = 2 * Stack.size(q.POP);
		let newHEAD = q.POP;
		return new Queue(q.INS, q.POP, q.POPrev, q.POP2, q.INS2, newHEAD, newTransferOps, q.size); // handle details about when passive runs.
	}

	static endTransfer(q) {
		let newPOP = q.POP2;
		let newINS = q.INS2;
		return Queue.normalQueue(newINS, newPOP, q.size);
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

export { Stack, Queue }
