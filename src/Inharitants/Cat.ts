import {InhabitantInterface, Vector} from "../Interface/InhabitantInterface";
import {
    WorldActionsForCatInterface,
    WorldActionsForInhabitantsMovementInterface,
    WorldIdentificationInterface
} from "../Interface/IWorldActions";
import {AbstractInhabitant} from "./AbstractInhabitant";
import {InhabitantsTypes} from "./InhabitantsTypes";

export class Cat extends AbstractInhabitant implements InhabitantInterface {
    private worldActions: WorldActionsForCatInterface & WorldIdentificationInterface & WorldActionsForInhabitantsMovementInterface;

    constructor(worldActions: WorldActionsForCatInterface & WorldIdentificationInterface & WorldActionsForInhabitantsMovementInterface) {
        super(InhabitantsTypes.Cat);
        this.worldActions = worldActions;
    }

    getWorld(): WorldIdentificationInterface {
        return this.worldActions;
    }

    public move(): void {
        let safeZones = this.getSafeZones();
        let expectingCoordinates = this.getExpectedCoordinates();
        let expectingCoordinatesJ = JSON.stringify(expectingCoordinates);
        if (safeZones[expectingCoordinatesJ] === undefined) {
            if (safeZones.length !== 0) this.changeDirection(safeZones[0]);
        }
        this._coordinates.x = this.module(this._coordinates.x +this._direction.x * this._speed);
        this._coordinates.y = this.module(this._coordinates.y + this._direction.y * this._speed);
    }

    protected getSafeZones(): Vector[] {
        let coordinates: Vector = this.intCoordinates;
        let isDangerous: boolean = false;
        let safeZones: Vector[] = [];
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                isDangerous = false;
                if (i == 0 && j == 0) continue;
                let checkingCoordinates: string = JSON.stringify({x: coordinates.x + i, y: coordinates.y + j});
                let inhabitants: AbstractInhabitant[] = this.worldActions.getInhabitantsByCoordinates(checkingCoordinates);
                if (inhabitants === undefined) continue;
                for (let inhabitant of inhabitants) {
                    if (this.isDog(inhabitant)) {
                        isDangerous = true;
                        break;
                    }
                }
                if (!isDangerous) safeZones.push(JSON.parse(checkingCoordinates));
            }
        }
        return safeZones;
    }

    private getExpectedCoordinates(): Vector {
        return {
            x: this.module(this._coordinates.x + this._direction.x * this._speed),
            y: this.module(this._coordinates.y + this._direction.y * this._speed)
        };
    }

    private changeDirection(safeCoordinates: Vector) {
        let x: number = safeCoordinates.x - this._coordinates.x;
        let y: number = safeCoordinates.y - this._coordinates.y;
        let module = Math.sqrt(x * x + y * y);
        this._direction.x = x / module;
        this._direction.y = y / module;
    }

    private isDog(inhabitant: AbstractInhabitant): boolean {
        return inhabitant.type === InhabitantsTypes.Dog;
    }
}