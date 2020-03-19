import {InhabitantInterface} from "../Interface/InhabitantInterface";
import {
    WorldActionsForDogInterface,
    WorldActionsForInhabitantsMovementInterface,
    WorldIdentificationInterface
} from "../Interface/IWorldActions";
import {Cat} from "./Cat";
import {AbstractInhabitant} from "./AbstractInhabitant";
import {InhabitantsTypes} from "./InhabitantsTypes";

export class Dog extends AbstractInhabitant implements InhabitantInterface  {
    private worldActions: WorldActionsForDogInterface & WorldIdentificationInterface & WorldActionsForInhabitantsMovementInterface;
    private eatenCatsNumber: number = 0;

    constructor(worldActions: WorldActionsForDogInterface & WorldIdentificationInterface & WorldActionsForInhabitantsMovementInterface) {
        super(InhabitantsTypes.Dog);
        this.worldActions = worldActions;
    }

    public getInhabitantsByCoordinates() {
        let inhabitants: AbstractInhabitant[] = this.worldActions.getInhabitantsByCoordinates(this.coordinatesString());
        for (let inhabitant of inhabitants) {
            if (this.isCat(inhabitant)) this.eatCat(<Cat>inhabitant);
        }
    }

    private isCat(inhabitant: AbstractInhabitant): boolean {
        return inhabitant.type === InhabitantsTypes.Cat;
    }

    public eatCat(cat: Cat): void {
        this.worldActions.checkIfInOneWorld(this, cat);
        this.worldActions.checkIfCatExist(cat);
        this.worldActions.dropCat(cat);
        this.eatenCatsNumber++;
    }

    public getWorld(): WorldIdentificationInterface {
        return this.worldActions;
    }

    public getEatenCatsNumber() {
        return this.eatenCatsNumber;
    }
}