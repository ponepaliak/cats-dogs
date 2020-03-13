import {InhabitantInterface} from "../Interface/InhabitantInterface";
import {WorldActionsForDogInterface, WorldIdentificationInterface} from "../Interface/IWorldActions";
import {Cat} from "./Cat";
import {AbstractInhabitant} from "./AbstractInhabitant";

export class Dog extends AbstractInhabitant implements InhabitantInterface  {
    private worldActions: WorldActionsForDogInterface & WorldIdentificationInterface;
    private eatenCatsNumber: number = 0;

    constructor(worldActions: WorldActionsForDogInterface & WorldIdentificationInterface) {
        super();
        this.worldActions = worldActions;
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