import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EmailSignUp from './email-sign-up';

const middlewares = [];
const mockStore = configureStore(middlewares);

jest.mock('../analytics');

describe('<EmailSignUp />', () => {
  let component;
  let tree;

  describe('Not logged in users', () => {
    beforeEach(() => {
      const initialState = { app: { appUsername: '' } };
      const store = mockStore(initialState);
      const container = renderer.create(
        <Provider store={store}>
          <EmailSignUp />
        </Provider>
      );

      component = container.root;
      tree = container.toJSON();
    });

    it('it should render correctly', () => {
      expect(tree).toMatchSnapshot();
    });

    it('it should have a main title', () => {
      const nodeMainTitle = component.findByType('h1');
      expect(nodeMainTitle).toBeTruthy();
    });

    it('it should not have the sign up email section', () => {
      const sectionEmailSignUp = component.findAllByProps({
        className: 'email-sign-up'
      }).length;

      expect(sectionEmailSignUp).toBe(0);
    });

    it('it should have a intro description section', () => {
      const sectionIntroDescription = component.findByProps({
        className: 'intro-description'
      });

      expect(sectionIntroDescription).toBeTruthy();
    });

    it('it should have a cta to learn page', () => {
      const ctaToLearnPage = component.findByProps({
        className: 'btn link-btn btn-lg',
        href: '/learn'
      });

      expect(ctaToLearnPage).toBeTruthy();
    });
  });

  describe('Logged in users', () => {
    beforeEach(() => {
      const initialState = { app: { appUsername: 'John Doe' } };
      const store = mockStore(initialState);
      store.dispatch = jest.fn();

      const container = renderer.create(
        <Provider store={store}>
          <EmailSignUp />
        </Provider>
      );

      component = container.root;
      tree = container.toJSON();
    });

    it('it should render correctly', () => {
      expect(tree).toMatchSnapshot();
    });

    it('it should have a main title', () => {
      const nodeMainTitle = component.findByType('h1');
      expect(nodeMainTitle).toBeTruthy();
    });

    it('it should have the sign up email section', () => {
      const sectionEmailSignUp = component.findByProps({
        className: 'email-sign-up'
      });

      expect(sectionEmailSignUp).toBeTruthy();
    });

    it('it should have the option to opt-in newsletter subscription', () => {
      const ctaAcceptNewsletter = component.findByProps({
        'data-testid': 'accept_newsletter'
      });

      expect(ctaAcceptNewsletter).toBeTruthy();
    });

    it('it should hide the subscription option after user opt-in', () => {
      const ctaAcceptNewsletter = component.findByProps({
        'data-testid': 'accept_newsletter'
      });

      let sectionEmailSignUp = component.findAllByProps({
        className: 'email-sign-up'
      }).length;

      expect(sectionEmailSignUp).toBeTruthy();

      act(() => {
        ctaAcceptNewsletter.props.onClick();
      });

      // Look up element again
      sectionEmailSignUp = component.findAllByProps({
        className: 'email-sign-up'
      }).length;

      expect(sectionEmailSignUp).toBe(0);
    });

    it('it should notify the app that user has opt-in', () => {
      const ctaAcceptNewsletter = component.findByProps({
        'data-testid': 'accept_newsletter'
      });

      act(() => {
        ctaAcceptNewsletter.props.onClick();
      });

      expect(component.props.store.dispatch).toHaveBeenCalledTimes(1);
      expect(component.props.store.dispatch).toHaveBeenCalledWith({
        payload: { sendQuincyEmail: true },
        type: 'settings.updateUserFlag'
      });

      expect(1).toEqual(1);
    });

    it('it should have the option to opt-out newsletter subscription', () => {
      const ctaDeclineNewsletter = component.findByProps({
        'data-testid': 'decline_newsletter'
      });

      expect(ctaDeclineNewsletter).toBeTruthy();
    });

    it('it should hide the subscription option after user opt-out', () => {
      const ctaDeclineNewsletter = component.findByProps({
        'data-testid': 'decline_newsletter'
      });

      let sectionEmailSignUp = component.findAllByProps({
        className: 'email-sign-up'
      }).length;

      expect(sectionEmailSignUp).toBeTruthy();

      act(() => {
        ctaDeclineNewsletter.props.onClick();
      });

      // Look up element again
      sectionEmailSignUp = component.findAllByProps({
        className: 'email-sign-up'
      }).length;

      expect(sectionEmailSignUp).toBe(0);
    });

    it('it should notify the app that user has opt-out', () => {
      const ctaDeclineNewsletter = component.findByProps({
        'data-testid': 'decline_newsletter'
      });

      act(() => {
        ctaDeclineNewsletter.props.onClick();
      });

      expect(component.props.store.dispatch).toHaveBeenCalledTimes(1);
      expect(component.props.store.dispatch).toHaveBeenCalledWith({
        payload: { sendQuincyEmail: false },
        type: 'settings.updateUserFlag'
      });

      expect(1).toEqual(1);
    });

    it('it should have a intro description section', () => {
      const sectionIntroDescription = component.findByProps({
        className: 'intro-description'
      });

      expect(sectionIntroDescription).toBeTruthy();
    });

    it('it should have a cta to learn page', () => {
      const ctaToLearnPage = component.findByProps({
        className: 'btn link-btn btn-lg',
        href: '/learn'
      });

      expect(ctaToLearnPage).toBeTruthy();
    });
  });
});
