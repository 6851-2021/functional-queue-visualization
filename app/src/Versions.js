import React from 'react';
import './App.css';
import { Queue } from './functional';

class Versions extends React.Component {

    render() {
        const cur = this.props.cur;
        let versions = [];
        let ancs = [];
        let temp = this.props.parents[cur];
        while (temp !== -1) {
            ancs.push(temp);
            temp = this.props.parents[temp];
        }

        for (let i = 0; i < this.props.queues.length; i++) {
            const q = this.props.queues[i];
            const qelems = Queue.listAllElements(q);
            const parent = this.props.parents[i];

            let code;            
            const left_classes = ( i === cur ? " current-queue" : "") + (ancs.includes(i) ? " anc-queue" : "");
            const right_classes = (ancs.includes(i) || i === cur ? " anc-queue" : "");
            const left_queue = <span className={left_classes}>Q<sub>{i}</sub></span>;
            const right_queue = <span className={right_classes}>Q<sub>{parent}</sub></span>;
            if (parent === -1) {
                code = <> {left_queue} = EmptyQueue() </>
            } else if (Queue.size(this.props.queues[parent]) < Queue.size(q)) {
                code = <> {left_queue} = Enqueue({right_queue}, {qelems[qelems.length - 1]}) </>
            } else {
                code = <> {left_queue} = Dequeue({right_queue}) </>
            }

            const spanClass = "version-ref" + (i === cur || ancs.includes(i)  ? " current-version": "");

            const fakeqelems = qelems.slice(1, qelems.length);
            let qelems_list = fakeqelems.join(", ");
            if (qelems.length > 6) {
                const L1 = fakeqelems.slice(0,2);
                const L2 = fakeqelems.slice(fakeqelems.length - 3, fakeqelems.length);
                qelems_list = L1.join(", ") + ", ... , " + L2.join(", ");
            }

            let qelems_elem;
            if (qelems.length > 0) {
                qelems_elem = (<>// has elements <b>{qelems[0]}</b>{(qelems.length > 1) ? ", " : ""}{qelems_list}</>)
            } else {
                qelems_elem = "// is empty";
            }

            const version =
                <div key={i} id={"version_" + i}>
                    <code className={spanClass} onClick={() => this.props.setVersion(i)}>
                        > {code} <span style={{color: "grey"}}> {(i === cur || ancs.includes(i)) && qelems_elem}</span>
                    </code>
                </div>;
            versions.push(version);
        }
        return (
            <div id="versions-div">
                {versions}
            </div>
        );
    }

    componentDidUpdate() {
        if (this.props.cur === this.props.queues.length - 1 && this.props.queues.length !== this.prevLength) {
            const element = document.getElementById("version_" + this.props.cur);
	    this.prevLength = this.props.queues.length;
            element.parentNode.scrollTop = element.offsetTop;
        }
    }

}


export { Versions }
