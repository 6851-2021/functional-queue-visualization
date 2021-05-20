import React from 'react';
import { LinkVertical } from '@vx/shape';

function Link({ data, ...props }) {
  let LinkComponent;
  LinkComponent = LinkVertical;
  
  return (
    <LinkComponent
      data={data}
      stroke="#374469"
      strokeWidth="1"
      fill="none"
      {...props}
    />
  )
}

export default Link;