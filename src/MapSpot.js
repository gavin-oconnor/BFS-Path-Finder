import React from 'react'

const MapSpot = ({rows, cols, row, col, val, onSpotClick}) => {
    var colors = [[255,255,255],[50, 158, 168],[255, 154, 3],[156, 156, 156],[255,0,0]]
    const rowWidth = parseInt(500 / rows);
    const rowHeight = parseInt(500 / cols);
    const length = Math.min(rowWidth,rowHeight);
    const styling = {
        width: `${length}px`,
        height: `${length}px`,
        backgroundColor: `rgb(${colors[val][0]},${colors[val][1]},${colors[val][2]})`
     }
  return (
    <div className="map-spot" style={styling} onClick={() => onSpotClick(row,col)}/>
  )
}

export default MapSpot