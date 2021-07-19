// eslint-disable-next-line import/unambiguous
declare module '@freecodecamp/react-bootstrap';
declare module '@freecodecamp/strip-comments';
declare module '@types/react-redux';
declare module '@types/validator';
declare module '@types/lodash-es';
declare module 'react-lazy-load';
declare module '*.svg' {
  const content: string;
  export default content;
}
declare namespace NodeJS {
  interface Global {
    MathJax: {
      Hub: {
        Config: (attributes: {
          tex2jax: {
            inlineMath: Array<string[]>;
            processEscapes: boolean;
            processClass: string;
          };
        }) => void;
        Queue: (attributes: unknown[]) => void;
      };
    };
  }
}
