import React from 'react';
import ReactDOM from 'react-dom';

import Navigation from './modules/Navigation';
import FavoriteBeers from './modules/FavoriteBeers';

import './style.scss';

export class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Test application',
    };
  }

  render() {
    const {
      title,
    } = this.state;

    return (
      <div>
        <Navigation />
        <div className="container page-container">
          {title}
          <FavoriteBeers />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('index'));

export default Index;
