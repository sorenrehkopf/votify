import React, { Component } from 'react';

import * as d3 from 'd3';
import socket from '../services/socketService.jsx';
import Http from '../services/httpService.jsx';

var width = window.innerWidth,
    height = window.innerHeight - 300,
    strength = 0.25,
    radius = 50;

var svg;

// simulation is a collection of forces telling circles where to go

var forceX = d3.forceX( function(d) {
  if(d.name === 'Song A') {
     return width / 2 - radius*7;
   } else {
     return width / 2 + radius;
   }
}).strength(strength)
var forceY = d3.forceY( d => height / 2).strength(strength)
var forceCollide = d3.forceCollide( d => radius + 5);

var simulation = d3.forceSimulation()
  .force('x', forceX)
  .force('y', forceY)
  .force('collide', forceCollide)


function doStuff(votes){
  console.log(votes);
  iChooseYou(votes);
  simulation
      .force('x', forceX)
      .alphaTarget(strength)
      .restart()
}

function iChooseYou(votes) {
  var evees = svg.selectAll('.evee')
    .data(votes)
    // .enter()
    // .append('circle')
    .attr('data-song', d => d.name.replace(/\s/g, ''))
    .style('width', radius)
    .style('height', radius)

  simulation.nodes(votes)
    .on('tick', ticked)

  // Fires everytime on tick
  function ticked() {
    evees
      .style('transform', d => 'translate(' + d.x + 'px,' + d.y + 'px)')
  }
}

function createBubbles(votes) {
  var bubbles = svg.selectAll('.bubble')
    .data(votes)
    // .enter()
    // .append('circle')
    .attr('data-song', d => d.name.replace(/\s/g, ''))
    .attr('r', radius)

  simulation.nodes(votes)
    .on('tick', ticked)

  // Fires everytime on tick
  function ticked() {
    bubbles
      .attr('cx', d => d.x )
      .attr('cy', d => d.y );
  }
}

var names = ['A','B','C'];

class Results extends Component {
  displayName: 'ResultsSVG';

  constructor(){
    super();
    this.state = {
      votes:[]
    }
  }

  componentWillMount() {
		var thiz = this;
		socket.on('new-vote', thiz.getVotes.bind(thiz));
	}

  componentDidMount() {
    var votes = [];
    svg = d3.select('#visualization')
      .style('width', width + 'px')
      .style('height', height + 'px')

    this.props.songs.forEach((song,i)=>{
      var name = 'Song '+names[i];
      for(var j=0;j<song.score;j++){
        votes.push({name:name});
      }
    });
    console.log(this.props.songs);
    this.setState({
      votes:votes
    });
    doStuff(this.state.votes);
  }

  componentWillReceiveProps(){
    console.log('receiving props!')
    this.setState({
      votes:[]
    });
    doStuff(this.state.votes);
  }

  componentDidUpdate(){
    var votes = [];
    doStuff(this.state.votes);
    console.log('updating!!');
  }

  getVotes(data) {
    console.log(data.which);
    var name = Number(data.which)?'Song B':'Song A';
    var votes = this.state.votes;
    votes.push({name: name});
    this.setState({
      votes:votes
    });
  }

  render() {
    var circles = this.state.votes.map((vote,i)=>{
      return (
        <div className="evee" key={i}></div>
      );
    });
    return (
      <div id='visualization'>
        {circles}
      </div>
    )
  }
}

// .attr('width', width)
// .attr('height', height)
// .attr('transform', 'translate(0,0)');

// <circle className="bubble" key={i}></circle>

// <svg id='visualization' className='bubbles'>
//   {circles}
// </svg>

export default Results;
