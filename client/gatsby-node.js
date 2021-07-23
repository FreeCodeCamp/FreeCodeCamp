const env = require('../config/env.json');
const webpack = require('webpack');

const { createFilePath } = require('gatsby-source-filesystem');
// TODO: ideally we'd remove lodash and just use lodash-es, but we can't require
// es modules here.
const uniq = require('lodash/uniq');

const { blockNameify } = require('../utils/block-nameify');
const {
  createChallengePages,
  createBlockIntroPages,
  createSuperBlockIntroPages
} = require('./utils/gatsby');

const createByIdentityMap = {
  blockIntroMarkdown: createBlockIntroPages,
  superBlockIntroMarkdown: createSuperBlockIntroPages
};

exports.onCreateNode = function onCreateNode({ node, actions, getNode }) {
  const { createNodeField } = actions;
  if (node.internal.type === 'ChallengeNode') {
    const { tests = [], block, dashedName, superBlock } = node;
    const slug = `/learn/${superBlock}/${block}/${dashedName}`;
    createNodeField({ node, name: 'slug', value: slug });
    createNodeField({ node, name: 'blockName', value: blockNameify(block) });
    createNodeField({ node, name: 'tests', value: tests });
  }

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode });
    if (!slug.includes('LICENSE')) {
      const {
        frontmatter: { component = '' }
      } = node;
      createNodeField({ node, name: 'slug', value: slug });
      createNodeField({ node, name: 'component', value: component });
    }
  }
};

exports.createPages = function createPages({ graphql, actions, reporter }) {
  if (!env.algoliaAPIKey || !env.algoliaAppId) {
    if (process.env.FREECODECAMP_NODE_ENV === 'production') {
      throw new Error(
        'Algolia App id and API key are required to start the client!'
      );
    } else {
      reporter.info(
        'Algolia keys missing or invalid. Required for search to yield results.'
      );
    }
  }

  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    // Query for all markdown 'nodes' and for the slug we previously created.
    resolve(
      graphql(`
        {
          allChallengeNode(
            sort: { fields: [superOrder, order, challengeOrder] }
          ) {
            edges {
              node {
                block
                challengeType
                fields {
                  slug
                }
                id
                order
                required {
                  link
                  src
                }
                challengeOrder
                superBlock
                superOrder
                template
              }
            }
          }
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                  nodeIdentity
                  component
                }
                frontmatter {
                  block
                  superBlock
                  title
                }
                htmlAst
                id
                excerpt
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors);
          return reject(result.errors);
        }

        // Create challenge pages.
        result.data.allChallengeNode.edges.forEach(
          createChallengePages(createPage)
        );

        const blocks = uniq(
          result.data.allChallengeNode.edges.map(({ node: { block } }) => block)
        ).map(block => blockNameify(block));

        const superBlocks = uniq(
          result.data.allChallengeNode.edges.map(
            ({ node: { superBlock } }) => superBlock
          )
        );

        // Create intro pages
        // TODO: Remove allMarkdownRemark (populate from elsewhere)
        result.data.allMarkdownRemark.edges.forEach(edge => {
          const {
            node: { frontmatter, fields }
          } = edge;

          if (!fields) {
            return;
          }
          const { slug, nodeIdentity } = fields;
          if (slug.includes('LICENCE')) {
            return;
          }
          try {
            if (nodeIdentity === 'blockIntroMarkdown') {
              if (!blocks.includes(frontmatter.block)) {
                return;
              }
            } else if (!superBlocks.includes(frontmatter.superBlock)) {
              return;
            }
            const pageBuilder = createByIdentityMap[nodeIdentity](createPage);
            pageBuilder(edge);
          } catch (e) {
            console.log(`
            ident: ${nodeIdentity} does not belong to a function

            ${frontmatter ? JSON.stringify(edge.node) : 'no frontmatter'}


            `);
          }
        });

        return null;
      })
    );
  });
};

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

exports.onCreateWebpackConfig = ({ stage, plugins, actions }) => {
  const newPlugins = [
    plugins.define({
      HOME_PATH: JSON.stringify(
        process.env.HOME_PATH || 'http://localhost:3000'
      )
    }),
    // We add the shims of the node globals to the global scope
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ];
  // The monaco editor relies on some browser only globals so should not be
  // involved in SSR. Also, if the plugin is used during the 'build-html' stage
  // it overwrites the minfied files with ordinary ones.
  if (stage !== 'build-html') {
    newPlugins.push(
      new MonacoWebpackPlugin({ filename: '[name].worker-[contenthash].js' })
    );
  }
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false,
        path: require.resolve('path-browserify'),
        assert: require.resolve('assert'),
        crypto: require.resolve('crypto-browserify'),
        util: false,
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
        process: require.resolve('process/browser')
      }
    },
    plugins: newPlugins
  });
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-function-bind'
  });
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-export-default-from'
  });
  actions.setBabelPlugin({
    name: 'babel-plugin-transform-imports',
    options: {
      '@freecodecamp/react-bootstrap': {
        transform: '@freecodecamp/react-bootstrap/lib/${member}',
        preventFullImport: true
      }
    }
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  // Only update the `/challenges` page.
  if (page.path.match(/^\/challenges/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = '/challenges/*';
    // Update the page.
    createPage(page);
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type ChallengeNode implements Node {
      challengeFiles: [FileContents]
      url: String
    }
    type FileContents {
      fileKey: String
      ext: String
      name: String
      contents: String
      head: String
      tail: String
      editableRegionBoundaries: [Int]
    }
  `;
  createTypes(typeDefs);
};

// TODO: this broke the React challenges, not sure why, but I'll investigate
// further and reimplement if it's possible and necessary (Oliver)
// I'm still not sure why, but the above schema seems to work.
// Typically the schema can be inferred, but not when some challenges are
// skipped (at time of writing the Chinese only has responsive web design), so
// this makes the missing fields explicit.
// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions;
//   const typeDefs = `
//     type ChallengeNode implements Node {
//       question: Question
//       videoId: String
//       required: ExternalFile
//       files: ChallengeFile
//     }
//     type Question {
//       text: String
//       answers: [String]
//       solution: Int
//     }
//     type ChallengeFile {
//       indexhtml: FileContents
//       indexjs: FileContents
//       indexjsx: FileContents
//     }
//     type ExternalFile {
//       link: String
//       src: String
//     }
//     type FileContents {
//       key: String
//       ext: String
//       name: String
//       contents: String
//       head: String
//       tail: String
//     }
//   `;
//   createTypes(typeDefs);
// };
