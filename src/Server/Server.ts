import * as http from 'http';
import {IncomingMessage, ServerResponse} from "http";
import WebSocket from "ws";
import {Router} from "./Router";
import {InhabitantsMaker} from "./InhabitantsMaker";
import {Simulation} from "./Simulation";
import {World} from "../InhabitantsContainer/World";
import {worker} from "cluster";


http.createServer(function (request: IncomingMessage, response: ServerResponse): void {
    response.writeHead(200);
    Router.routing(request.url, response);
}).listen(8000);

const options: WebSocket.ServerOptions = {
    "port": 7000
};

const ws = new WebSocket.Server(options);
InhabitantsMaker.createWorld();

ws.on("connection", function(wsNew: WebSocket) {
    Simulation.init();
    let world: World = Simulation.getWorld();
    Simulation.sendData(wsNew);
    setInterval(Simulation.generateNewInhabitants.bind(Simulation), 200);
    setInterval(Simulation.step.bind(Simulation), 100, wsNew);
    // wsNew.on("message", function (message: string) {
        // console.log(message);
        // wsNew.send(InhabitantsMaker.getInhabitant(message));
    // });
});