import { Grid, ListGroup, ListGroupItem } from '@freecodecamp/react-bootstrap';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';

import ButtonSpacer from '../../components/helpers/ButtonSpacer';
import FullWidthRow from '../../components/helpers/FullWidthRow';
import LearnLayout from '../../components/layouts/Learn';
import { MarkdownRemark, AllChallengeNode } from '../../redux/propTypes';

import './intro.css';

const propTypes = {
  data: PropTypes.shape({
    markdownRemark: MarkdownRemark,
    allChallengeNode: AllChallengeNode
  })
};

function renderMenuItems({ edges = [] }) {
  return edges
    .map(({ node }) => node)
    .map(({ title, fields: { slug } }) => (
      <Link key={'intro-' + slug} to={slug}>
        <ListGroupItem>{title}</ListGroupItem>
      </Link>
    ));
}

function IntroductionPage({ data: { markdownRemark, allChallengeNode } }) {
  const { t } = useTranslation();
  const {
    html,
    frontmatter: { block }
  } = markdownRemark;
  const firstLesson = allChallengeNode && allChallengeNode.edges[0].node;
  const firstLessonPath = firstLesson
    ? firstLesson.fields.slug
    : '/strange-place';

  return (
    <LearnLayout>
      <Helmet>
        <title>{block} | freeCodeCamp.org</title>
      </Helmet>
      <Grid className='intro-layout-container'>
        <FullWidthRow>
          <div
            className='intro-layout'
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </FullWidthRow>
        <FullWidthRow>
          <Link
            className='btn btn-lg btn-primary btn-block'
            to={firstLessonPath}
          >
            {t('buttons.first-lesson')}
          </Link>
          <ButtonSpacer />
          <Link className='btn btn-lg btn-primary btn-block' to='/learn'>
            {t('buttons.view-curriculum')}
          </Link>
          <ButtonSpacer />
          <hr />
        </FullWidthRow>
        <FullWidthRow>
          <h2 className='intro-toc-title'>{t('learn.upcoming-lessons')}</h2>
          <ListGroup className='intro-toc'>
            {allChallengeNode ? renderMenuItems(allChallengeNode) : null}
          </ListGroup>
        </FullWidthRow>
      </Grid>
    </LearnLayout>
  );
}

IntroductionPage.displayName = 'IntroductionPage';
IntroductionPage.propTypes = propTypes;

export default IntroductionPage;

export const query = graphql`
  query IntroPageBySlug($slug: String!, $block: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        block
      }
      html
    }
    allChallengeNode(
      filter: { block: { eq: $block } }
      sort: { fields: [superOrder, order, challengeOrder] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          title
        }
      }
    }
  }
`;
