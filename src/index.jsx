import React from 'react';
import ReactDOM from 'react-dom';

import Navigation from './modules/Navigation';
import FavoriteBeers from './modules/FavoriteBeers';

import './style.scss';

export const Index = () => (
  <div>
    <Navigation />
    <div className="container page-container">
      <FavoriteBeers beersPerPage={4} defaultYear={1960} />
    </div>
  </div>
);

ReactDOM.render(<Index />, document.getElementById('index'));

export default Index;
