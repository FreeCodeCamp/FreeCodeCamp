import { Router } from '@reach/router';
import { withPrefix } from 'gatsby';
import React from 'react';

import ShowUser from '../client-only-routes/ShowUser';
import RedirectHome from '../components/RedirectHome';

function User() {
  return (
    <Router>
      <ShowUser path={withPrefix('/user/:username/report-user')} />
      <RedirectHome default={true} />
    </Router>
  );
}

User.displayName = 'User';

export default User;
