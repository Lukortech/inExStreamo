const path = require("path");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

// Setup

const port = 3000;
const options = {
  root: path.join(__dirname, "public"),
  dotfiles: "deny",
  headers: {
    "x-timestamp": Date.now(),
    "x-sent": true,
  },
};
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let bgColor;
app.use(express.static("public"));
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

// Web socket part

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    ws.send(`There was a color submission: ${msg}`);
    bgColor = msg; // I don't need to check it's value since the input field is sanitizing the data sent to server.
  });
});

// Routing

app.get("/", (req, res, next) => {
  res.sendFile("index.html", options, (err) => {
    if (err) next(err);
  });
});

app.get("/myBG", (req, res, next) => {
  // res.send("colors.html", { ...options, data: bgColor });
  //   res.sendFile("colors.html", options, (err) => {
  //     if (err) next(err);
  //   });
});

app.get("/home", (req, res) => {
  res.render("Colors", { bgColor });
}); // A way to show you that you could easily transfer to React if needed ;)

server.listen(process.env.PORT || port, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
