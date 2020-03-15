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
const ws_1 = __importDefault(require("ws"));
const Router_1 = require("./Router");
const InhabitantsMaker_1 = require("./InhabitantsMaker");
http.createServer(function (request, response) {
    response.writeHead(200);
    Router_1.Router.routing(request.url, response);
}).listen(8000);
const options = {
    "port": 7000
};
const ws = new ws_1.default.Server(options);
InhabitantsMaker_1.InhabitantsMaker.createWorld();
ws.on("connection", function (wsNew) {
    wsNew.on("message", function (message) {
        console.log(message);
        wsNew.send(InhabitantsMaker_1.InhabitantsMaker.getInhabitant(message));
    });
});
//# sourceMappingURL=Server.js.map