import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import sanitizeHtml from 'sanitize-html';

import './output.css';

const propTypes = {
  defaultOutput: PropTypes.string,
  output: PropTypes.arrayOf(PropTypes.string)
};

class Output extends Component {
  render() {
    const { output, defaultOutput } = this.props;
    const message = sanitizeHtml(
      !isEmpty(output) ? output.join('\n') : defaultOutput,
      {
        allowedTags: ['b', 'i', 'em', 'strong', 'code', 'wbr']
      }
    );
    return (
      <pre
        className='output-text'
        dangerouslySetInnerHTML={{ __html: message }}
      />
    );
  }
}

Output.displayName = 'Output';
Output.propTypes = propTypes;

export default Output;
