import React from 'react';
import Sketch from 'react-p5';
import './Canvas.css';

class Canvas extends React.Component {
    render() {
        let lines = [];
        return (
        <div className="SketchContainer">
            <Sketch
            setup={(p5, canvasParentRef) => {
                p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
            }}
            draw={
                p5 => {
                    if(p5.pmouseX !== p5.mouseX && p5.pmouseY !== p5.mouseY){
                        var curPt = p5.createVector(p5.mouseX, p5.mouseY);
                        lines.push(curPt);
                      }
                     
                      console.log(lines.length);
                      if(lines.length > 50){
                        lines.shift(); //rm head
                      }
                     
                      for (var i = 0; i < lines.length; i++){
                        p5.stroke(256);
                        p5.line(0, 0, lines[i].x, lines[i].y);
                      }
                }
            }
		/>
        </div>);
    }
}

export default Canvas;