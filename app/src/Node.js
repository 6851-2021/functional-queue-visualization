import React, { Fragment } from 'react';
import { Group } from '@vx/group';

function Node({ node, cur, onClick }) {
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
        />
      )}
      <text
        dy={'.33em'}
        fontSize={9}
        fontFamily="Arial"
        textAnchor={'middle'}
        style={{ pointerEvents: 'none' }}
        fill={inFocus? "white" : '#2b3e51'}
      >
        Q{node.data.name}
      </text>
    </Fragment>
  );
}

export default Node;