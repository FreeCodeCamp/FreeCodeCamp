const { cloneDeep } = require('lodash');

exports.translateComments = (text, lang, dict, codeLang) => {
  const knownComments = Object.keys(dict);
  const config = { knownComments, dict, lang };
  const input = { text, commentCounts: new Map() };
  switch (codeLang) {
    case 'js':
    case 'jsx':
      return transMultiline(transInline(input, config), config);
    case 'html':
      return transScript(transHTML(transCSS(input, config), config), config);
    default:
      return input;
  }
};

exports.translateCommentsInChallenge = (challenge, lang, dict) => {
  const challClone = cloneDeep(challenge);
  if (!challClone.challengeFiles) {
    console.warn(`Challenge ${challClone.title} has no seed to translate`);
  } else {
    // TODO: Does not look correct @ShaunSHamilton
    challClone.challengeFiles.forEach(challengeFile => {
      if (challengeFile.contents) {
        let { text, commentCounts } = this.translateComments(
          challengeFile.contents,
          lang,
          dict,
          challengeFile.ext
        );
        challClone.__commentCounts = commentCounts;
        challengeFile.contents = text;
      }
    });
  }
  return challClone;
};

// bare urls could be interpreted as comments, so we have to lookbehind for
// http:// or https://
function transInline(input, config) {
  return translateGeneric(input, config, '((?<!https?:)//\\s*)', '(\\s*$)');
}

function transMultiline(input, config) {
  return translateGeneric(input, config, '(/\\*\\s*)', '(\\s*\\*/)');
}

// CSS has to be handled separately since it is looking for comments inside tags
function transCSS({ text, commentCounts }, config) {
  const regex = /<style>.*?<\/style>/gms;
  const matches = text.matchAll(regex);

  for (const [match] of matches) {
    let { text: styleText } = transMultiline(
      { text: match, commentCounts },
      config
    );
    text = text.replace(match, styleText);
  }
  return { text, commentCounts };
}

function transScript({ text, commentCounts }, config) {
  const regex = /<script>.*?<\/script>/gms;
  const matches = text.matchAll(regex);

  for (const [match] of matches) {
    let { text: scriptText } = transMultiline(
      transInline({ text: match, commentCounts }, config),
      config
    );
    text = text.replace(match, scriptText);
  }
  return { text, commentCounts };
}

function transHTML(input, config) {
  return translateGeneric(input, config, '(<!--\\s*)', '(\\s*-->)');
}

function updateCounts(map, key) {
  if (map.has(key)) {
    map.set(key, map.get(key) + 1);
  } else {
    map.set(key, 1);
  }
}

function translateGeneric(
  { text, commentCounts },
  config,
  regexBefore,
  regexAfter
) {
  const { knownComments, dict, lang } = config;
  const regex = new RegExp(regexBefore + '(.*?)' + regexAfter, 'gms');
  const matches = text.matchAll(regex);

  for (const [match, before, comment, after] of matches) {
    if (knownComments.includes(comment)) {
      updateCounts(commentCounts, dict[comment][lang]);
      text = text.replace(match, `${before}${dict[comment][lang]}${after}`);
    } else if (comment.trim()) {
      throw `${comment} does not appear in the comment dictionary`;
    }
  }

  return { text, commentCounts };
}

exports.translateGeneric = translateGeneric;
