import React from 'react';
import './App.css';
import { Queue } from './functional';

class Versions extends React.Component {

    render() {
        let versions = [];
        let ancs = [];
        let temp = this.props.parents[this.props.cur];
        while (temp !== -1) {
            ancs.push(temp);
            temp = this.props.parents[temp];
        }
        for (let i = 0; i < this.props.queues.length; i++) {
            const q = this.props.queues[i];
            const spanClass = "version-ref" + (i === this.props.cur ? ' current' : '') + (ancs.includes(i) ? ' parent' : '');
            const version =
                <div key={i}>
                    <span className={spanClass} onClick={() => this.props.setVersion(i)}>
                        Q<sub>{i}</sub> {/*Queue.listAllElements(q).join(", ")*/} (Size {Queue.size(q)}{Queue.head(q) ? ", Head " + Queue.head(q) : ""})
                </span>
                </div>;
            versions.push(version);
        }
        return (
            <div>
                {versions}
            </div>
        );
    }

}


export { Versions }
