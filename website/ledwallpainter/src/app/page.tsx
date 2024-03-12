'use client'
import { useEffect, useState } from "react";


export default function Home() {
  const [gridSize, setGrid] = useState(0);
  const [color, setColor] = useState('none');

  //add grid data so it can be exported

  const [items, setItems] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    let tmpItems: JSX.Element[] = [];
    for (let i = 1; i <= Math.pow(gridSize, 2); i++) {
      let style = {};
      tmpItems.push(
      <div className="grid-item" style={style}>

      </div>)
    }
    setItems(tmpItems);
  }, [gridSize])




  const handleUserInputChange = (e: any) => {
    setGrid(e.target.value)
  }
  return (
    <main className="flex max-h-20 flex-col items-center justify-between space-y-4 p-24">
      <input type="number" 
        className="outline-black bg-slate-100" 
        placeholder='Grid Size'
        value={gridSize}
        onChange={handleUserInputChange} ></input>
      <button className="bg-slate-300 p-2">Export Grid</button>
      <div className="grid-layout" style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
        {items}
      </div>
      <div className="grid grid-cols-4 gap-1">
          <div className="bg-red-100 text-center" onClick={() => {setColor('red')}}>Red</div>
          <div className="bg-blue-100 text-center" onClick={() => {setColor('blue')}}>blue</div>
          <div className="bg-green-100 text-center" onClick={() => {setColor('green')}}>green</div>
          <div className="bg-red-100 text-center" onClick={() => {setColor('none')}}>eraser</div>
      </div>
    </main>
  );
}
