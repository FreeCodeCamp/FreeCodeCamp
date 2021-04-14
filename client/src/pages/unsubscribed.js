import { Router } from '@reach/router';
import { withPrefix } from 'gatsby';
import React from 'react';

import ShowUnsubscribed from '../client-only-routes/ShowUnsubscribed';
import RedirectHome from '../components/RedirectHome';

function Unsubscribed() {
  return (
    <Router>
      <ShowUnsubscribed path={withPrefix('/unsubscribed/:unsubscribeId')} />
      <ShowUnsubscribed path={withPrefix('/unsubscribed')} />
      <RedirectHome default={true} />
    </Router>
  );
}

Unsubscribed.displayName = 'Unsubscribed';

export default Unsubscribed;
