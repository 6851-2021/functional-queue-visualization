import React from 'react';
import './App.css';

import { Group } from '@vx/group';
import { LinearGradient } from '@vx/gradient';
import { Tree } from '@vx/hierarchy';

import Links from "./Links";
import Nodes from "./Nodes";

class Graph extends React.Component {

    state = {
        layout: "cartesian",
        orientation: "vertical",
        linkType: "diagonal",
        stepPercent: 0.5,
        hover: "",
    };

    render() {
        const {
            data,
            width,
            height,
            events = false,
            margin = {
                top: 30,
                left: 30,
                right: 30,
                bottom: 30
            }, 
            root
        } = this.props;
        const { layout, orientation, linkType, stepPercent } = this.state;
            
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        let origin;
        let sizeWidth;
        let sizeHeight;
        origin = { x: 0, y: 0 };
        if (orientation === "vertical") {
            sizeWidth = innerWidth;
            sizeHeight = innerHeight;
        } else {
            sizeWidth = innerHeight;
            sizeHeight = innerWidth;
        }
        
        return (
            <div id="graph-div">
                <svg width={width} height={height}>
                <LinearGradient id="lg" from="#fd9b93" to="#fe6e9e" />
                {/* <rect width={width} height={height} rx={14} fill="#272b4d" /> */}
                <Tree
                    top={margin.top}
                    left={margin.left}
                    root={this.props.root}
                    size={[sizeWidth, sizeHeight]}
                    separation={(a, b) => (a.parent == b.parent ? 1 : 0.5) / a.depth}
                >
                    {({ data }) => (
                    <Group top={origin.y} left={origin.x}>
                        <Links
                        links={data.links()}
                        linkType={linkType}
                        layout={layout}
                        orientation={orientation}
                        stepPercent={stepPercent}
                        />

                        <Nodes
                        nodes={data.descendants()}
                        layout={layout}
                        orientation={orientation}
                        cur={this.props.cur}
                        onNodeClick={(node) => {
                            this.props.setVersion(node.id);
                            this.forceUpdate();
                        }}
                        hover={this.state.hover}
                        onNodeMouseOver={(node) => {
                            console.log('hovering on', node.data.name);
                            this.state.hover=node.data.name;
                            this.forceUpdate();
                        }}
                        onNodeMouseOut={(node) => {
                            this.state.hover="";
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
