"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractInhabitant_1 = require("./AbstractInhabitant");
class Cat extends AbstractInhabitant_1.AbstractInhabitant {
    constructor(worldActions) {
        super();
        this.worldActions = worldActions;
    }
    getWorld() {
        return this.worldActions;
    }
}
exports.Cat = Cat;
//# sourceMappingURL=Cat.js.map