import axios from 'axios';
import { throwError } from 'rxjs';

// value used to break browser ajax caching
const cacheBreakerValue = Math.random();

export function createFetchScript() {
  const cache = new Map();
  return async function fetchScript({
    src,
    cacheBreaker = false,
    crossDomain = true
  } = {}) {
    if (!src) {
      throw new Error('No source provided for script');
    }
    if (cache.has(src)) {
      return cache.get(src);
    }
    const url = cacheBreaker ? `${src}?cacheBreaker=${cacheBreakerValue}` : src;
    const script = await axios
      .get({ url, crossDomain })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Request error: ' + res.status);
        }
      })
      .then(({ data }) => data)
      .then(script => `<script>${script}</script>`)
      .catch(() => '');

    cache.set(src, script);
    return script;
  };
}

export const fetchScript = createFetchScript();

export function createFetchLink() {
  const cache = new Map();
  return async function fetchLink({
    link: href,
    raw = false,
    crossDomain = true
  } = {}) {
    if (!href) {
      return throwError(new Error('No source provided for link'));
    }
    if (cache.has(href)) {
      return cache.get(href);
    }
    // css files with `url(...` may not work in style tags
    // so we put them in raw links
    if (raw) {
      const link = `<link href=${href} rel='stylesheet' />`;
      cache.set(href, link);
      return link;
    }
    const link = await axios
      .get({ url: href, crossDomain })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Request error: ' + res.status);
        }
      })
      .then(({ data }) => data)
      .then(styles => `<style>${styles}</style>`)
      .catch(() => '');
    cache.set(href, link);
    return link;
  };
}

export const fetchLink = createFetchLink();
