import {
  Alert,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock
} from '@freecodecamp/react-bootstrap';
import { kebabCase } from 'lodash';
import normalizeUrl from 'normalize-url';
import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'react-final-form';
import {
  editorValidator,
  localhostValidator,
  composeValidators,
  fCCValidator,
  httpValidator
} from './FormValidators';

const propTypes = {
  formFields: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, label: PropTypes.string })
      .isRequired
  ).isRequired,
  options: PropTypes.shape({
    ignored: PropTypes.arrayOf(PropTypes.string),
    isEditorLinkAllowed: PropTypes.bool,
    placeholders: PropTypes.objectOf(PropTypes.string),
    required: PropTypes.arrayOf(PropTypes.string),
    types: PropTypes.objectOf(PropTypes.string)
  })
};

function FormFields(props) {
  const { formFields, options = {} } = props;
  const {
    ignored = [],
    placeholders = {},
    required = [],
    types = {},
    isEditorLinkAllowed = false,
    isLocalLinkAllowed = false
  } = options;

  const nullOrWarning = (value, error, isURL, name) => {
    let validationError;
    if (value && isURL) {
      try {
        normalizeUrl(value, { stripWWW: false });
      } catch (err) {
        validationError = err.message;
      }
    }
    const validationWarning = composeValidators(
      name === 'githubLink' || isEditorLinkAllowed ? null : editorValidator,
      fCCValidator,
      httpValidator,
      isLocalLinkAllowed ? null : localhostValidator
    )(value);
    const message = error || validationError || validationWarning;
    return message ? (
      <HelpBlock>
        <Alert bsStyle={error || validationError ? 'danger' : 'info'}>
          {message}
        </Alert>
      </HelpBlock>
    ) : null;
  };
  return (
    <div>
      {formFields
        .filter(formField => !ignored.includes(formField.name))
        .map(({ name, label }) => (
          <Field key={`${kebabCase(name)}-field`} name={name}>
            {({ input: { value, onChange }, meta: { pristine, error } }) => {
              const key = kebabCase(name);
              const type = name in types ? types[name] : 'text';
              const placeholder =
                name in placeholders ? placeholders[name] : '';
              const isURL = types[name] === 'url';
              return (
                <Col key={key} xs={12}>
                  <FormGroup>
                    {type === 'hidden' ? null : (
                      <ControlLabel htmlFor={key}>{label}</ControlLabel>
                    )}
                    <FormControl
                      componentClass={type === 'textarea' ? type : 'input'}
                      id={key}
                      name={name}
                      onChange={onChange}
                      placeholder={placeholder}
                      required={required.includes(name)}
                      rows={4}
                      type={type}
                      value={value}
                    />
                    {nullOrWarning(value, !pristine && error, isURL, name)}
                  </FormGroup>
                </Col>
              );
            }}
          </Field>
        ))}
    </div>
  );
}

FormFields.displayName = 'FormFields';
FormFields.propTypes = propTypes;

export default FormFields;
