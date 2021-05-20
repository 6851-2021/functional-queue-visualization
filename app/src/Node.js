import React, { Fragment } from 'react';
import { Group } from '@vx/group';

function Node({ node, cur, onClick, onMouseOver, onMouseOut }) {
  const width = 30;
  const height = 20;
  const inFocus = node.data.name===cur.toString();

  return (
    <Fragment>
      {(
        <rect
          height={height}
          width={width}
          y={-height / 2}
          x={-width / 2}
          fill={inFocus ? 'darkgreen' : '#d6dee1'}
          stroke={"black"}
          strokeWidth={inFocus ? 2 : 1}
          strokeOpacity={inFocus ? 1 : 0.6}
          rx={7} 
          ry={7}
          onClick={onClick}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        />
      )}
      <text
        dy={'.33em'}
        fontSize={10}
        // fontFamily="Arial"
        textAnchor={'middle'}
        style={{ pointerEvents: 'none' }}
        fill={inFocus? "white" : 'black'}
      >
        Q<tspan fontSize={8.5} dy={'.15em'}>{node.data.name}</tspan>
      </text>
    </Fragment>
  );
}

export default Node;