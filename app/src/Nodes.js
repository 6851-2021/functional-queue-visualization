import React, { Fragment } from 'react';
import { Group } from '@vx/group';

import Node from './Node';
import { getTopLeft } from './utils';
import { Tooltip } from 'antd';

function Nodes({ nodes, layout, orientation, cur, onNodeClick, hover, onNodeMouseOver, onNodeMouseOut }) {
  return (
    <Fragment>
      { nodes.map((node, i) => (
        <Group {...getTopLeft(node, layout, orientation)} key={i}>
          <Tooltip title={"Q"+node.data.name} visible={hover===node.data.name?true:false} placement={"left"}>
          <Node
            node={node}
            layout={layout}
            orientation={orientation}
            cur = {cur}
            onClick={() => onNodeClick(node)}
            onMouseOver={() => onNodeMouseOver(node)}
            onMouseOut={() => onNodeMouseOut(node)}
          />
          </Tooltip>
        </Group>
      ))}
    </Fragment>
  )
}

export default Nodes;