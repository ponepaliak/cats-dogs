"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cat {
    constructor(worldActions) {
        this.worldActions = worldActions;
    }
    getWorld() {
        return this.worldActions;
    }
    toJSON() {
        let clone = Object.assign({}, this);
        delete clone["worldActions"];
        return JSON.stringify(clone);
    }
}
exports.Cat = Cat;
//# sourceMappingURL=Cat.js.map