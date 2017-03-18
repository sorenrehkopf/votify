import React, { Component } from 'react';

import * as d3 from 'd3';
import socket from '../services/socketService.jsx';
import Http from '../services/httpService.jsx';

// var repeat = setInterval(function(){
//   dataInputs.interval(50, function(request){
//     voteA += request;
//     votes.push({
//       name: 'Song A',
//       total: voteA
//     });
//   });
//   dataInputs.interval(20, function(request){
//     voteB += request;
//     votes.push({
//       name: 'Song B',
//       total: voteB
//     });
//   });

//   console.log(votes);
//   createBubbles();
// }, 2000);

var width = window.innerWidth,
    height = window.innerHeight - 300,
    strength = 0.5,
    radius = 25;

var svg;

// simulation is a collection of forces telling circles where to go

var forceX = d3.forceX( function(d) {
  if(d.name === 'Song A') {
     return width / 2 - radius*2;
   } else {
     return width / 2 + radius*3;
   }
}).strength(strength)
var forceY = d3.forceY( d => height / 2).strength(strength)
var forceCollide = d3.forceCollide( d => radius + 5);

var simulation = d3.forceSimulation()
  .force('x', forceX)
  .force('y', forceY)
  .force('collide', forceCollide)


function doStuff(votes){
  createBubbles(votes);
  simulation
      .force('x', forceX)
      .alphaTarget(strength)
      .restart()
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
        .attr('width', width)
        .attr('height', height)
        .attr('transform', 'translate(0,0)');
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
  }

  getVotes(data) {
    var name = Number(data.which)?'Song B':'Song A';
    var votes = this.state.votes;
    votes.push({name: name});
    this.setState({
      votes:votes
    });
  }

  render() {
    var circles = this.state.votes.map((vote,i)=>{
      return (<circle className="bubble" key={i}></circle>);
    });
    return (
      <svg id='visualization' className='bubbles'>
        {circles}
      </svg>
    )
  }
}

export default Results;
