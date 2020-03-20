import {InhabitantInterface, Vector} from "../Interface/InhabitantInterface";
import {
    WorldActionsForCatInterface,
    WorldActionsForInhabitantsMovementInterface,
    WorldIdentificationInterface
} from "../Interface/IWorldActions";
import {AbstractInhabitant} from "./AbstractInhabitant";
import {InhabitantsTypes} from "./InhabitantsTypes";

export class Cat extends AbstractInhabitant implements InhabitantInterface {
    protected worldActions: WorldActionsForCatInterface & WorldIdentificationInterface & WorldActionsForInhabitantsMovementInterface;

    constructor(worldActions: WorldActionsForCatInterface & WorldIdentificationInterface & WorldActionsForInhabitantsMovementInterface) {
        super(InhabitantsTypes.Cat);
        this.worldActions = worldActions;
    }

    getWorld(): WorldIdentificationInterface {
        return this.worldActions;
    }

    public move(): void {
        this.checkDirection(this.worldActions, InhabitantsTypes.Dog);
        this.moving();
    }

}