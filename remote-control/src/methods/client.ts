import WebSocket from "ws";

const port = 8080;

const ws = new WebSocket(`ws://localhost:${port}`, {
  perMessageDeflate: false
});

// Connection opened
ws.addEventListener('open', (event) => {
    console.log("client connected");
    ws.send('Hello Server!');
  });