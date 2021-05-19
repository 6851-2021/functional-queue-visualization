import React, { Fragment } from 'react';
import { Group } from '@vx/group';

import Node from './Node';
import { getTopLeft } from './utils';

function Nodes({ nodes, layout, orientation, cur, onNodeClick }) {
  return (
    <Fragment>
      { nodes.map((node, i) => (
        <Group {...getTopLeft(node, layout, orientation)} key={i}>
          <Node
            node={node}
            layout={layout}
            orientation={orientation}
            cur = {cur}
            onClick={() => onNodeClick(node)}
          />
        </Group>
      ))}
    </Fragment>
  )
}

export default Nodes;