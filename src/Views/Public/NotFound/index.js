import React from 'react';
import './index.scss';

import NotFoundBackground from '../../../Statics/Gif/CZdBKjO.gif'

// Source code: https://codepen.io/ajerez/pen/aOmJew
export default function NotFound() {

  let NotFoundBody = {
    background: ` url(${NotFoundBackground}) no-repeat center center fixed`, 
    backgroundSize: `cover`,
    fontFamily: `sans-serif`,
    backgroundColor: `#342643`,
    height: '100vh',
}

  return (
    <div style={NotFoundBody}>
      <div className="NotFound-text-wrapper">
        <div className="NotFound-title" data-content="404">
            404
        </div>

        <div className="NotFound-subtitle" data-content="Oops, the page you're looking for doesn't exist">
            Oops, the page you're looking for doesn't exist.
        </div>

        <div className="NotFound-buttons">
          <a className="NotFound-button" href="/signin">Go to homepage</a>
        </div>
      </div>
    </div>
  );
}