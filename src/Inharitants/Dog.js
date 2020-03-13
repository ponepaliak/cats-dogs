"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dog {
    constructor(worldActions) {
        this.eatenCatsNumber = 0;
        this.worldActions = worldActions;
    }
    eatCat(cat) {
        this.worldActions.checkIfInOneWorld(this, cat);
        this.worldActions.checkIfCatExist(cat);
        this.worldActions.dropCat(cat);
        this.eatenCatsNumber++;
    }
    getWorld() {
        return this.worldActions;
    }
    getEatenCatsNumber() {
        return this.eatenCatsNumber;
    }
    toJSON() {
        let clone = Object.assign({}, this);
        delete clone["worldActions"];
        return JSON.stringify(clone);
    }
}
exports.Dog = Dog;
//# sourceMappingURL=Dog.js.map