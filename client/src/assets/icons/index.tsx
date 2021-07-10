import React from 'react';
import ResponsiveDesign from './responsive-design';
import JavaScriptIcon from './JavaScript-icon';
import ReactIcon from './React-icon';
import D3Icon from './D3-icon';
import APIIcon from './API-icon';
import Clipboard from './clipboard';
import PythonIcon from './python-icon';
import Analytics from './analytics';
import Shield from './shield';
import TensorflowIcon from './Tensorflow-icon';
import Algorithm from './algorithm';

const iconMap = {
  'responsive-web-design': ResponsiveDesign,
  'javascript-algorithms-and-data-structures': JavaScriptIcon,
  'front-end-development-libraries': ReactIcon,
  'data-visualization': D3Icon,
  'back-end-development-and-apis': APIIcon,
  'quality-assurance': Clipboard,
  'scientific-computing-with-python': PythonIcon,
  'data-analysis-with-python': Analytics,
  'information-security': Shield,
  'machine-learning-with-python': TensorflowIcon,
  'coding-interview-prep': Algorithm
};

type SuperBlock = keyof typeof iconMap;

const generateIconComponent = (
  superBlock: SuperBlock,
  className: string
): JSX.Element => {
  // fallback in case super block doesn't exist and for tests
  const Icon = iconMap[superBlock] ? iconMap[superBlock] : ResponsiveDesign;

  return <Icon className={className} />;
};

export { generateIconComponent };
