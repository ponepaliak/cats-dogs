import {
    WorldActionsForBuldozersInterface,
    WorldActionsForInhabitantsMovementInterface,
    WorldIdentificationInterface
} from "../Interface/IWorldActions";
import {Dog} from "./Dog";
import {InhabitantInterface} from "../Interface/InhabitantInterface";
import {AbstractInhabitant} from "./AbstractInhabitant";
import {InhabitantsTypes} from "./InhabitantsTypes";
import {Cat} from "./Cat";

export class Buldozer extends AbstractInhabitant implements InhabitantInterface {
    private worldActions: WorldActionsForBuldozersInterface & WorldIdentificationInterface & WorldActionsForInhabitantsMovementInterface;
    private destroyedDogsNumber: number = 0;
    private eatenCatsByDogsNumber: number = 0;

    constructor(worldActions: WorldActionsForBuldozersInterface & WorldIdentificationInterface & WorldActionsForInhabitantsMovementInterface) {
        super(InhabitantsTypes.Buldozer);
        this.worldActions = worldActions;
    }

    public getInhabitantsByCoordinates() {
        let inhabitants: AbstractInhabitant[] = this.worldActions.getInhabitantsByCoordinates(this.coordinatesString());
        for (let inhabitant of inhabitants) {
            if (this.isDog(inhabitant)) this.destroyDog(<Dog>inhabitant);
        }
    }

    private isDog(inhabitant: AbstractInhabitant): boolean {
        return inhabitant.type === InhabitantsTypes.Dog;
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
}