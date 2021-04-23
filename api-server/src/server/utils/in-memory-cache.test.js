/* global describe beforeEach expect it */
import sinon from 'sinon';
import inMemoryCache from './in-memory-cache';

describe('InMemoryCache', () => {
  let reportErrorStub;
  const theAnswer = 42;
  const before = 'before';
  const after = 'after';
  const emptyCacheValue = null;

  beforeEach(() => {
    reportErrorStub = sinon.spy();
  });

  it('throws if no report function is passed as a second argument', () => {
    expect(() => inMemoryCache(null)).toThrowError(
      'No reportError function specified for this in-memory-cache'
    );
  });

  describe('get', () => {
    it('returns an initial value', () => {
      const cache = inMemoryCache(theAnswer, reportErrorStub);
      expect(cache.get()).toBe(theAnswer);
    });
  });

  describe('update', () => {
    it('updates the cached value', () => {
      const cache = inMemoryCache(before, reportErrorStub);
      cache.update(() => after);
      expect(cache.get()).toBe(after);
    });

    it('can handle promises correctly', done => {
      const cache = inMemoryCache(before, reportErrorStub);
      const promisedUpdate = () => new Promise(resolve => resolve(after));
      cache.update(promisedUpdate).then(() => {
        expect(cache.get()).toBe(after);
        done();
      });
    });

    it('reports errors thrown from the update function', () => {
      const reportErrorStub = sinon.spy();
      const cache = inMemoryCache(before, reportErrorStub);

      const updateError = new Error('An update error');
      const updateThatThrows = () => {
        throw updateError;
      };

      cache.update(updateThatThrows);
      expect(reportErrorStub.calledWith(updateError)).toBe(true);
    });
  });

  describe('clear', () => {
    it('clears the  cache', () => {
      expect.assertions(2);
      const cache = inMemoryCache(theAnswer, reportErrorStub);
      expect(cache.get()).toBe(theAnswer);
      cache.clear();
      expect(cache.get()).toBe(emptyCacheValue);
    });
  });
});
