import React, { useState, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { previewMounted } from '../redux';

import './preview.css';

const mainId = 'fcc-main-frame';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      previewMounted
    },
    dispatch
  );

interface PreviewProps {
  className?: string;
  disableIframe?: boolean;
  previewMounted: () => void;
  t: (text: string) => string;
}

function Preview({ disableIframe, previewMounted, t }: PreviewProps) {
  const [iframeStatus, setIframeStatus] = useState<boolean | undefined>(false);
  const iframeToggle = iframeStatus ? 'disable' : 'enable';

  useEffect(() => {
    previewMounted();
  }, [previewMounted]);

  useEffect(() => {
    setIframeStatus(disableIframe);
  }, [disableIframe]);

  return (
    <div className={`notranslate challenge-preview ${iframeToggle}-iframe`}>
      <iframe
        className={'challenge-preview-frame'}
        id={mainId}
        title={t('learn.chal-preview')}
      />
    </div>
  );
}

Preview.displayName = 'Preview';

export default connect(null, mapDispatchToProps)(withTranslation()(Preview));
