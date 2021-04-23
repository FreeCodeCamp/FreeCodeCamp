import {
  FormGroup,
  ControlLabel,
  HelpBlock
} from '@freecodecamp/react-bootstrap';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { ButtonSpacer } from '../helpers';
import TB from '../helpers/ToggleButton';

import './toggle-setting.css';

const propTypes = {
  action: PropTypes.string.isRequired,
  explain: PropTypes.string,
  flag: PropTypes.bool.isRequired,
  flagName: PropTypes.string.isRequired,
  toggleFlag: PropTypes.func.isRequired
};

export default function ToggleSetting({
  action,
  explain,
  flag,
  flagName,
  toggleFlag,
  ...restProps
}) {
  return (
    <Fragment>
      <div className='toggle-setting-container'>
        <FormGroup>
          <ControlLabel className='toggle-label' htmlFor={flagName}>
            <strong>{action}</strong>
            {explain ? (
              <HelpBlock>
                <em>{explain}</em>
              </HelpBlock>
            ) : null}
          </ControlLabel>
          <TB
            name={flagName}
            onChange={toggleFlag}
            value={flag}
            {...restProps}
          />
        </FormGroup>
      </div>
      <ButtonSpacer />
    </Fragment>
  );
}

ToggleSetting.displayName = 'ToggleSetting';
ToggleSetting.propTypes = propTypes;
