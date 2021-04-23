import PropTypes from 'prop-types';
import React, { useState } from 'react';
import LazyLoad from 'react-lazy-load';

import './image-loader.css';

const propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.number,
  loadedClassName: PropTypes.string,
  loadingClassName: PropTypes.string,
  offsetVertical: PropTypes.number,
  src: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.number
};

const ImageLoader = ({
  className = '',
  loadedClassName = 'img-loaded',
  loadingClassName = 'img-loading',
  offsetVertical = 100,
  alt,
  src,
  style,
  width,
  height
}) => {
  const [loaded, setLoaded] = useState(false);
  const fullClassName = `${className} ${
    loaded ? loadedClassName : loadingClassName
  }`;
  return (
    <LazyLoad
      debounce={false}
      height={height}
      offsetVertical={offsetVertical}
      width={width}
    >
      {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
      <img
        alt={alt}
        className={fullClassName}
        onLoad={() => setLoaded(true)}
        src={src}
        style={style}
      />
    </LazyLoad>
  );
};
ImageLoader.propTypes = propTypes;
export default ImageLoader;
