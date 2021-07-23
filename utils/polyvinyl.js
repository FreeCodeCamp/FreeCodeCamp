// originally based off of https://github.com/gulpjs/vinyl
const invariant = require('invariant');

// interface PolyVinyl {
//   source: String,
//   contents: String,
//   name: String,
//   ext: String,
//   path: String,
//   key: String,
//   head: String,
//   tail: String,
//   history: [...String],
//   error: Null|Object|Error
// }

// createPoly({
//   name: String,
//   ext: String,
//   contents: String,
//   history?: [...String],
// }) => PolyVinyl, throws
function createPoly({ name, ext, contents, history, ...rest } = {}) {
  invariant(typeof name === 'string', 'name must be a string but got %s', name);

  invariant(typeof ext === 'string', 'ext must be a string, but was %s', ext);

  invariant(
    typeof contents === 'string',
    'contents must be a string but got %s',
    contents
  );

  return {
    ...rest,
    history: Array.isArray(history) ? history : [name + '.' + ext],
    name,
    ext,
    path: name + '.' + ext,
    fileKey: name + ext,
    contents,
    error: null
  };
}

// isPoly(poly: Any) => Boolean
function isPoly(poly) {
  return (
    poly &&
    typeof poly.contents === 'string' &&
    typeof poly.name === 'string' &&
    typeof poly.ext === 'string' &&
    Array.isArray(poly.history)
  );
}

// checkPoly(poly: Any) => Void, throws
function checkPoly(poly) {
  invariant(
    isPoly(poly),
    'function should receive a PolyVinyl, but got %s',
    poly
  );
}

// setContent(contents: String, poly: PolyVinyl) => PolyVinyl
// setContent will loose source if set
function setContent(contents, poly) {
  checkPoly(poly);
  return {
    ...poly,
    contents,
    source: null
  };
}

// setExt(ext: String, poly: PolyVinyl) => PolyVinyl
function setExt(ext, poly) {
  checkPoly(poly);
  const newPoly = {
    ...poly,
    ext,
    path: poly.name + '.' + ext,
    fileKey: poly.name + ext
  };
  newPoly.history = [...poly.history, newPoly.path];
  return newPoly;
}

// setImportedFiles(importedFiles: String[], poly: PolyVinyl) => PolyVinyl
function setImportedFiles(importedFiles, poly) {
  checkPoly(poly);
  const newPoly = {
    ...poly,
    importedFiles: [...importedFiles]
  };
  return newPoly;
}

// clearHeadTail(poly: PolyVinyl) => PolyVinyl
function clearHeadTail(poly) {
  checkPoly(poly);
  return {
    ...poly,
    head: '',
    tail: ''
  };
}

// compileHeadTail(padding: String, poly: PolyVinyl) => PolyVinyl
function compileHeadTail(padding = '', poly) {
  return clearHeadTail(
    transformContents(
      () => [poly.head, poly.contents, poly.tail].join(padding),
      poly
    )
  );
}

// transformContents(
//   wrap: (contents: String) => String,
//   poly: PolyVinyl
// ) => PolyVinyl
// transformContents will keep a copy of the original
// code in the `source` property. If the original polyvinyl
// already contains a source, this version will continue as
// the source property
function transformContents(wrap, poly) {
  const newPoly = setContent(wrap(poly.contents), poly);
  // if no source exist, set the original contents as source
  newPoly.source = poly.source || poly.contents;
  return newPoly;
}

// transformHeadTailAndContents(
//   wrap: (source: String) => String,
//   poly: PolyVinyl
// ) => PolyVinyl
function transformHeadTailAndContents(wrap, poly) {
  return {
    ...transformContents(wrap, poly),
    head: wrap(poly.head),
    tail: wrap(poly.tail)
  };
}

module.exports = {
  createPoly,
  isPoly,
  setContent,
  setExt,
  setImportedFiles,
  compileHeadTail,
  transformContents,
  transformHeadTailAndContents
};
