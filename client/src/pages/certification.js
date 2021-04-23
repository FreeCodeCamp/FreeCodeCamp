import { Router } from '@reach/router';
import { withPrefix } from 'gatsby';
import React, { Component } from 'react';

import ShowCertification from '../client-only-routes/ShowCertification';
import RedirectHome from '../components/RedirectHome';

import './certification.css';

class Certification extends Component {
  render() {
    return (
      <Router>
        <ShowCertification
          path={withPrefix('/certification/:username/:certName')}
        />
        <RedirectHome default={true} />
      </Router>
    );
  }
}

export default Certification;
