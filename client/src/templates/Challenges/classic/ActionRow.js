import React from 'react';
import PropTypes from 'prop-types';
import EditorTabs from './EditorTabs';
import BreadCrumb from '../components/bread-crumb';

const propTypes = {
  block: PropTypes.string,
  showConsole: PropTypes.bool,
  showNotes: PropTypes.bool,
  showPreview: PropTypes.bool,
  superBlock: PropTypes.string,
  switchDisplayTab: PropTypes.func
};

const ActionRow = ({
  switchDisplayTab,
  showPreview,
  showConsole,
  superBlock,
  block
}) => {
  const restartStep = () => {
    console.log('restart');
  };
  return (
    <div className='action-row'>
      <div className='breadcrumbs-demo'>
        <BreadCrumb block={block} superBlock={superBlock} />
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
