import {
  ToggleButtonGroup as BSBG,
  ToggleButton as TB
} from '@freecodecamp/react-bootstrap';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import './toggle-button.css';
import Spacer from '../../assets/icons/Spacer';
import ToggleCheck from '../../assets/icons/ToggleCheck';

const propTypes = {
  name: PropTypes.string.isRequired,
  offLabel: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onLabel: PropTypes.string,
  value: PropTypes.bool.isRequired
};

function getActiveClass(condition) {
  return condition ? 'active' : 'not-active';
}

export default function ToggleButton({
  name,
  onChange,
  value,
  onLabel = 'On',
  offLabel = 'Off'
}) {
  const checkIconStyle = {
    height: '15px',
    width: '20px'
  };
  return (
    <Fragment>
      <BSBG name={name} onChange={onChange} type='radio'>
        <TB
          bsSize='sm'
          bsStyle='primary'
          className={`toggle-${getActiveClass(value)}`}
          disabled={value}
          type='radio'
          value={1}
        >
          {value ? (
            <ToggleCheck style={checkIconStyle} />
          ) : (
            <Spacer style={checkIconStyle} />
          )}
          {onLabel}
        </TB>
        <TB
          bsSize='sm'
          bsStyle='primary'
          className={`toggle-${getActiveClass(!value)}`}
          disabled={!value}
          type='radio'
          value={2}
        >
          {offLabel}
          {!value ? (
            <ToggleCheck style={checkIconStyle} />
          ) : (
            <Spacer style={checkIconStyle} />
          )}
        </TB>
      </BSBG>
    </Fragment>
  );
}

ToggleButton.displayName = 'ToggleButton';
ToggleButton.propTypes = propTypes;
