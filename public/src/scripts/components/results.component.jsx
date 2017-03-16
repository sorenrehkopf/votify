import React, { Component } from 'react';

import * as d3 from 'd3';

class Results extends Component {
  componentDidMount() {
    this.setContent();
  }

  setContext() {
  
  }

  render() {
    return (
      <svg className="visualization bubbles"></svg>
    )
  }
}

export default Results;
