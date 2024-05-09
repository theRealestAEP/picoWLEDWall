'use client'
import { it } from "node:test";
import { useEffect, useState, useRef } from "react";


export default function Home() {
  const [gridSize, setGrid] = useState(28);
  const [color, setColor] = useState('#FFFFFF');

  //add grid data so it can be exported

  const [items, setItems] = useState<JSX.Element[]>([]);

  const itemsRef = useRef<JSX.Element[]>([]);
  const colorRef = useRef('#FFFFFF');


  const mouseOver = (pixel: number, event: any) => {
    //check if mouse is down
    if (event.buttons === 1) {
      console.log('Mouse is down');
      changePixelColor(pixel, event);
    }
    // console.log(pixel)
  };


  const hexToRgb = (hex: string) => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[2], 16)}, ${parseInt(result[1], 16)}, ${parseInt(result[3], 16)}` : null;
  };


  const changePixelColor = (pixel: number, event: any) => {
    // Create a new array based on the current state
    const updatedItems = itemsRef.current.map((item, index) => {
      if (index === pixel) {
        return <div className="grid-item" key={index} style={{ backgroundColor: `${colorRef.current}` }}
          onClick={(event) => changePixelColor(pixel, event)}
          onMouseOver={(event) => mouseOver(pixel, event)}
        ></div>;
      }
      return item;
    });

    // console.log(updatedItems[pixel]);
    setItems(updatedItems); // This now sets a new array, triggering a re-render
  }

  const generateRGB = () => {
    let rgbArray = itemsRef.current.map((item) => {
      // Assuming the backgroundColor is always in hex format
      const backgroundColor = item.props.style.backgroundColor;
      return hexToRgb(backgroundColor);
    });

    // console.log(rgbArray);
    return rgbArray; // This array now contains RGB strings for each item
  }


  async function sendArray(items: string) {
    console.log(items)
    try {
      const response = await fetch('/api/sendarray', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      });

      if (!response.ok) {
        console.error('Network response was not ok', response);
        return;
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  const handleColorChange = (color: string) => {
    switch (color) {
      case 'red':
        setColor('#FF0000');
        // setColor('#00FF00');

        break;
      case 'blue':
        setColor('#0000FF');
        break;
      case 'green':
        setColor('#00FF00');
        // setColor('#FF5733');
        break;
      case 'none':
        setColor('#FFFFFF');
        break;
      default:
        setColor('#FFFFFF');
        break;
    }
  }


  // const handleUserInputChange = (e: any) => {
  //   setGrid(e.target.value)
  // }

  useEffect(() => {
    let tmpItems: JSX.Element[] = [];
    for (let i = 0; i <= Math.pow(gridSize, 2) - 1; i++) {
      tmpItems.push(
        <div className="grid-item" key={i}
            onClick={(event) => changePixelColor(i, event)}
            onMouseOver={(event) => mouseOver(i, event)}
          style={{ backgroundColor: `#FFFFFF` }} >

        </div>)
    }
    setItems(tmpItems);
    // Array(0)
  }, [])

  useEffect(() => {
    itemsRef.current = items; // set ref
    let tmpItems = JSON.stringify(generateRGB())
    // sendArray(tmpItems);
  }, [items]);

  useEffect(() => {
    colorRef.current = color; // set ref
  }, [color]);



  return (
    <main className="flex max-h-20 flex-col items-center justify-between space-y-4 p-24">
      {/* <input type="number"
        className="outline-black bg-slate-100"
        placeholder='Grid Size'
        value={gridSize}
        onChange={handleUserInputChange} ></input> */}
      {/* <button className="bg-slate-300 p-2 rounded-sm" onClick={()=>{generateRGB()}}>Export Grid</button> */}
      <div className="selected-color" style={{ backgroundColor: `${color}` }}>
        Selected Color
      </div>
      <div className="grid-layout" style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(25px, 1fr))` }}>
        {items}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1">
        <div className="bg-red-600 text-center cursor-pointer rounded-sm p-2 text-white shadow-sm" onClick={() => { handleColorChange('red') }}>Red</div>
        <div className="bg-blue-600 text-center cursor-pointer rounded-sm p-2 text-white shadow-sm" onClick={() => { handleColorChange('blue') }}>Blue</div>
        <div className="bg-green-600 text-center cursor-pointer rounded-sm p-2 text-white shadow-sm" onClick={() => { handleColorChange('green') }}>Green</div>
        <div className="bg-red-100 text-center cursor-pointer rounded-sm p-2 shadow-sm" onClick={() => { handleColorChange('none') }}>Eraser</div>
        <div className="bg-purple-100 text-center cursor-pointer rounded-sm p-2 shadow-sm" onClick={() => {let tmpItems = JSON.stringify(generateRGB()); sendArray(tmpItems)}}>Submit</div>
      </div>
      {/* <div>
        <h3>Exported Grid</h3>
        <p className="bg-slate-100 p-4 rounded-md">
          {JSON.stringify(generateRGB())}
        </p>
      </div> */}
    </main>
  );
}



