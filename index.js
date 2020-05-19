const path = require("path");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

// Setup
const port = 3000;
const colorRegexp = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    let strArr = msg.split(" ");
    let foundColor = strArr.filter((e) => e.match(colorRegexp));

    if (foundColor) {
      ws.send(`The color we think you've sent -> ${foundColor[0]}`);
    } else {
      ws.send(`We think you've sent no color code.`);
    }
  });
  ws.send("We're waiting for your color code!");
});

// const wss = new WebSocket.Server({
//   port: 8080,
//   perMessageDeflate: {
//     zlibDeflateOptions: {
//       chunkSize: 1024,
//       memLevel: 7,
//       level: 3,
//     },
//     zlibInflateOptions: {
//       chunkSize: 10 * 1024,
//     },
//     clientNoContextTakeover: true, // Defaults to negotiated value.
//     serverNoContextTakeover: true, // Defaults to negotiated value.
//     serverMaxWindowBits: 10, // Defaults to negotiated value.
//   },
// });

// wss.on("connection", (ws) => {
//   ws.on("message", (message) => {
//     console.log("received: %s", message);
//   });

//   ws.send("something");
// });

{
  /* 
=====================================
*/
}

// app.get("/colors/:color", (req, res, next) => {
//   const options = {
//     root: path.join(__dirname, "public"),
//     dotfiles: "deny",
//     headers: {
//       "x-timestamp": Date.now(),
//       "x-sent": true,
//     },
//   };

//   const colorName = req.params.color;
//   res.sendFile("colors.html", options, (err) => {
//     if (err) next(err);
//     console.log("Sent:", colorName);
//   });
// });

// app.get("/", (req, res, next) => {
//   const options = {
//     root: path.join(__dirname, "public"),
//     dotfiles: "deny",
//     headers: {
//       "x-timestamp": Date.now(),
//       "x-sent": true,
//     },
//   };

//   res.sendFile("index.html", options, (err) => {
//     if (err) next(err);
//   });
// });

// app.listen(port, () =>
//   console.log(`Example app listening at http://localhost:${port}`)
// );

server.listen(process.env.PORT || port, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
