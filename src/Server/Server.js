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
const Universe_1 = require("../InhabitantsContainer/Universe");
const InhabitantsFactory_1 = require("../Factory/InhabitantsFactory");
const ws_1 = __importDefault(require("ws"));
const Router_1 = require("./Router");
function createWorld() {
    const universe = new Universe_1.Universe();
    const factory = new InhabitantsFactory_1.InhabitantsFactory();
    return universe.createWorld(factory);
}
function getInhabitant(world, inhabitantType) {
    let inhabitant;
    switch (inhabitantType) {
        case 'cat':
            let cat = world.createCat();
            cat.image = "image/cat.png";
            inhabitant = cat.toJSON();
            break;
        case 'dog':
            let dog = world.createDog();
            dog.image = "image/dog.jpg";
            inhabitant = dog.toJSON();
            break;
        case 'buldozer':
            let buldozer = world.createBuldozer();
            buldozer.image = "image/buldozer.png";
            inhabitant = buldozer.toJSON();
            break;
    }
    return inhabitant;
}
http.createServer(function (request, response) {
    response.writeHead(200);
    Router_1.Router.routing(request.url, response);
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