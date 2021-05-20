import React, { Fragment } from 'react';
import Link from './Link';

function Links({ links }) {
  return (
    <Fragment>
      {links.map((link, i) => {
        return (
          <Link
            data={link}
            stroke="#374469"
            strokeWidth="1"
            fill="none"
            key={i}
          />
        )
      })}
    </Fragment>
  )
}

export default Links;