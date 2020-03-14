import * as http from 'http';
import * as fs from 'fs';
import {Universe} from "../InhabitantsContainer/Universe";
import {InhabitantsFactory} from "../Factory/InhabitantsFactory";
import {World} from "../InhabitantsContainer/World";
import {IncomingMessage, ServerResponse} from "http";
import WebSocket, {MessageEvent} from "ws";
import {Dog} from "../Inharitants/Dog";
import {Cat} from "../Inharitants/Cat";
import {Buldozer} from "../Inharitants/Buldozer";
import {Router} from "./Router";
import {InhabitantsMaker} from "./InhabitantsMaker";



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
    wsNew.on("message", function (message: string) {
        console.log(typeof message);
        wsNew.send(InhabitantsMaker.getInhabitant(message));
    });
});