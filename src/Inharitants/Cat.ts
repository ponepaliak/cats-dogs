import {InhabitantInterface} from "../Interface/InhabitantInterface";
import {WorldActionsForCatInterface, WorldIdentificationInterface} from "../Interface/IWorldActions";
import {AbstractInhabitant} from "./AbstractInhabitant";
import {InhabitantsTypes} from "./InhabitantsTypes";

export class Cat extends AbstractInhabitant implements InhabitantInterface {
    private worldActions: WorldActionsForCatInterface & WorldIdentificationInterface;

    constructor(worldActions: WorldActionsForCatInterface & WorldIdentificationInterface) {
        super(InhabitantsTypes.Cat);
        this.worldActions = worldActions;
    }

    getWorld(): WorldIdentificationInterface {
        return this.worldActions;
    }
}