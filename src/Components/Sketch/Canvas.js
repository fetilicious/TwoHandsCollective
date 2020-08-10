import React from 'react';
import Sketch from 'react-p5';
import Boid from './Boids'
import './Canvas.css';

class Canvas extends React.Component {
    render() {
        let boids = [];
        let globalScale = 1.5;
        return (
        <div className="SketchContainer">
            <Sketch
            setup={
              (p5, canvasParentRef) => {
                p5.createCanvas(p5.windowWidth, p5.windowHeight);
                p5.colorMode(p5.HSB, 360, 300/globalScale, 300/globalScale);
              
                for (let i = 0; i < 100; i++) {
                  let xpos = Math.random() * p5.windowWidth;
                  let ypos = Math.random() * p5.windowHeight;
                  let boid = new Boid(xpos, ypos);
                  boids.push(boid);
                }
                p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
            }}
            draw={
                p5 => {
                      p5.background('rgba(33, 33, 33, 0.01)');
                      boids.forEach(boid => {
                        boid.calculateNewVelocity(boids);
                        boid.calculateNewPosition();
                    
                        let hslValue = 180 + Math.atan2(boid.velocity.vx, boid.velocity.vy)*180/Math.PI;
                        let velocity = Math.sqrt(boid.velocity.vx*boid.velocity.vx + boid.velocity.vy*boid.velocity.vy);
                        //let velocityAngle = Math.atan2(boid.velocity.vx, boid.velocity.vy);
                        p5.fill(hslValue, velocity, velocity);
                        p5.stroke(hslValue, velocity, velocity);
                    
                        p5.circle(boid.xposition, boid.yposition, 10/globalScale);
                      });
                }
            }
		/>
        </div>);
    }
}

export default Canvas;