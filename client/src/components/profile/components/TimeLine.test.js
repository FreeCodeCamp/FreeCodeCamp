/* global expect */

import { render } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';
import React from 'react';
import TimeLine from './TimeLine';

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => ({
    allChallengeNode: {
      edges: [
        {
          node: {
            fields: {
              slug: ''
            },
            id: '5e46f802ac417301a38fb92b',
            title: 'Page View Time Series Visualizer'
          }
        },
        {
          node: {
            fields: {
              slug: ''
            },
            id: '5e4f5c4b570f7e3a4949899f',
            title: 'Sea Level Predictor'
          }
        },
        {
          node: {
            fields: {
              slug: ''
            },
            id: '5e46f7f8ac417301a38fb92a',
            title: 'Medical Data Visualizer'
          }
        }
      ]
    }
  }));
});

describe('<TimeLine />', () => {
  it('Render button when only solution is present', () => {
    const { container } = render(<TimeLine {...propsForOnlySolution} />);

    expect(
      container.querySelector('#btn-for-5e46f802ac417301a38fb92b')
    ).toHaveAttribute('href', 'https://github.com/freeCodeCamp/freeCodeCamp');
  });

  it('Render button when both githubLink and solution is present', () => {
    const { container } = render(<TimeLine {...propsForOnlySolution} />);

    const linkList = container.querySelector(
      '#dropdown-for-5e4f5c4b570f7e3a4949899f + ul'
    );
    const links = linkList.querySelectorAll('a');

    expect(links[0]).toHaveAttribute(
      'href',
      'https://github.com/freeCodeCamp/freeCodeCamp1'
    );

    expect(links[1]).toHaveAttribute(
      'href',
      'https://github.com/freeCodeCamp/freeCodeCamp2'
    );
  });

  it('rendering the correct button when files is present', () => {
    const { getByText } = render(<TimeLine {...propsForOnlySolution} />);

    const button = getByText('buttons.show-code');
    expect(button).toBeInTheDocument();
  });
});

const contents = 'This is not JS';
const ext = 'js';
const key = 'indexjs';
const name = 'index';
const path = 'index.js';

const propsForOnlySolution = {
  completedMap: [
    {
      id: '5e46f802ac417301a38fb92b',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp',
      completedDate: 1604311988825
    },
    {
      id: '5e4f5c4b570f7e3a4949899f',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp1',
      githubLink: 'https://github.com/freeCodeCamp/freeCodeCamp2',
      completedDate: 1604311988828
    },
    {
      id: '5e46f7f8ac417301a38fb92a',
      completedDate: 1604043678032,
      files: [
        {
          contents,
          ext,
          key,
          name,
          path
        }
      ]
    }
  ],
  username: 'developmentuser'
};
