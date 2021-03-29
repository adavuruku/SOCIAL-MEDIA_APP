import React, { Fragment } from 'react';
import loader from './loader.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={loader}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt="Loading..."
    />
  </Fragment>
);

export default Spinner;
