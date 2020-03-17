import {Dog} from "../Inharitants/Dog";
import {Cat} from "../Inharitants/Cat";
import {InhabitantInterface} from "./InhabitantInterface";
import {AbstractInhabitant} from "../Inharitants/AbstractInhabitant";

export interface WorldActionsForBuldozersInterface {
    dropDog(dog: Dog): void;
    checkIfDogExist(dog: Dog): void;
}

export interface WorldActionsForCatInterface {
    some(): void;
}

export interface WorldActionsForDogInterface {
    dropCat(cat: Cat): void;
    checkIfCatExist(cat: Cat): void;
}

export interface WorldActionsForInhabitantsMovementInterface {
    generateMap(): void;
    getInhabitantsByCoordinates(coordinates: string): [];
}

export interface WorldIdentificationInterface {
    checkIfInOneWorld(firstInhabitant: InhabitantInterface & AbstractInhabitant, secondInhabitant: InhabitantInterface & AbstractInhabitant): void;
    id: number;
}

export interface WorldActionsForInhabitantsInterface extends
    WorldActionsForDogInterface,
    WorldActionsForBuldozersInterface,
    WorldActionsForCatInterface,
    WorldActionsForInhabitantsMovementInterface,
    WorldIdentificationInterface {

}