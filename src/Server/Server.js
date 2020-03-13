"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const fs = __importStar(require("fs"));
const Universe_1 = require("../InhabitantsContainer/Universe");
const InhabitantsFactory_1 = require("../Factory/InhabitantsFactory");
const ws_1 = __importDefault(require("ws"));
function createWorld() {
    const universe = new Universe_1.Universe();
    const factory = new InhabitantsFactory_1.InhabitantsFactory();
    return universe.createWorld(factory);
}
function routing(url) {
    let content;
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
function getInhabitant(world, inhabitantType) {
    let inhabitant;
    switch (inhabitantType) {
        case 'cat':
            inhabitant = world.createCat().toJSON();
            break;
        case 'dog':
            inhabitant = world.createDog().toJSON();
            break;
        case 'buldozer':
            inhabitant = world.createBuldozer().toJSON();
            break;
    }
    return inhabitant;
}
http.createServer(function (request, response) {
    response.writeHead(200);
    const content = routing(request.url);
    response.end(content);
}).listen(8000);
const options = {
    "port": 7000
};
const ws = new ws_1.default.Server(options);
const world = createWorld();
let dog = world.createDog();
let cat = world.createCat();
ws.on("connection", function (wsNew) {
    wsNew.on("message", function (message) {
        console.log(typeof message);
        wsNew.send(getInhabitant(world, message));
    });
});
//# sourceMappingURL=Server.js.map