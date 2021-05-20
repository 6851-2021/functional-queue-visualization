import React, { Fragment } from 'react';
import { Group } from '@vx/group';
import { Tooltip } from 'antd';

import Node from './Node';
import { getTopLeft } from './utils';

function Nodes({ nodes, cur, onNodeClick, hover, onNodeMouseOver, onNodeMouseOut }) {
  return (
    <Fragment>
      { nodes.map((node, i) => (
        <Group {...getTopLeft(node)} key={i}>
          <Tooltip title={"Q"+node.data.name} visible={hover===node.data.name?true:false} placement={"left"}>
          <Node
            node={node}
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