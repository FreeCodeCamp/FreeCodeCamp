import generate from '@babel/generator';
import { parse } from '@babel/parser';

const removeHtmlComments = str => str.replace(/<!--.*?-->/gs, '');

const removeCssComments = str => str.replace(/\/\*[\s\S]+?\*\//g, '');

const removeJSComments = codeStr => {
  // Note: removes trailing new lines and tailing spaces at end of lines
  const options = {
    comments: false,
    retainLines: true,
    compact: false,
    concise: false,
    minified: false
  };
  try {
    const ast = parse(codeStr);
    const { code } = generate(ast, options, codeStr);
    return code;
  } catch (err) {
    return codeStr;
  }
};

const removeWhiteSpace = (str = '') => {
  return str.replace(/\s/g, '');
};

const curriculumHelpers = {
  removeHtmlComments,
  removeCssComments,
  removeJSComments,
  removeWhiteSpace
};

export default curriculumHelpers;
