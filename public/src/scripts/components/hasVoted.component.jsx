import React, { Component } from 'react';

class Voted extends Component {

	render(){

    var el = null;
    if (this.props.showMe) {
      el = (<div className="voted">
        <div className="flex flex__center">
          <div className="flex__content center">
            <h1>Oh Yes</h1>
            <img src="build/assets/thumbs-up-01.svg" alt="Thumbs Up" />
          </div>
        </div>
      </div>)
    }

    return el;
	}

}

export default Voted;
