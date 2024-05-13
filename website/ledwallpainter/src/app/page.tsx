'use client'
import { it } from "node:test";
import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [gridSize, setGrid] = useState(28);
  const [color, setColor] = useState('#FFFFFF');
  const [isRateLimited, setRateLimited] = useState(false);
  //add grid data so it can be exported

  const [items, setItems] = useState<JSX.Element[]>([]);

  const itemsRef = useRef<JSX.Element[]>([]);
  const colorRef = useRef('#FFFFFF');

  const gridRef = useRef<HTMLDivElement>(null);


  const getPixelFromTouch = (event:any) => {
    const touch = event.touches[0];
    const grid = gridRef.current;
    if (grid) {
      const rect = grid.getBoundingClientRect();
      // Calculate touch position relative to the grid
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      // Calculate which cell in the grid the touch is over
      const row = Math.floor(y / (rect.height / gridSize));
      const col = Math.floor(x / (rect.width / gridSize));
      const pixel = row * gridSize + col;
      return pixel >= 0 && pixel < gridSize * gridSize ? pixel : null;
    }
    return null;
  };

  const touchMove = (event: any) => {
    // By marking this as non-passive, we can safely call preventDefault
    event.preventDefault();
    const pixel = getPixelFromTouch(event);
    if (pixel !== null) {
      changePixelColor(pixel, event);
    }
  };


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

  const clearAll = () => {
    // setColor('#FFFFFF');
    for (let i = 0; i <= Math.pow(gridSize, 2) - 1; i++) {
      const updatedItems = itemsRef.current.map((item, index) => {
        return <div className="grid-item" key={index} style={{ backgroundColor: `#FFFFFF` }}
          onClick={(event) => changePixelColor(index, event)}
          onMouseOver={(event) => mouseOver(index, event)}
        ></div>;
      });

      // console.log(updatedItems[pixel]);
      setItems(updatedItems); // This now sets a new array, triggering a re-render
    }
  }

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


  // async function sendArray(items: string) {
  //   console.log(items)
  //   try {
  //     const response = await fetch('/api/sendarray', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(items),
  //     });

  //     if (!response.ok) {
  //       console.error('Network response was not ok', response);
  //       return;
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data: ', error);
  //   }
  // }
  const sendArray = async (items: string) => {
    if (isRateLimited) {
      console.log("Please wait before sending again.");
      toast("Woah slow down there!");
      return;
    }

    console.log(items);
    setRateLimited(true);

    try {
      const response = await fetch('/api/sendarray', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      });

      if (!response.ok) {
        console.error('Network response was not ok', response);
        toast("Error sorry alex is dumb");
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      // Reset the rate limit after a certain time, e.g., 5000 milliseconds (5 seconds)
      toast("Sent");
      setTimeout(() => setRateLimited(false), 10000);
    }
  };

  // Your existing component code

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

  // useEffect(() => {
  //   let tmpItems: JSX.Element[] = [];
  //   for (let i = 0; i <= Math.pow(gridSize, 2) - 1; i++) {
  //     tmpItems.push(
  //       <div className="grid-item" key={i}
  //         onClick={(event) => changePixelColor(i, event)}
  //         onMouseOver={(event) => mouseOver(i, event)}
  //         style={{ backgroundColor: `#FFFFFF` }} >

  //       </div>)
  //   }
  //   setItems(tmpItems);
  //   // Array(0)
  // }, [])
  useEffect(() => {
    let tmpItems = [];
    for (let i = 0; i < Math.pow(gridSize, 2); i++) {
      tmpItems.push(
        <div className="grid-item" key={i}
          onClick={(event) => changePixelColor(i, event)}
          onMouseOver={(event) => mouseOver(i, event)}
          onTouchMove={touchMove}
          style={{ backgroundColor: '#FFFFFF' }} >
        </div>
      );
    }
    setItems(tmpItems);
  }, [gridSize]);

  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      // Attach the event listener non-passively
      const options = false;
      grid.addEventListener('touchmove', touchMove, options);

      return () => {
        // Clean up the event listener when the component unmounts
        grid.removeEventListener('touchmove', touchMove, options);
      };
    }
  }, [gridSize]); // Make sure to list all dependencies correctly
  useEffect(() => {
    itemsRef.current = items; // set ref
    let tmpItems = JSON.stringify(generateRGB())
    // sendArray(tmpItems);
  }, [items]);

  useEffect(() => {
    colorRef.current = color; // set ref
  }, [color]);



  return (
    <main className="flex flex-col items-center justify-between space-y-4 p-4">
      {/* Submit button on top */}
      <div className="bg-purple-100 text-center cursor-pointer rounded-sm p-2 shadow-md mb-4" onClick={() => { let tmpItems = JSON.stringify(generateRGB()); sendArray(tmpItems) }}>Submit</div>


      {/* Color buttons grid */}
      <div className="grid grid-cols-2 gap-1 xs:grid-cols-2 lg:grid-cols-6 items-center">
        <div className="bg-red-600 text-center cursor-pointer rounded-sm p-2 text-white shadow-md" onClick={() => { handleColorChange('red') }}>Red</div>
        <div className="bg-blue-600 text-center cursor-pointer rounded-sm p-2 text-white shadow-md" onClick={() => { handleColorChange('blue') }}>Blue</div>
        <div className="bg-green-600 text-center cursor-pointer rounded-sm p-2 text-white shadow-md" onClick={() => { handleColorChange('green') }}>Green</div>
        <div className="bg-red-100 text-center cursor-pointer rounded-sm p-2 shadow-md" onClick={() => { handleColorChange('none') }}>Eraser</div>
        <div className="bg-orange-200 text-center cursor-pointer rounded-sm p-2 shadow-md" onClick={() => { clearAll() }}>Clear</div>
        <div className="selected-color text-white rounded-sm shadow-md" style={{ backgroundColor: `${color}` }}>
          Selected Color
        </div>
      </div>
      {/* Adjusting grid for items */}
      <div className="grid-layout"  ref={gridRef}>
        {items}
      </div>

      <ToastContainer />
    </main>

  );
}



