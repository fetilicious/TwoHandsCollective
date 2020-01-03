import React from 'react';
import './Homepage.css';
import Canvas from './../Sketch/Canvas';

const Sketch = require('react-p5');

class Homepage extends React.Component {
    render() {
      return <div className="HomePage">
        <Canvas></Canvas>
        <p className="TwoHandsLogo"/>
        <div className="Title">
            TWO HANDS COLLECTIVE
        </div>
        <div className="Subtitle">
            Coming Soon
        </div>
        </div>
    }
}

export default Homepage;