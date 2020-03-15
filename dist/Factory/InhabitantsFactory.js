"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cat_1 = require("../Inharitants/Cat");
const Dog_1 = require("../Inharitants/Dog");
const Buldozer_1 = require("../Inharitants/Buldozer");
class InhabitantsFactory {
    setWorld(world) {
        this._world = world;
    }
    createCat() {
        return new Cat_1.Cat(this._world);
    }
    createDog() {
        return new Dog_1.Dog(this._world);
    }
    createBuldozer() {
        return new Buldozer_1.Buldozer(this._world);
    }
}
exports.InhabitantsFactory = InhabitantsFactory;
//# sourceMappingURL=InhabitantsFactory.js.map