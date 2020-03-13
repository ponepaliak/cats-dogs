import {WorldActionsForBuldozersInterface, WorldIdentificationInterface} from "../Interface/IWorldActions";
import {Dog} from "./Dog";
import {InhabitantInterface} from "../Interface/InhabitantInterface";
import {AbstractInhabitant} from "./AbstractInhabitant";

export class Buldozer extends AbstractInhabitant implements InhabitantInterface {
    private worldActions: WorldActionsForBuldozersInterface & WorldIdentificationInterface;
    private destroyedDogsNumber: number = 0;
    private eatenCatsByDogsNumber: number = 0;

    constructor(worldActions: WorldActionsForBuldozersInterface & WorldIdentificationInterface) {
        super();
        this.worldActions = worldActions;
    }

    public getWorld(): WorldIdentificationInterface {
        return this.worldActions;
    }

    public destroyDog(dog: Dog) {
        this.worldActions.checkIfInOneWorld(this, dog);
        this.worldActions.dropDog(dog);
        this.eatenCatsByDogsNumber += dog.getEatenCatsNumber();
        this.destroyedDogsNumber++;
    }

    public getDestroyedDogsNumber(): number {
        return this.destroyedDogsNumber;
    }

    public getEatenCatsByDogsNumber(): number {
        return this.eatenCatsByDogsNumber;
    }

    public toJSON(): string {
        let clone: Object = {...this};
        delete clone["worldActions"];

        // delete clone["worldActions"]["buldozersList"];
        // delete clone["worldActions"]["inhabitantsFactory"];
        return JSON.stringify(clone);
    }
}