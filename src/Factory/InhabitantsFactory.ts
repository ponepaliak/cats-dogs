import {InhabitantsFactoryInterface} from "../Interface/InhabitantsFactoryInterface";
import {World} from "../InhabitantsContainer/World";
import {Cat} from "../Inharitants/Cat";
import {Dog} from "../Inharitants/Dog";
import {Buldozer} from "../Inharitants/Buldozer";
import {IConfig} from "../Interface/IConfig";
import {AbstractInhabitant} from "../Inharitants/AbstractInhabitant";

export class InhabitantsFactory implements InhabitantsFactoryInterface {
    private _world!: World;

    constructor(config: IConfig) {
        AbstractInhabitant.setDimension(config.dimension);
    }

    setWorld(world: World): void {
        this._world = world;
    }

    public createCat(): Cat {
        return new Cat(this._world);
    }

    public createDog(): Dog {
        return new Dog(this._world);
    }

    public createBuldozer(): Buldozer {
        return new Buldozer(this._world);
    }
}