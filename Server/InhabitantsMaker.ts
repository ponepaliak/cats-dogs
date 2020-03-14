import {World} from "../InhabitantsContainer/World";
import {Cat} from "../Inharitants/Cat";
import {Dog} from "../Inharitants/Dog";
import {Buldozer} from "../Inharitants/Buldozer";
import {Universe} from "../InhabitantsContainer/Universe";
import {InhabitantsFactory} from "../Factory/InhabitantsFactory";

export class InhabitantsMaker {
    private static world: World;
    private static catsCount: number = 0;
    private static dogsCount: number = 0;
    private static buldozersCount: number = 0;

    public static createWorld(): void {
        const universe: Universe = new Universe();
        const factory = new InhabitantsFactory();
        this.world = universe.createWorld(factory);
    }

    public static getInhabitant(inhabitantType: string): string {
        let inhabitant: string;
        switch (inhabitantType) {
            case 'cat':
                inhabitant = this.initCat();
                break;
            case 'dog':
                inhabitant =  this.initDog();
                break;
            case 'buldozer':
                inhabitant =  this.initBuldozer();
                break;
        }
        return inhabitant;
    }

    private static initCat(): string {
        let cat: Cat =  this.world.createCat();
        cat.image = "image/cat2.png";
        cat.name = `barsik-${++this.catsCount}`;
        return  cat.toJSON();
    }

    private static initDog(): string {
        let dog: Dog = this.world.createDog();
        dog.image = "image/dog.jpg";
        dog.name = `bobik-${++this.dogsCount}`;
        return dog.toJSON();
    }

    private static initBuldozer() {
        let buldozer: Buldozer = this.world.createBuldozer();
        buldozer.image = "image/buldozer.png";
        buldozer.name = `dir-gir-dir-${++this.buldozersCount}`;
        return buldozer.toJSON();
    }
}