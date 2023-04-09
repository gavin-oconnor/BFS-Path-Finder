import React from 'react'

const Selectors = ({selected, setSelected}) => {
    var colors = [[50, 158, 168],[255, 154, 3],[156, 156, 156]]
    for(let i=0; i<3; i++) {
        colors[selected][i] *= 0.8;
    }
    return (
    <div className="selectors-container">
        <div className="selector left" 
        style={{backgroundColor: `rgb(${colors[0][0]},${colors[0][1]},${colors[0][2]})`}}
        onClick={() => setSelected(0)}
        >Start</div>
        <div className="selector" 
        style={{backgroundColor: `rgb(${colors[1][0]},${colors[1][1]},${colors[1][2]})`}}
        onClick={() => setSelected(1)}
        >End</div>
        <div className="selector right" 
        style={{backgroundColor: `rgb(${colors[2][0]},${colors[2][1]},${colors[2][2]})`}}
        onClick={() => setSelected(2)}
        >Wall</div>
    </div>
    )
}

export default Selectors