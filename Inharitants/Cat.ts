import {InhabitantInterface} from "../Interface/InhabitantInterface";
import {WorldActionsForCatInterface, WorldIdentificationInterface} from "../Interface/IWorldActions";
import {AbstractInhabitant} from "./AbstractInhabitant";

export class Cat extends AbstractInhabitant implements InhabitantInterface {
    private worldActions: WorldActionsForCatInterface & WorldIdentificationInterface;

    constructor(worldActions: WorldActionsForCatInterface & WorldIdentificationInterface) {
        super();
        this.worldActions = worldActions;
    }

    getWorld(): WorldIdentificationInterface {
        return this.worldActions;
    }

    public toJSON(): string {
        let clone: Object = {...this};
        delete clone["worldActions"];
        return JSON.stringify(clone);
    }
}