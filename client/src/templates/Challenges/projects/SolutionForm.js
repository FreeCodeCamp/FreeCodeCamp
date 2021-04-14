import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import {
  backend,
  backEndProject,
  frontEndProject,
  pythonProject
} from '../../../../utils/challengeTypes';
import { Form } from '../../../components/formHelpers';

const propTypes = {
  challengeType: PropTypes.number,
  description: PropTypes.string,
  isSubmitting: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  updateSolutionForm: PropTypes.func.isRequired
};

export class SolutionForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.updateSolutionForm({});
  }

  handleSubmit(validatedValues) {
    // Do not execute challenge, if errors
    if (validatedValues.errors.length === 0) {
      // updates values on store
      this.props.updateSolutionForm(validatedValues.values);
      if (validatedValues.invalidValues.length === 0) {
        this.props.onSubmit({ isShouldCompletionModalOpen: true });
      } else {
        this.props.onSubmit({ isShouldCompletionModalOpen: false });
      }
    }
  }

  render() {
    const { isSubmitting, challengeType, description, t } = this.props;

    // back end challenges and front end projects use a single form field
    const solutionField = [
      { name: 'solution', label: t('learn.solution-link') }
    ];
    const backEndProjectFields = [
      { name: 'solution', label: t('learn.solution-link') },
      { name: 'githubLink', label: t('learn.github-link') }
    ];

    const options = {
      types: {
        solution: 'url',
        githubLink: 'url'
      },
      required: ['solution'],
      isEditorLinkAllowed: false,
      isLocalLinkAllowed: false
    };

    const buttonCopy = isSubmitting
      ? t('learn.submit-and-go')
      : t('learn.i-completed');

    let formFields = solutionField;
    let solutionLink = 'ex: ';
    let solutionFormID = 'front-end-form';

    switch (challengeType) {
      case frontEndProject:
        formFields = solutionField;
        solutionLink =
          solutionLink + 'https://codepen.io/camperbot/full/oNvPqqo';
        break;

      case backend:
        formFields = solutionField;
        options.isLocalLinkAllowed = true;
        solutionLink = solutionLink + 'https://project-name.camperbot.repl.co/';
        break;

      case backEndProject:
        formFields = backEndProjectFields;
        solutionLink = solutionLink + 'https://project-name.camperbot.repl.co/';
        solutionFormID = 'back-end-form';
        break;

      case pythonProject:
        formFields = solutionField;
        options.isEditorLinkAllowed = true;
        solutionLink =
          solutionLink +
          (description.includes('Colaboratory')
            ? 'https://colab.research.google.com/drive/1i5EmInTWi1RFvFr2_aRXky96YxY6sbWy'
            : 'https://repl.it/@camperbot/hello');
        break;

      default:
        formFields = solutionField;
        solutionLink =
          solutionLink + 'https://codepen.io/camperbot/full/oNvPqqo';
    }

    return (
      <Form
        buttonText={`${buttonCopy}`}
        formFields={formFields}
        id={solutionFormID}
        options={{
          ...options,
          placeholders: {
            solution: solutionLink,
            githubLink: 'ex: https://github.com/camperbot/hello'
          }
        }}
        submit={this.handleSubmit}
      />
    );
  }
}

SolutionForm.propTypes = propTypes;

export default withTranslation()(SolutionForm);
