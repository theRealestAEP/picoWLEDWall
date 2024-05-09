import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const body = await req.json();
    const rawArray = JSON.parse(body);
    let newArray = []
    // console.log(body[0]);
    for (let i = 0; i < rawArray.length; i++) {
        if (rawArray[i] == '255, 255, 255') {
            // body[i] = "0, 0, 0"
            newArray.push('0, 0, 0')
        } else {
            newArray.push(rawArray[i])
        }
    }
    
    console.log(JSON.stringify(newArray));
    let flippedArray = [];
    for (let i = 0; i < newArray.length; i += 28) {
        let chunk = newArray.slice(i, i + 28);
        flippedArray.push(chunk.reverse());
    }

    flippedArray = [].concat(...flippedArray);

    let newBody = JSON.stringify(flippedArray)

    // let newBody = body.forEach((color: any) => {
    //     if(color == "255, 255, 255") {
    //         color = "0, 0, 0"
    //     }   
    // })
    // console.log(newBody);
    const url = `https://backend.removegreenscreen.com:8082/savearray`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newBody
    });
    // 
    // console.log(response);
    if (!response.ok) {
        return new NextResponse('failed to send array to server', { status: 500 })
    }

    return new NextResponse('success')

}