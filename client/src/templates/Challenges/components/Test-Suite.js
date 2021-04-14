import PropTypes from 'prop-types';
import React from 'react';

import Fail from '../../../assets/icons/Fail';
import GreenPass from '../../../assets/icons/GreenPass';
import Initial from '../../../assets/icons/Initial';

import './test-suite.css';

const propTypes = {
  tests: PropTypes.arrayOf(PropTypes.object)
};

function getAccessibleText(err, pass, text) {
  let accessibleText = 'Waiting';
  const cleanText = text.replace(/<\/?code>/g, '');

  // Determine test status (i.e. icon)
  if (err) {
    accessibleText = 'Error';
  } else if (pass) {
    accessibleText = 'Pass';
  }

  // Append the text itself
  return accessibleText + ' - ' + cleanText;
}

function TestSuite({ tests }) {
  return (
    <div className='challenge-test-suite'>
      {tests.map(({ err, pass = false, text = '' }, index) => {
        const isInitial = !pass && !err;
        const statusIcon = pass && !err ? <GreenPass /> : <Fail />;
        return (
          <div
            aria-label={getAccessibleText(err, pass, text)}
            className='test-result'
            key={text.slice(-6) + index}
          >
            <div className='test-status-icon'>
              {isInitial ? <Initial /> : statusIcon}
            </div>
            <div
              aria-hidden='true'
              className='test-output'
              dangerouslySetInnerHTML={{ __html: text }}
              xs={10}
            />
          </div>
        );
      })}
    </div>
  );
}

TestSuite.displayName = 'TestSuite';
TestSuite.propTypes = propTypes;

export default TestSuite;
