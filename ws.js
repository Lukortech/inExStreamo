const ws = require("ws");
const wsserver = new ws.Server({
  server: httpserver,
  port: 3030,
});

wsserver.on("connection", function connection(connection) {
  console.log("connection");
});
wsserver.on("open", function open(open) {
  console.log("open");
});
wsserver.on("message", function message(message) {
  console.log("message");
});
