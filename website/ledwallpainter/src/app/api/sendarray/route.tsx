import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const body = await req.json();
    // const array = JSON.parse(body);
    console.log(body);
    const url = `https://backend.removegreenscreen.com:8082/savearray`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    });
// 
    // console.log(response);
    if(!response.ok) {
        return new NextResponse('failed to send array to server', { status: 500 })
    }
    
    return new NextResponse('success')

}