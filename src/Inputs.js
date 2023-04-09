import React from 'react'

const Inputs = ({changeRows, changeCols, rows, cols}) => {
  const MAX = 25
  return (
    <div className="inputs-container">
      <input type="range" min="3" max={MAX} onChange={(e) => changeRows(e.target.value)} value={rows}></input>
      <p>{rows} Rows</p>
      <input type="range" min="3" max={MAX} onChange={(e) => changeCols(e.target.value)} value={cols}></input>
      <p>{cols} Cols</p>
      
    </div>
  )
}

export default Inputs