import React from 'react';
import ReactDOM from 'react-dom';

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
      <div>{title}</div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('index'));

export default Index;
