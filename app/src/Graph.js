import React from 'react';
import './App.css';

import { Group } from '@vx/group';
import { Tree } from '@vx/hierarchy';

import Links from "./Links";
import Nodes from "./Nodes";

class Graph extends React.Component {

    state = {
        hover: "",
    };

    render() {
        const {
            width,
            height,
            margin = {
                top: 30,
                left: 30,
                right: 30,
                bottom: 30
            }
        } = this.props;
            
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        let origin;
        let sizeWidth;
        let sizeHeight;
        origin = { x: 0, y: 0 };
        sizeWidth = innerWidth;
        sizeHeight = innerHeight;
        
        return (
            <div id="graph-div">
                <svg width={width} height={height}>
                    <Tree
                        top={margin.top}
                        left={margin.left}
                        root={this.props.root}
                        size={[sizeWidth, sizeHeight]}
                        separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
                    >
                        {({ data }) => (
                            <Group top={origin.y} left={origin.x}>
                                <Links links={data.links()} />

                                <Nodes
                                    nodes={data.descendants()}
                                    cur={this.props.cur}
                                    onNodeClick={(node) => {
                                        this.props.setVersion(node.id);
                                        this.forceUpdate();
                                    }}
                                    hover={this.state.hover}
                                    onNodeMouseOver={(node) => {
                                        this.setState({hover:node.data.name});
                                        this.forceUpdate();
                                    }}
                                    onNodeMouseOut={() => {
                                        this.setState({hover:""});
                                        this.forceUpdate();
                                    }}
                                />
                            </Group>
                        )}
                    </Tree>
                </svg>
            </div>
        );
    }
}

export { Graph }
