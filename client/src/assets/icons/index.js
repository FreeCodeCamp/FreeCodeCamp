import React from 'react';
import APIIcon from './APIIcon';
import Algorithm from './Algorithm';
import Analytics from './Analytics';
import Clipboard from './Clipboard';
import D3Icon from './D3Icon';
import JavaScriptIcon from './JavaScriptIcon';
import PythonIcon from './PythonIcon';
import ReactIcon from './ReactIcon';
import ResponsiveDesign from './ResponsiveDesign';
import Shield from './Shield';
import TensorflowIcon from './TensorflowIcon';

const generateIconComponent = (superBlock, className) => {
  const iconMap = {
    'responsive-web-design': ResponsiveDesign,
    'javascript-algorithms-and-data-structures': JavaScriptIcon,
    'front-end-libraries': ReactIcon,
    'data-visualization': D3Icon,
    'apis-and-microservices': APIIcon,
    'quality-assurance': Clipboard,
    'scientific-computing-with-python': PythonIcon,
    'data-analysis-with-python': Analytics,
    'information-security': Shield,
    'machine-learning-with-python': TensorflowIcon,
    'coding-interview-prep': Algorithm
  };
  // fallback in case super block doesn't exist and for tests
  const Icon = iconMap[superBlock] ? iconMap[superBlock] : ResponsiveDesign;

  return <Icon className={className} />;
};

export { generateIconComponent };
