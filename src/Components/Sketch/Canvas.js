import React from 'react';
import Sketch from 'react-p5';
import './Canvas.css';

class Canvas extends React.Component {
    render() {
        let pts = [];
        return (
        <div className="SketchContainer">
            <Sketch
            setup={
              (p5, canvasParentRef) => {
                p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
            }}
            draw={
                p5 => {
                      var startRad = 50;
                      var curPt = p5.createVector(p5.mouseX, p5.mouseY, startRad);
                      pts.push(curPt);
                      if(pts.length > 50){
                        pts.shift(); //rm head
                      }

                      p5.background(33, 33, 33);

                      for (var i = 0; i < pts.length; i++){
                        p5.stroke(50);

                        p5.circle(
                          pts[i].x,
                          pts[i].y,
                          pts[i].z--,
                        );

                        // p5.line(
                        //   p5.windowWidth / 2., p5.windowHeight / 2., 
                        //   pts[i].x, pts[i].y
                        // );
                      }

                      if(p5.mouseIsPressed){
                        pts = [];
                      }
                }
            }
		/>
        </div>);
    }
}

export default Canvas;