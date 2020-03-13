import * as http from 'http';
import * as fs from 'fs';
import * as ws from '../node_modules/ws/index';
import { inspect } from "util";
import { Universe } from "../InhabitantsContainer/Universe";
import { InhabitantsFactory } from "../Factory/InhabitantsFactory";
const port1 = 7000;
// console.log(inspect(new ws.default.Server({"port": port1})));
// console.log(typeof ws);

const createWorld = () => {
    let universe = new Universe();
    let factory = new InhabitantsFactory();
    return  universe.createWorld(factory);
}

const cloneDog = (dog) => {
    let cloneDog = {};
    for (let key in dog) {
        cloneDog[key] = dog[key];
    }
    delete cloneDog["worldActions"]["dogsList"];
    delete cloneDog["worldActions"]["inhabitantsFactory"];
    return cloneDog;
}

const routing = (url) => {
    let content = '';

    switch (url) {
        case '/':
            content = fs.readFileSync('public/index.html', 'utf8');
            break;
        case '/main.css':
            content = fs.readFileSync('public/main.css', 'utf8');
            break;
        case '/index.js':
            content = fs.readFileSync('public/index.js', 'utf8');
            break;
    }

    return content;
};

const world = createWorld();

const getInhabitant = text => {
    const dog = cloneDog(world.createDog());
    return JSON.stringify(cloneDog);
}

http.createServer(function (request, response) {
    response.writeHead(200);
    const content = routing(request.url);
    response.end(content);
}).listen(3000);

const port = 7000;

// const ws = Websocket.Server({port});
//
// ws.on("connection", ws1 => {
//     ws1.on("message", message => {
//         ws1.send(getInhabitant(message));
//     })
// })
