"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const World_1 = require("./World");
class Universe {
    constructor() {
        this.worldsList = [];
    }
    createWorld(factory) {
        let worldItem = new World_1.World(factory);
        this.worldsList.push(worldItem);
        return worldItem;
    }
}
exports.Universe = Universe;
//# sourceMappingURL=Universe.js.map