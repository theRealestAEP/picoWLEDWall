'use client'
import { useEffect, useState, useRef } from "react";


export default function Home() {
  const [gridSize, setGrid] = useState(0);
  const [color, setColor] = useState('#FFFFFF');

  //add grid data so it can be exported

  const [items, setItems] = useState<JSX.Element[]>([]);

  const itemsRef = useRef<JSX.Element[]>([]);
  const colorRef = useRef('#FFFFFF');

  const hexToRgb = (hex:string) => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
  };
  

  const changePixelColor = (pixel: number, event: any) => {
    // Create a new array based on the current state
    const updatedItems = itemsRef.current.map((item, index) => {
      if (index === pixel) {
        return <div className="grid-item" key={index} style={{ backgroundColor: `${colorRef.current}` }} onClick={(event) => { changePixelColor(index, event) }}></div>;
      }
      return item;
    });

    console.log(updatedItems[pixel]);
    setItems(updatedItems); // This now sets a new array, triggering a re-render
  }

  const generateRGB = () => {
    let rgbArray = itemsRef.current.map((item) => {
      // Assuming the backgroundColor is always in hex format
      const backgroundColor = item.props.style.backgroundColor;
      return hexToRgb(backgroundColor);
    });
  
    console.log(rgbArray);
    return rgbArray; // This array now contains RGB strings for each item
  }

  const handleColorChange = (color: string) => {
    switch (color) {
      case 'red':
        setColor('#f44336');
        break;
      case 'blue':
        setColor('#bbdefb');
        break;
      case 'green':
        setColor('#c8e6c9');
        break;
      case 'none':
        setColor('#FFFFFF');
        break;
      default:
        setColor('#FFFFFF');
        break;
    }
  }


  const handleUserInputChange = (e: any) => {
    setGrid(e.target.value)
  }
  useEffect(() => {
    let tmpItems: JSX.Element[] = [];
    for (let i = 0; i <= Math.pow(gridSize, 2) - 1; i++) {
      tmpItems.push(
        <div className="grid-item" key={i} onClick={(event) => { changePixelColor(i, event) }} style={{ backgroundColor: `#FFFFFF` }} >

        </div>)
    }
    setItems(tmpItems);
    // Array(0)
  }, [gridSize])

  useEffect(() => {
    itemsRef.current = items; // set ref
  }, [items]);

  useEffect(() => {
    colorRef.current = color; // set ref
  }, [color]);

  return (
    <main className="flex max-h-20 flex-col items-center justify-between space-y-4 p-24">
      <input type="number"
        className="outline-black bg-slate-100"
        placeholder='Grid Size'
        value={gridSize}
        onChange={handleUserInputChange} ></input>
      <button className="bg-slate-300 p-2 rounded-sm" onClick={()=>{generateRGB()}}>Export Grid</button>
      <div className="selected-color" style={{ backgroundColor: `${color}` }}>
        Selected Color
      </div>
      <div className="grid-layout" style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
        {items}
      </div>
      <div className="grid grid-cols-4 gap-1">
        <div className="bg-red-500 text-center cursor-pointer rounded-sm p-2" onClick={() => { handleColorChange('red') }}>Red</div>
        <div className="bg-blue-100 text-center cursor-pointer rounded-sm p-2" onClick={() => { handleColorChange('blue') }}>blue</div>
        <div className="bg-green-100 text-center cursor-pointer rounded-sm p-2" onClick={() => { handleColorChange('green') }}>green</div>
        <div className="bg-red-100 text-center cursor-pointer rounded-sm p-2" onClick={() => { handleColorChange('none') }}>eraser</div>
      </div>
      <div>
        <h3>Exported Grid</h3>
        <p className="bg-slate-100 p-4 rounded-md">
          {JSON.stringify(generateRGB())}
        </p>
      </div>
    </main>
  );
}



