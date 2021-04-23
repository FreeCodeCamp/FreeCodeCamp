import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'react-final-form';

import {
  FormFields,
  BlockSaveButton,
  BlockSaveWrapper,
  formatUrlValues
} from './';

const propTypes = {
  buttonText: PropTypes.string,
  enableSubmit: PropTypes.bool,
  formFields: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, label: PropTypes.string })
      .isRequired
  ).isRequired,
  hideButton: PropTypes.bool,
  id: PropTypes.string.isRequired,
  initialValues: PropTypes.object,
  options: PropTypes.shape({
    ignored: PropTypes.arrayOf(PropTypes.string),
    isEditorLinkAllowed: PropTypes.bool,
    required: PropTypes.arrayOf(PropTypes.string),
    types: PropTypes.objectOf(PropTypes.string)
  }),
  submit: PropTypes.func.isRequired
};

function DynamicForm({
  id,
  formFields,
  initialValues,
  options,
  submit,
  buttonText,
  enableSubmit,
  hideButton
}) {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={(values, ...args) =>
        submit(formatUrlValues(values, options), ...args)
      }
    >
      {({ handleSubmit, pristine, error }) => (
        <form
          id={`dynamic-${id}`}
          onSubmit={handleSubmit}
          style={{ width: '100%' }}
        >
          <FormFields formFields={formFields} options={options} />
          <BlockSaveWrapper>
            {hideButton ? null : (
              <BlockSaveButton disabled={(pristine && !enableSubmit) || error}>
                {buttonText ? buttonText : null}
              </BlockSaveButton>
            )}
          </BlockSaveWrapper>
        </form>
      )}
    </Form>
  );
}

DynamicForm.displayName = 'DynamicForm';
DynamicForm.propTypes = propTypes;

export default DynamicForm;
