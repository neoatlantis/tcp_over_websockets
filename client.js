const config = require("./config.js");
const WebSocket = require('ws');
const net = require("net");


const tcpserver = net.createServer(on_tcpsocket);
tcpserver.listen(config["local-port"], config["local-host"]);



function on_tcpsocket(socket){

    const ws = new WebSocket(config["gateway"]);
    const duplex = WebSocket.createWebSocketStream(ws);

    duplex.pipe(socket);
    socket.pipe(duplex);

    socket.on("error", function(){ ws.terminate(); });
    ws.on("error", function(){ socket.destroy(); });
    duplex.on("error", function(){ socket.destroy(); });
}




/*function heartbeat() {
  clearTimeout(this.pingTimeout);

  // Use `WebSocket#terminate()`, which immediately destroys the connection,
  // instead of `WebSocket#close()`, which waits for the close timer.
  // Delay should be equal to the interval at which your server
  // sends out pings plus a conservative assumption of the latency.
  this.pingTimeout = setTimeout(() => {
    this.terminate();
  }, 30000 + 1000);
}*/
