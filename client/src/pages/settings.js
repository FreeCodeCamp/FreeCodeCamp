import { Router } from '@reach/router';
import { withPrefix } from 'gatsby';
import React from 'react';

import ShowSettings from '../client-only-routes/ShowSettings';
import RedirectHome from '../components/RedirectHome';

function Settings() {
  return (
    <Router>
      <ShowSettings path={withPrefix('/settings')} />
      <RedirectHome default={true} />
    </Router>
  );
}

Settings.displayName = 'Settings';

export default Settings;
