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

function createWorld(): World {
    const universe: Universe = new Universe();
    const factory = new InhabitantsFactory();
    return universe.createWorld(factory);
}

function getInhabitant(world: World, inhabitantType: string): string {
    let inhabitant: string;
    switch (inhabitantType) {
        case 'cat':
            let cat: Cat =  world.createCat();
            cat.image = "image/cat.png";
            inhabitant = cat.toJSON();
            break;
        case 'dog':
            let dog: Dog = world.createDog();
            dog.image = "image/dog.jpg";
            inhabitant =  dog.toJSON();
            break;
        case 'buldozer':
            let buldozer: Buldozer = world.createBuldozer();
            buldozer.image = "image/buldozer.png";
            inhabitant =  buldozer.toJSON();
            break;
    }
    return inhabitant;
}

http.createServer(function (request: IncomingMessage, response: ServerResponse): void {
    response.writeHead(200);
    Router.routing(request.url, response);
}).listen(8000);

const options: WebSocket.ServerOptions = {
    "port": 7000
};

const ws = new WebSocket.Server(options);
const world: World = createWorld();
let dog: Dog = world.createDog();
let cat: Cat = world.createCat();

ws.on("connection", function(wsNew: WebSocket) {
    wsNew.on("message", function (message: string) {
        console.log(typeof message);
        wsNew.send(getInhabitant(world, message));
    });
});