# Setting Up 

## the backend 
> install BUN on the target server 

> Create ssl Certs for the machine that server will be running on [ you need to do this because Vercel Edge functions won't make requests to insecure backends ]

> Launch backend on target server with `bun index.js` 

## the front end 'ledwallpainter'
> Replace the backend URL with your the URL where backend is hosted in the `ledwallpainter/src/app/api/sendarray/route.tsx` with your own backend URL 

> This was made with NextJS, so you should be able to deploy onto vercel for free - just fork this repo or push a new version and point vercel to 'ledwallpainter' folder within the repo to deploy. You can also test it locally with `npm run dev` 


## The Pico 
> the code here is actually out of date - on the pico the only change that has to made is to replace the current backend URL with your own 