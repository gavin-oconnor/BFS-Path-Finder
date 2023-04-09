import React from 'react'
import { useState } from 'react'
import Inputs from './Inputs'
import MapSpot from './MapSpot'
import Selectors from './Selectors'
import useWindowDimensions from './windowDimensions'

const App = () => {
  const [rows,setRows] = useState(10)
  const [cols,setCols] = useState(10)
  const [start,setStart] = useState([-1,-1])
  const [end,setEnd] = useState([-1,-1])
  const [solved,setSolved] = useState(false)
  const [map, setMap] = useState([
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
  ]);

  
  const reset = () => {
    setStart([-1,-1])
    setEnd([-1,-1])
    var newMap = []
    for(let row=0; row<rows; row++) {
      var newRow = []
      for(let col=0; col<cols; col++) {
        newRow.push(0)
      }
      newMap.push(newRow)
    }
    setMap(newMap)
    setSolved(false)
  }
  const random = () => {
    var newMap = []
    for(let row=0; row<rows; row++) {
      var newRow = []
      for(let col=0; col<cols; col++) {
        newRow.push(0)
      }
      newMap.push(newRow)
    }
    var walls = Math.floor(Math.random() * 0.4 * rows * cols)
    for(let i=0; i<walls; i++) {
      var r = Math.floor(Math.random() * rows)
      var c = Math.floor(Math.random() * cols)
      newMap[r][c] = 3
    }
    var sr = Math.floor(Math.random() * rows)
    var sc = Math.floor(Math.random() * cols)
    newMap[sr][sc] = 1
    setStart([sr,sc])
    var er = Math.floor(Math.random() * rows)
    var ec = Math.floor(Math.random() * cols)
    newMap[er][ec] = 2
    setEnd([er,ec])
    setMap(newMap)

    
  }
  const bfs = () => {
    if(start[0] !== -1 && start[1] !== -1 && end[0] !== -1 && end[1] !== -1) {
      var path = []
      for(let row=0; row<rows; row++) {
        var tempRow = [];
        for(let col=0; col<cols; col++) {
          tempRow.push(0);
        }
        path.push(tempRow);
      }
      var q = [start]
      var seen = new Set()
      while(q.length > 0) {
        console.log(`Seen has ${seen.size} elements`)
        var curr = q.shift();
        
        var toAdd = `${curr[0]},${curr[1]}`
        if(seen.has(toAdd)) {
          continue;
        }
        seen.add(toAdd);
        if(curr[0] === end[0] && curr[1] === end[1]) {
          var newMap = [...map]
          var curr = path[end[0]][end[1]]
          while(curr[0] !== start[0] || curr[1] !== start[1]) {
            newMap[curr[0]][curr[1]] = 4
            curr = path[curr[0]][curr[1]]
            
          }
          setMap(newMap)
          setSolved(true);
          return
        }
        if(0 <= curr[0]-1 && curr[0]-1 < rows && !seen.has(`${curr[0]-1},${curr[1]}`) && map[curr[0]-1][curr[1]] !== 3) {
          q.push([curr[0]-1,curr[1]])
          path[curr[0]-1][curr[1]] = curr
        }
        if(0 <= curr[0]+1 && curr[0]+1 < rows && !seen.has(`${curr[0]+1},${curr[1]}`) && map[curr[0]+1][curr[1]] !== 3) {
          q.push([curr[0]+1,curr[1]])
          path[curr[0]+1][curr[1]] = curr
        }
        if(0 <= curr[1]-1 && curr[1]-1 < cols && !seen.has(`${curr[0]},${curr[1]-1}`) && map[curr[0]][curr[1]-1] !== 3) {
          q.push([curr[0],curr[1]-1])
          path[curr[0]][curr[1]-1] = curr
        }
        if(0 <= curr[1]+1 && curr[1]+1 < cols && !seen.has(`${curr[0]},${curr[1]+1}`) && map[curr[0]][curr[1]+1] !== 3) {
          q.push([curr[0],curr[1]+1])
          path[curr[0]][curr[1]+1] = curr
        }
      }
    }
    
  }
  const solvedBFS = (nS,nE) => {
    var st = nS
    var en = nE
    if(st === null) {
      st = start
    }
    if(en === null) {
      en = end;
    }
    var path = []
      for(let row=0; row<rows; row++) {
        var tempRow = [];
        for(let col=0; col<cols; col++) {
          tempRow.push(0);
        }
        path.push(tempRow);
      }
      var q = [st]
      var seen = new Set()
      while(q.length > 0) {
        var curr = q.shift();
        var toAdd = `${curr[0]},${curr[1]}`
        if(seen.has(toAdd)) {
          continue;
        }
        seen.add(toAdd);
        if(curr[0] === en[0] && curr[1] === en[1]) {
          var newMap = [...map]
          for(let row=0; row<rows; row++) {
            for(let col=0; col<cols; col++) {
              if(newMap[row][col] === 4) {
                newMap[row][col] = 0;
              }
            }
          }
          // console.log(newMap)
          // newMap.map(row => row.map(spot => spot === 4 ? 0 : spot))
          // console.log(newMap)
          var curr = path[en[0]][en[1]]
          while(curr[0] !== st[0] || curr[1] !== st[1]) {
            newMap[curr[0]][curr[1]] = 4
            curr = path[curr[0]][curr[1]]
            
          }
          setMap(newMap)
          setSolved(true);
          return
        }
        if(0 <= curr[0]-1 && curr[0]-1 < rows && !seen.has(`${curr[0]-1},${curr[1]}`) && map[curr[0]-1][curr[1]] !== 3) {
          q.push([curr[0]-1,curr[1]])
          path[curr[0]-1][curr[1]] = curr
        }
        if(0 <= curr[0]+1 && curr[0]+1 < rows && !seen.has(`${curr[0]+1},${curr[1]}`) && map[curr[0]+1][curr[1]] !== 3) {
          q.push([curr[0]+1,curr[1]])
          path[curr[0]+1][curr[1]] = curr
        }
        if(0 <= curr[1]-1 && curr[1]-1 < cols && !seen.has(`${curr[0]},${curr[1]-1}`) && map[curr[0]][curr[1]-1] !== 3) {
          q.push([curr[0],curr[1]-1])
          path[curr[0]][curr[1]-1] = curr
        }
        if(0 <= curr[1]+1 && curr[1]+1 < cols && !seen.has(`${curr[0]},${curr[1]+1}`) && map[curr[0]][curr[1]+1] !== 3) {
          q.push([curr[0],curr[1]+1])
          path[curr[0]][curr[1]+1] = curr
        }
      }
      var newMap = [...map]
      for(let row=0; row<rows; row++) {
        for(let col=0; col<cols; col++) {
          if(newMap[row][col] === 4) {
            newMap[row][col] = 0;
          }
        }
      }
    setMap(newMap)
  }
  const [selected,setSelected] = useState(0);
  const { height, width } = useWindowDimensions();
  const onSpotClick = (row,col) => {
    var newStart = null;
    var newEnd = null;
    var newMap = [...map];
    if(selected === 0) {
      console.log(start);
      if(start[0] !== -1) {
        newMap[start[0]][start[1]] = 0;
      }
      setStart([row,col])
      newStart = [row,col]
      }
    if(selected === 1) {
      if(end[0] !== -1) {
        newMap[end[0]][end[1]] = 0;
      }
      setEnd([row,col])
      newEnd = [row,col]
      }
    if(start[0] === row && start[1] === col) {
      setStart([-1,-1])
    }
    if(end[0] === row && end[1] === col) {
      setEnd([-1,-1])
    }
    if(map[row][col] === 3 && selected === 2) {
      newMap[row][col] = 0;
    } else {
      newMap[row][col] = selected+1;
    }
    setMap(newMap);
    if(solved) {
      solvedBFS(newStart,newEnd);
    }

  }
  
  const changeRows = (newRows) => {
    console.log(`first call, new rows = ${newRows} while rows = ${rows}`)
    if(newRows) {
      newRows = parseInt(newRows)
      var newMap = [...map];
      console.log(newRows > rows)
      if(newRows > rows) {
        console.log(`new rows = ${newRows}`)
        var newRow = [];
        for(let i=0; i<cols; i++) {
          newRow.push(0);
        }
        while(newMap.length < newRows){
          newMap.push(newRow);
        }
        setMap(newMap);
        console.log(newMap);
      }
      else if(newRows < rows) {
        var newNewMap = []
        for(let i=0; i<newRows; i++) {
          newNewMap.push(newMap[i]);
        }
        setMap(newNewMap);
        console.log(newNewMap);
      }
      setRows(newRows)
    }
  }

  const changeCols = (newCols) => {
    if(newCols) {
      newCols = parseInt(newCols)
      var newMap = [...map]
      if(newCols > cols) {
        for(let i=0; i<rows; i++) {
          for(let j=0; j<newCols-cols; j++) {
            newMap[i].push(0);
          }
          
        }
        setMap(newMap);
      }
      else if(newCols < cols) {
        var newNewMap = [];
        for(let i=0; i<rows; i++) {
          var newRow = [];
          for(let j=0; j<newCols; j++) {
            newRow.push(newMap[i][j]);
          }
          newNewMap.push(newRow);
          setMap(newNewMap);
        }
      }
      setCols(newCols);
    }
  }
  return (
    <div>
      <h3>BFS Pathfinder</h3>
      <div className="map-container">
        <div>
        {map.map((row, rindex) => 
        <div key={rindex.toString()} className="map-row">
          {row.map((col, index) => 
          <MapSpot key={index.toString()} onSpotClick={onSpotClick} row={rindex} col={index} rows={rows} cols={cols} val={col}/>
          )}
        </div>)}
      </div>
      </div>
      <Selectors selected={selected} setSelected={setSelected}/>
      <div className="btn-container">
        <button className="solve-btn" onClick={bfs}>Solve</button>
        <button className="reset-btn" onClick={reset}>Reset</button>
        <button className="random-btn" onClick={random}>Randomize</button>
      </div>
      
      <Inputs changeCols={changeCols} changeRows={changeRows} rows={rows} cols={cols}/>
      
    </div>
  )
}

export default App