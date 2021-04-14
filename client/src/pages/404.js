import { Router } from '@reach/router';
import { withPrefix } from 'gatsby';
import React from 'react';

/* eslint-disable max-len */
import ShowProfileOrFourOhFour from '../client-only-routes/ShowProfileOrFourOhFour';
import FourOhFour from '../components/FourOhFour';
/* eslint-enable max-len */

function FourOhFourPage() {
  return (
    <Router>
      <ShowProfileOrFourOhFour path={withPrefix('/:maybeUser')} />
      <FourOhFour default={true} />
    </Router>
  );
}

FourOhFourPage.displayName = 'FourOhFourPage';

export default FourOhFourPage;
