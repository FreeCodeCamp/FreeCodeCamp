import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from '@freecodecamp/react-bootstrap';
import Prism from 'prismjs';

const prismLang = {
  css: 'css',
  js: 'javascript',
  jsx: 'javascript',
  html: 'markup'
};

const SolutionViewer = ({
  challengeFiles,
  solution = '// The solution is not available for this project'
}) =>
  challengeFiles?.length ? (
    challengeFiles.map(challengeFile => (
      <Panel
        bsStyle='primary'
        className='solution-viewer'
        key={challengeFile.ext}
      >
        <Panel.Heading>{challengeFile.ext.toUpperCase()}</Panel.Heading>
        <Panel.Body>
          <pre>
            <code
              className={`language-${prismLang[challengeFile.ext]}`}
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(
                  challengeFile.contents.trim(),
                  Prism.languages[prismLang[challengeFile.ext]]
                )
              }}
            />
          </pre>
        </Panel.Body>
      </Panel>
    ))
  ) : (
    <Panel
      bsStyle='primary'
      className='solution-viewer'
      key={solution.slice(0, 10)}
    >
      <Panel.Heading>JS</Panel.Heading>
      <Panel.Body>
        <pre>
          <code
            className='language-markup'
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(
                solution.trim(),
                Prism.languages.js,
                'javascript'
              )
            }}
          />
        </pre>
      </Panel.Body>
    </Panel>
  );

SolutionViewer.displayName = 'SolutionViewer';
SolutionViewer.propTypes = {
  challengeFiles: PropTypes.array,
  solution: PropTypes.string
};

export default SolutionViewer;
