import {Universe} from "../InhabitantsContainer/Universe";
import {InhabitantsFactory} from "../Factory/InhabitantsFactory";
import {World} from "../InhabitantsContainer/World";
import WebSocket from "ws";
import {AllInhabitants} from "../Interface/InhabitantInterface";
import {InhabitantsMaker} from "./InhabitantsMaker";
import {IConfig} from "../Interface/IConfig";

export class Simulation {
    private static _world: World;

    public static init(config: IConfig) {
        this._world = InhabitantsMaker.createWorld(config);
        this.generateNewInhabitants(config);
    }

    public static getWorld() {
        return this._world;
    }

    public static generateNewInhabitants(config: IConfig) {
        for (let i = 0; i < config["creatingCatsCount"]; i++) InhabitantsMaker.initCat();
        for (let i = 0; i < config.creatingDogsCount; i++) InhabitantsMaker.initDog();
        for (let i = 0; i < config.creatingBuldozersCount; i++) InhabitantsMaker.initBuldozer();
    }

    public static step(wsNew: WebSocket, dimension: number): void {
        this._world.moveAllInhabitants();
        this._world.generateMap();
        this._world.inhabitantsEating();
        this.sendData(wsNew, dimension);
    }

    public static sendData(wsNew: WebSocket, dimension: number): void {
        const dataObject: AllInhabitants = {
            cats: this._world.getAllCats(),
            dogs: this._world.getAllDogs(),
            buldozers: this._world.getAllBuldozers(),
            dimension: dimension
        };

        wsNew.send(JSON.stringify(dataObject));
    }
}