import React from 'react'
import { useState } from 'react'

const Inputs = ({changeRows, changeCols, rows, cols}) => {
  const [value, setValue] = useState(3);
  const MAX = 25
  return (
    <div className="inputs-container">
    {/* <label for="rows">Rows  </label>
      <input placeholder={rows} name="rows" id="rows" type="number" min="1" onInput={(e) => changeRows(e.target.value)}/>
      <label for="cols">Cols  </label>
      <input placeholder={cols} name="cols" id="cols" type="number" min="1" onInput={(e) => changeCols(e.target.value)}/> */}
      <input type="range" min="3" max={MAX} onChange={(e) => changeRows(e.target.value)} value={rows}></input>
      <p>{rows} Rows</p>
      <input type="range" min="3" max={MAX} onChange={(e) => changeCols(e.target.value)} value={cols}></input>
      <p>{cols} Cols</p>
      
    </div>
  )
}

export default Inputs