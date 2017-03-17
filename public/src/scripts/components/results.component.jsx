import React, { Component } from 'react';

import * as d3 from 'd3';

class Results extends Component {
  displayName: 'ResultsSVG';

  propTypes: {
    id: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    radius: PropTypes.number,
    strength: PropTypes.number,
    voteA: PropTypes.number,
    voteB: PropTypes.number
  }

  votes: [];

  componentDidMount() {
    this.drawResults();
  }

  drawResults() {
    const context = this.setContext();
    const simulation = this.applyForce();
    this.createBubbles(context);
    //this.applySimulation(simulation);
    //this.ticked();
  }

  setContext() {
    const { width, height, id } = this.props;
    return (
      d3.select(id)
        .attr('width', width)
        .attr('height', height)
    )
  }

  applyForce() {
    return d3.forceSimulation()
      .force('x', d3.forceX( function(d) {
        if(d.name === 'Song A') {
           return this.props.width / 2 - this.props.radius*2;
         } else {
           return this.props.width / 2 + this.props.radius*3;
         }
      }).strength(this.props.strength))
      .force('y', d3.forceY( d => this.props.height / 2).strength(this.props.strength))
      .force('collide', d3.forceCollide( d => this.props.radius + 5))
  }

  createBubbles(context) {
    return (
      context.selectAll('.bubble')
        .data({ pollResults: this.votes })
        .enter()
        .append('circle')
        .attr('className', 'bubble')
        .attr('data-song', d => d.name.replace(/\s/g, ''))
        .attr('r', this.props.radius)
    )
  }

  applySimulation(simulation) {
    return (
      simulation.nodes(this.votes)
        .on('tick', ticked)
    )
  }

  ticked() {
    return bubbles
      .attr('cx', d => d.x )
      .attr('cy', d => d.y );
  }

  render() {
    return (
      <svg id='visualization' className='bubbles'></svg>
    )
  }
}

export default Results;
