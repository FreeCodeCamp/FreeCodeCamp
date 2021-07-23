import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../../redux/createStore';

import { CertificationSettings } from './Certification';

jest.mock('../../analytics');

function renderWithRedux(ui) {
  return render(<Provider store={createStore()}>{ui}</Provider>);
}

describe('<certification />', () => {
  // shallow rendering does not render children component
  // form buttons are not included in shallow render
  it('Should render show cert button for claimed legacy cert', () => {
    renderWithRedux(<CertificationSettings {...defaultTestProps} />);

    expect(
      screen.getByRole('link', {
        name: 'buttons.show-cert'
      })
    ).toHaveAttribute(
      'href',
      '/certification/developmentuser/legacy-data-visualization'
    );
  });

  // full forms with unclaimed certs should not shallow render show cert button
  it('Should not render show cert button for unclaimed cert with completed projects', () => {
    renderWithRedux(<CertificationSettings {...defaultTestProps} />);

    const allClaimedCerts = screen.getAllByRole('link', {
      name: 'buttons.show-cert'
    });

    allClaimedCerts.forEach(cert => {
      expect(cert).not.toHaveAttribute(
        'href',
        '/certification/developmentuser/legacy-back-end'
      );
    });
  });

  // empty forms with unclaimed certs should not shallow render show cert button
  it('Should not render show cert button for cert with no completed projects', () => {
    renderWithRedux(<CertificationSettings {...defaultTestProps} />);

    const allClaimedCerts = screen.getAllByRole('link', {
      name: 'buttons.show-cert'
    });

    allClaimedCerts.forEach(cert => {
      expect(cert).not.toHaveAttribute(
        'href',
        '/certification/developmentuser/legacy-front-end'
      );
    });
  });

  it('Render button when only solution is present', () => {
    renderWithRedux(<CertificationSettings {...propsForOnlySolution} />);

    expect(
      screen.getByRole('link', {
        name: 'buttons.show-solution'
      })
    ).toHaveAttribute('href', 'https://github.com/freeCodeCamp/freeCodeCamp');
  });

  it('Render button when both githubLink and solution is present', () => {
    renderWithRedux(<CertificationSettings {...propsForOnlySolution} />);

    const links = screen.getAllByRole('menuitem');
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
    renderWithRedux(<CertificationSettings {...propsForOnlySolution} />);

    const button = screen.getByText('buttons.show-code');
    expect(button).toBeInTheDocument();
  });
});

const defaultTestProps = {
  completedChallenges: [
    {
      id: 'bd7156d8c242eddfaeb5bd13',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: 'bd7155d8c242eddfaeb5bd13',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: 'bd7154d8c242eddfaeb5bd13',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: 'bd7153d8c242eddfaeb5bd13',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: 'bd7168d8c242eddfaeb5bd13',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: 'bd7178d8c242eddfaeb5bd13',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: 'bd7188d8c242eddfaeb5bd13',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: 'bd7198d8c242eddfaeb5bd13',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: 'bd7108d8c242eddfaeb5bd13',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: 'bd7158d8c443edefaeb5bdef',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: 'bd7158d8c443edefaeb5bdff',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: 'bd7158d8c443edefaeb5bd0e',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: 'bd7158d8c443edefaeb5bdee',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: 'bd7158d8c443edefaeb5bd0f',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: 'bd7158d8c443eddfaeb5bdef',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: 'bd7158d8c443eddfaeb5bdff',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: 'bd7158d8c443eddfaeb5bd0e',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: 'bd7158d8c443eddfaeb5bd0f',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: 'bd7158d8c443eddfaeb5bdee',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: '5e444147903586ffb414c94c',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: '5e444147903586ffb414c94d',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: '5e444147903586ffb414c94e',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: '5e444147903586ffb414c94f',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: '5e44414f903586ffb414c950',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: '5e46f7e5ac417301a38fb928',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: '5e46f7e5ac417301a38fb929',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: '5e46f7f8ac417301a38fb92a',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: '5e46f802ac417301a38fb92b',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: '5e4f5c4b570f7e3a4949899f',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: 'bd7157d8c242eddfaeb5bd13',
      completedDate: 1554272923799,
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    }
  ],
  createFlashMessage: () => {},
  is2018DataVisCert: false,
  isApisMicroservicesCert: false,
  isBackEndCert: false,
  isDataVisCert: true,
  isFrontEndCert: false,
  isFrontEndLibsCert: false,
  isFullStackCert: false,
  isHonest: false,
  isInfosecQaCert: false,
  isQaCertV7: false,
  isInfosecCertV7: false,
  isJsAlgoDataStructCert: false,
  isRespWebDesignCert: false,
  isSciCompPyCertV7: false,
  isDataAnalysisPyCertV7: false,
  isMachineLearningPyCertV7: false,
  username: 'developmentuser',
  verifyCert: () => {},
  errors: {},
  submit: () => {}
};

const contents = 'This is not JS';
const ext = 'js';
const fileKey = 'indexjs';
const name = 'index';
const path = 'index.js';

const propsForOnlySolution = {
  ...defaultTestProps,
  completedChallenges: [
    {
      id: '5e46f802ac417301a38fb92b',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp'
    },
    {
      id: '5e4f5c4b570f7e3a4949899f',
      solution: 'https://github.com/freeCodeCamp/freeCodeCamp1',
      githubLink: 'https://github.com/freeCodeCamp/freeCodeCamp2'
    },
    {
      id: '5e46f7f8ac417301a38fb92a',
      challengeFiles: [
        {
          contents,
          ext,
          fileKey,
          name,
          path
        }
      ]
    }
  ]
};
