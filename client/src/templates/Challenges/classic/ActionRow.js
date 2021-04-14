import PropTypes from 'prop-types';
import React from 'react';
import EditorTabs from './EditorTabs';

const propTypes = {
  block: PropTypes.string,
  showConsole: PropTypes.bool,
  showNotes: PropTypes.bool,
  showPreview: PropTypes.bool,
  superBlock: PropTypes.string,
  switchDisplayTab: PropTypes.func
};

const ActionRow = ({ switchDisplayTab, showPreview, showConsole }) => {
  const restartStep = () => {
    console.log('restart');
  };
  return (
    <div className='action-row'>
      <div>
        <h5 className='breadcrumbs-demo'>
          Responsive Web Design &gt; Basic HTML Cat Photo App &gt;{' '}
          <span>Step 23 of 213</span>
        </h5>
      </div>
      <div className='tabs-row'>
        <EditorTabs />
        <button
          className='restart-step-tab'
          onClick={() => restartStep()}
          role='tab'
        >
          Restart Step
        </button>
        <div className='panel-display-tabs'>
          <button
            className={showConsole ? 'active-tab' : ''}
            onClick={() => switchDisplayTab('showConsole')}
            role='tab'
          >
            JS Console
          </button>
          <button
            className={showPreview ? 'active-tab' : ''}
            onClick={() => switchDisplayTab('showPreview')}
            role='tab'
          >
            Show Preview
          </button>
        </div>
      </div>
    </div>
  );
};

ActionRow.propTypes = propTypes;
ActionRow.displayName = 'ActionRow';
export default ActionRow;
