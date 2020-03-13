// import * as http from 'http';
// import {IncomingMessage, ServerResponse} from "http";
// import {Universe} from "../InhabitantsContainer/Universe";
// import {InhabitantsFactory} from "../Factory/InhabitantsFactory";
// import {World} from "../InhabitantsContainer/World";
// import {Dog} from "../Inharitants/Dog";
//
// function cloneDog(dog: Dog): Object {
//     let cloneDog = {};
//     for (let key in dog) {
//         cloneDog[key] = dog[key];
//     }
//     delete cloneDog["worldActions"]["dogsList"];
//     delete cloneDog["worldActions"]["inhabitantsFactory"];
//     return cloneDog;
// }
//
// http.createServer(function (request:IncomingMessage, response:ServerResponse): void {
//     let universe: Universe = new Universe();
//     let factory: InhabitantsFactory = new InhabitantsFactory();
//     let world: World = universe.createWorld(factory);
//     let firstDog: Dog = world.createDog();
//     response.end(JSON.stringify(cloneDog(firstDog)));
// }).listen(3000);


import * as http from 'http';
import * as fs from 'fs';
import {Universe} from "../InhabitantsContainer/Universe";
import {InhabitantsFactory} from "../Factory/InhabitantsFactory";
import {World} from "../InhabitantsContainer/World";
import {IncomingMessage, ServerResponse} from "http";
import WebSocket, {MessageEvent} from "ws";
import {Dog} from "../Inharitants/Dog";
import {Cat} from "../Inharitants/Cat";

function createWorld(): World {
    const universe: Universe = new Universe();
    const factory = new InhabitantsFactory();
    return universe.createWorld(factory);
}

function routing(url: string): string {
    let content: string;
    switch (url) {
        case '/':
            content = fs.readFileSync('src/Server/public/index.html', 'utf8');
            break;
        case '/main.css':
            content = fs.readFileSync('src/Server/public/main.css', 'utf8');
            break;
        case '/index.js':
            content = fs.readFileSync('src/Server/public/index.js', 'utf8');
            break;
    }
    return content;
}

function getInhabitant(world: World, inhabitantType: string): string {
    let inhabitant: string;
    switch (inhabitantType) {
        case 'cat':
            inhabitant =  world.createCat().toJSON();
            break;
        case 'dog':
            inhabitant =  world.createDog().toJSON();
            break;
        case 'buldozer':
            inhabitant =  world.createBuldozer().toJSON();
            break;
    }
    return inhabitant;
}

http.createServer(function (request: IncomingMessage, response: ServerResponse): void {
    response.writeHead(200);
    const content: string = routing(request.url);
    response.end(content);
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