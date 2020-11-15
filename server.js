const config = require("./config.js");
const WebSocket = require('ws');
const net = require("net");

const wss = new WebSocket.Server({ port: config["gateway-port"] });
wss.on('connection', on_wss_connection);




function on_wss_connection(wss){
    const socket = new net.Socket();
    const duplex = WebSocket.createWebSocketStream(wss);
    socket.connect(config["remote-port"], config["remote-host"]);

    socket.pipe(duplex);
    duplex.pipe(socket);

    socket.on("error", function(){ wss.terminate(); });
    wss.on("error", function(){ socket.destroy(); });
    duplex.on("error", function(){ socket.destroy(); });
}
