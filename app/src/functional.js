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

	static listAllElements(st) {
		if (st.val === null) return [];
		else return Stack.listAllElements(st.tail).concat([st.val]);
	}
}

class Queue {
	constructor(INS=new Stack(), POP=new Stack(), POPrev=new Stack(), POP2=new Stack(), INS2=new Stack(), HEAD=new Stack(), transferOps=0) {
		this.INS = INS;
		this.POP = POP;
		this.POPrev = POPrev;
		this.POP2 = POP2;
		this.INS2 = INS2;
		this.HEAD = HEAD;
		this.transferOps = transferOps;
	}

	static push(q, val) {
		q = Queue.passive(q);
		if (q.transferOps === 0) {
			if (Stack.empty(q.INS) && Stack.empty(q.POP)) { // special case: we place first element straight into POP. can we get rid of this?
				var newPOP = Stack.push(q.POP, val);
				return new Queue(q.INS, newPOP);
			}
			var newINS = Stack.push(q.INS, val);
			return new Queue(newINS, q.POP);
		}
		else {
			var newINS2 = Stack.push(q.INS2, val);
			return new Queue(q.INS, q.POP, q.POPrev, q.POP2, newINS2, q.HEAD, q.transferOps);
		}
	}

	static pop(q) {
		q = Queue.passive(q);
		if (q.transferOps === 0) {
			var newPOP = Stack.tail(q.POP);
			return new Queue(q.INS, newPOP);
		}
		else {
			var newTransferOps = q.transferOps - 1;
			var newHEAD = Stack.tail(q.HEAD);
			q = new Queue(q.INS, q.POP, q.POPrev, q.POP2, q.INS2, newHEAD, newTransferOps);
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
			var newTransferOps = q.transferOps - 1;
			if (!Stack.empty(q.INS)) { // first n operations
				var newINS = Stack.tail(q.INS);
				var newPOP2 = Stack.push(q.POP2, Stack.head(q.INS));
				q = new Queue(newINS, q.POP, q.POPrev, newPOP2, q.INS2, q.HEAD, newTransferOps);
				var newPOP = Stack.tail(q.POP);
				var newPOPrev = Stack.push(q.POPrev, Stack.head(q.POP));
				q = new Queue(q.INS, newPOP, newPOPrev, q.POP2, q.INS2, q.HEAD, newTransferOps);
			}
			else { // remaining n - d operations
				var newPOPrev = Stack.tail(q.POPrev);
				var newPOP2 = Stack.push(q.POP2, Stack.head(q.POPrev));
				q = new Queue(q.INS, q.POP, newPOPrev, newPOP2, q.INS2, q.HEAD, newTransferOps);
			}
			if (q.transferOps === 0) {
				q = Queue.endTransfer(q);
			}
		}
		return q;
	}

	static startTransfer(q) {
		var newTransferOps = 2 * Stack.size(q.POP);
		var newHEAD = q.POP;
		return new Queue(q.INS, q.POP, q.POPrev, q.POP2, q.INS2, newHEAD, newTransferOps); // handle details about when passive runs.
	}

	static endTransfer(q) {
		var newPOP = q.POP2;
		var newINS = q.INS2;
		return new Queue(newINS, newPOP);
	}

	static print(q) {
		console.log("INS:", Stack.listAllElements(q.INS));
		console.log("POP:", Stack.listAllElements(q.POP));
		console.log("POPrev:", Stack.listAllElements(q.POPrev));
		console.log("POP2:", Stack.listAllElements(q.POP2));
		console.log("INS2:", Stack.listAllElements(q.INS2));
		console.log("HEAD:", Stack.listAllElements(q.HEAD));
		console.log("Transfer Ops:", q.transferOps);
	}


}

// q = new Queue();
// push = (val) => {console.log("pushing", val); q = Queue.push(q, val); /*Queue.print(q);*/ console.log();};
// head = () => {console.log("head"); console.log(Queue.head(q)); console.log();};
// pop = () => {console.log("popping"); q = Queue.pop(q); /*Queue.print(q);*/ console.log();};

// push(3);
// head(); // 3
// pop();
// push(5);
// push(7);
// push(9);
// push(11);
// head(); // 5
// pop();
// head(); //7
// pop();
// push(12); 
// head(); // 9
// push(15);
// head(); // 9
// pop();
// head(); // 11
// pop();
// head(); //12
// pop();
// head(); // 15

export {Queue}