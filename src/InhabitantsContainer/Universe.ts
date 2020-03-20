import {World} from "./World";
import {InhabitantsFactoryInterface} from "../Interface/InhabitantsFactoryInterface";
import {IConfig} from "../Interface/IConfig";

export class Universe {
    private worldsList: World[] = [];

    public createWorld(factory: InhabitantsFactoryInterface): World {
        let worldItem = new World(factory);
        this.worldsList.push(worldItem);
        return worldItem;
    }
}