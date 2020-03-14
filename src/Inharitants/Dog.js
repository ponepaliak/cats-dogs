"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractInhabitant_1 = require("./AbstractInhabitant");
class Dog extends AbstractInhabitant_1.AbstractInhabitant {
    constructor(worldActions) {
        super();
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
}
exports.Dog = Dog;
//# sourceMappingURL=Dog.js.map