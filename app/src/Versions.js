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
            const parent = this.props.parents[i];

            let code;            
            const left_classes = ( i === cur ? " current-queue" : "") + (ancs.includes(i) ? " anc-queue" : "");
            const right_classes = (ancs.includes(i) || i == cur ? " anc-queue" : "");
            const left_queue = <span className={left_classes}>Q<sub>{i}</sub></span>;
            const right_queue = <span className={right_classes}>Q<sub>{parent}</sub></span>;
            if (parent == -1) {
                code = <> {left_queue} = EmptyQueue() </>
            } else if (Queue.size(this.props.queues[parent]) < Queue.size(q)) {
                const qelems = Queue.listAllElements(q);
                code = <> {left_queue} = Push({right_queue}, {qelems[qelems.length - 1]}) </>
            } else {
                code = <> {left_queue} = Pop({right_queue}) </>
            }

            const spanClass = "version-ref" + (i == cur || ancs.includes(i)  ? " current-version": "");

            const version =
                <div key={i} id={"version_" + i}>
                    <code className={spanClass} onClick={() => this.props.setVersion(i)}>
                        > {code}
                    </code>
                </div>;
            versions.push(version);
        }
        return (
            <div id="versions-div">
                {versions}
                <div style={{ float:"left", clear: "both" }}
                ref={(el) => { this.versionsEnd = el; }}></div>
            </div>
        );
    }

    componentDidUpdate() {
        if (this.props.cur == this.props.queues.length - 1) {
            const element = document.getElementById("version_" + this.props.cur);
            element.scrollIntoView({behavior: 'smooth'});
        }
    }

}


export { Versions }
