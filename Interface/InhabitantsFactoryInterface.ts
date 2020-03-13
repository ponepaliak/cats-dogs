import * as world from '../InhabitantsContainer/World';
import * as cat from '../Inharitants/Cat';
import * as dog from '../Inharitants/Dog';
import * as buldozer from '../Inharitants/Buldozer';

export interface InhabitantsFactoryInterface {
    setWorld(worldObject: world.World): void;
    createCat(): cat.Cat;
    createDog(): dog.Dog;
    createBuldozer(): buldozer.Buldozer;
}