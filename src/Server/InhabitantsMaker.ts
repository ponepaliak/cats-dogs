import {World} from "../InhabitantsContainer/World";
import {Cat} from "../Inharitants/Cat";
import {Dog} from "../Inharitants/Dog";
import {Buldozer} from "../Inharitants/Buldozer";
import {Universe} from "../InhabitantsContainer/Universe";
import {InhabitantsFactory} from "../Factory/InhabitantsFactory";
import {IConfig} from "../Interface/IConfig";

export class InhabitantsMaker {
    private static world: World;
    private static catsCount: number = 0;
    private static dogsCount: number = 0;
    private static buldozersCount: number = 0;

    public static createWorld(config: IConfig): World {
        const universe: Universe = new Universe();
        const factory = new InhabitantsFactory(config);
        this.world = universe.createWorld(factory);
        return this.world;
    }

    public static initCat(): void {
        let cat: Cat =  this.world.createCat();
        cat.image = "image/cat.png";
        cat.name = `barsik-${++this.catsCount}`;
    }

    public static initDog(): void {
        let dog: Dog = this.world.createDog();
        dog.image = "image/dog.jpg";
        dog.name = `bobik-${++this.dogsCount}`;
    }

    public static initBuldozer(): void {
        let buldozer: Buldozer = this.world.createBuldozer();
        buldozer.image = "image/buldozer.png";
        buldozer.name = `dir-gir-dir-${++this.buldozersCount}`;
    }
}