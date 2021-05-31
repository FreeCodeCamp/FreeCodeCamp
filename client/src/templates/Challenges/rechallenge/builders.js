import {
  cond,
  flow,
  identity,
  matchesProperty,
  partial,
  stubTrue,
  template as _template
} from 'lodash-es';

import {
  compileHeadTail,
  setExt,
  transformContents
} from '../../../../../utils/polyvinyl';

const htmlCatch = '\n<!--fcc-->\n';
const jsCatch = '\n;/*fcc*/\n';
const cssCatch = '\n/*fcc*/\n';

const wrapInScript = partial(
  transformContents,
  content => `${htmlCatch}<script>${content}${jsCatch}</script>`
);
const wrapInStyle = partial(
  transformContents,
  content => `${htmlCatch}<style>${content}${cssCatch}</style>`
);
const setExtToHTML = partial(setExt, 'html');
const padContentWithJsCatch = partial(compileHeadTail, jsCatch);
const padContentWithCssCatch = partial(compileHeadTail, cssCatch);
// const padContentWithHTMLCatch = partial(compileHeadTail, htmlCatch);

export const jsToHtml = cond([
  [
    matchesProperty('ext', 'js'),
    flow(padContentWithJsCatch, wrapInScript, setExtToHTML)
  ],
  [stubTrue, identity]
]);

export const cssToHtml = cond([
  [
    matchesProperty('ext', 'css'),
    flow(padContentWithCssCatch, wrapInStyle, setExtToHTML)
  ],
  [stubTrue, identity]
]);

export function concatHtml({ required = [], template, files = [] } = {}) {
  const embedSource = template ? _template(template) : ({ source }) => source;
  const head = required
    .map(({ link, src }) => {
      if (link && src) {
        throw new Error(`
A required file can not have both a src and a link: src = ${src}, link = ${link}
`);
      }
      if (src) {
        return `<script src='${src}' type='text/javascript'></script>`;
      }
      if (link) {
        return `<link href='${link}' rel='stylesheet' />`;
      }
      return '';
    })
    .reduce((head, element) => head.concat(element));

  const source = files.reduce(
    (source, file) => source.concat(file.contents, htmlCatch),
    ''
  );

  return `<head>${head}</head>${embedSource({ source })}`;
}
