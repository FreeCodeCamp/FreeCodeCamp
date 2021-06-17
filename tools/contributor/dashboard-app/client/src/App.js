import React, { Component } from 'react';
import styled from 'styled-components';

import FreeCodeCampLogo from './assets/freeCodeCampLogo';
import Tabs from './components/Tabs';
import Search from './components/Search';
import Pareto from './components/Pareto';
import Repos from './components/Repos';
import Footer from './components/Footer';

import { ENDPOINT_INFO } from './constants';

const PageContainer = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 991px) {
    margin-top: 135px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 960px;
  width: 90vw;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 #777;
`;

const AppNavBar = styled.nav`
  margin: 0;
  padding: 0;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.primary};
  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

const logoStyle = { paddingLeft: '30px' };

const titleStyle = { margin: '0', padding: '0' };

class App extends Component {
  state = {
    view: 'search',
    footerInfo: null
  };

  updateInfo() {
    fetch(ENDPOINT_INFO)
      .then((response) => response.json())
      .then(({ ok, numPRs, prRange, lastUpdate }) => {
        if (ok) {
          const footerInfo = { numPRs, prRange, lastUpdate };
          this.setState((prevState) => ({ footerInfo }));
        }
      })
      .catch(() => {
        // do nothing
      });
  }

  handleViewChange = ({ target: { id } }) => {
    const view = id.replace('tabs-', '');
    this.setState((prevState) => ({ ...this.clearObj, view }));
    if (view === 'reports' || view === 'search') {
      this.updateInfo();
    }
  };

  componentDidMount() {
    this.updateInfo();
  }

  render() {
    const {
      handleViewChange,
      state: { view, footerInfo }
    } = this;
    return (
      <>
        <AppNavBar>
          <a
            href="https://www.freecodecamp.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={logoStyle}
          >
            <FreeCodeCampLogo />
          </a>
          <h1 style={titleStyle}>Contributor Tools</h1>
          <ul className="app-menu">
            <li>
              <a
                href="https://github.com/freeCodeCamp/freeCodeCamp"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </AppNavBar>
        <PageContainer>
          <Tabs view={view} onViewChange={handleViewChange} />
          <Container>
            {view === 'search' && <Search />}
            {view === 'reports' && <Pareto />}
            {view === 'boilerplates' && (
              <Repos
                key="boilerplates"
                dataFilter={(repo) => repo._id.includes('boilerplate')}
              />
            )}
            {view === 'other' && (
              <Repos
                key="other"
                dataFilter={(repo) =>
                  !repo._id.includes('boilerplate') &&
                  repo._id !== 'freeCodeCamp'
                }
              />
            )}
          </Container>
          {footerInfo && <Footer footerInfo={footerInfo} />}
        </PageContainer>
      </>
    );
  }
}
export default App;
