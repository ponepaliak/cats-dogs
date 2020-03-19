import {Universe} from "../InhabitantsContainer/Universe";
import {InhabitantsFactory} from "../Factory/InhabitantsFactory";
import {World} from "../InhabitantsContainer/World";
import WebSocket from "ws";
import {AllInhabitants} from "../Interface/InhabitantInterface";
import {InhabitantsMaker} from "./InhabitantsMaker";

export class Simulation {
    private static _world: World;

    public static init() {
        this._world = InhabitantsMaker.createWorld();
        this.generateNewInhabitants();
    }

    public static getWorld() {
        return this._world;
    }

    public static generateNewInhabitants() {
        for (let i = 0; i < 1; i++) InhabitantsMaker.initCat();
        for (let i = 0; i < 1; i++) InhabitantsMaker.initDog();
        for (let i = 0; i < 1; i++) InhabitantsMaker.initBuldozer();
    }

    public static step(wsNew: WebSocket): void {
        this._world.moveAllInhabitants();
        this._world.generateMap();
        this._world.inhabitantsEating();
        this.sendData(wsNew);
    }

    public static sendData(wsNew: WebSocket): void {
        const dataObject: AllInhabitants = {
            cats: this._world.getAllCats(),
            dogs: this._world.getAllDogs(),
            buldozers: this._world.getAllBuldozers()
        };

        wsNew.send(JSON.stringify(dataObject));
    }
}