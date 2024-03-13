import express from "express";
import http from "http";
import https from "https";
// import fs from 'fs'

const app = express();

let curArray = [1,2,3];
app.use(express.json());

app.get("/array", (req, res) => {
  res.send(curArray);
});

app.post("/savearray", (req, res) => {   
    console.log(req.body); // Log the body to see what you're getting
    if (!Array.isArray(req.body)) {
        return res.status(400).send("Expected an array");
    }
    curArray = req.body;
    console.log(curArray); // Verify it's been updated
    return res.send("Array updated successfully");
});

// app.listen(port, () => {
//   console.log(`Listening on port ${port}...`);
// });

// const httpsServer = httpServer.createServer(options, app);
const httpServer = http.createServer(app);
// const options = {
//     key: fs.readFileSync('/etc/letsencrypt/live/backend.removegreenscreen.com/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/backend.removegreenscreen.com/fullchain.pem')
// } //**THESE ARE FOR PROD */

httpServer.listen(8082, () => {
    console.log('listening on 8082...')
})