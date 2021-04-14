import { withPrefix } from 'gatsby';
import i18next from 'i18next';
import React from 'react';

export const getheadTagComponents = () => {
  const socialImage =
    'https://cdn.freecodecamp.org/platform/universal/fcc_meta_1920X1080-indigo.png';
  const pathToBootstrap = withPrefix('/css/bootstrap.min.css');
  return [
    <link
      as='style'
      href={pathToBootstrap}
      key='bootstrap-min-preload'
      rel='preload'
    />,
    <link href={pathToBootstrap} key='bootstrap-min' rel='stylesheet' />,
    <meta content='freeCodeCamp.org' key='og:title' name='og:title' />,
    <meta
      content={i18next.t('metaTags:social-description')}
      key='og:description'
      name='og:description'
    />,
    <meta content={socialImage} key='og:image' property='og:image' />,
    <meta
      content='summary_large_image'
      key='twitter:card'
      name='twitter:card'
    />,
    <meta
      content={socialImage}
      key='twitter:image:src'
      name='twitter:image:src'
    />,
    <meta
      content='freeCodeCamp.org'
      key='twitter:title'
      name='twitter:title'
    />,
    <meta
      content={i18next.t('metaTags:social-description')}
      key='twitter:description'
      name='twitter:description'
    />,
    <meta
      content='$ilp.uphold.com/LJmbPn7WD4JB'
      key='monetization'
      name='monetization'
    />
  ];
};

export const getPostBodyComponents = pathname => {
  let scripts = [];
  const challengesPathRE = new RegExp('/learn/[^/]+/[^/]+/[^/]+/?$');
  const donatePathRE = new RegExp('/donate/?$');
  const mathJaxScriptElement = (
    <script
      async={false}
      id='mathjax'
      key='mathjax'
      src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML'
      type='text/javascript'
    />
  );
  const stripeScriptElement = (
    <script
      async={true}
      id='stripe-js'
      key='stripe-js'
      src='https://js.stripe.com/v3/'
      type='text/javascript'
    />
  );

  if (
    pathname.includes('/learn/coding-interview-prep/rosetta-code') ||
    pathname.includes('/learn/coding-interview-prep/project-euler')
  ) {
    scripts.push(mathJaxScriptElement);
  }
  if (challengesPathRE.test(pathname) || donatePathRE.test(pathname)) {
    scripts.push(stripeScriptElement);
  }
  return scripts.filter(Boolean);
};
