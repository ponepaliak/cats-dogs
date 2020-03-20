import * as worldIdentification from "../Interface/WorldIdentificationInterface";
import {Runtime} from "inspector";
import {InhabitantsTypes} from "./InhabitantsTypes";
import {Vector} from "../Interface/InhabitantInterface";
import {
    WorldActionsForCatInterface,
    WorldActionsForInhabitantsMovementInterface,
    WorldIdentificationInterface
} from "../Interface/IWorldActions";

export abstract class AbstractInhabitant {
    protected static _idCounter: number = 0;
    protected _id: number;
    protected _name: string = "";
    protected _image: string = "";
    protected _coordinates: Vector = {x: 0, y: 0};
    protected _direction: Vector = {x: 0, y: 0};
    protected _speed: number = 2;
    protected _timeMark: number;
    protected _type: InhabitantsTypes;
    protected static _dimension: number;
    protected surroundingInhabitants: Object = {};


    protected constructor(type: InhabitantsTypes) {
        this._id = AbstractInhabitant._idCounter++;
        this._timeMark = Date.now();
        this._type = type;
        this._direction = this.generateDirection();
        this._coordinates = this.generateCoordinates();
        this._speed = 1;
    }

    protected generateDirection(): Vector {
        let angle = this.getRandomInt(360);
        const finishX = Math.sin(angle * Math.PI / 180);
        const finishY = Math.cos(angle * Math.PI / 180);
        return {'x': finishX, 'y': finishY};
    }

    protected getRandomInt(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
    }

    protected generateCoordinates(): Vector {
        return {x: this.getRandomInt(AbstractInhabitant._dimension), y: this.getRandomInt(AbstractInhabitant._dimension)};
    }

    get name(): string {
        return this._name;
    }

    get image(): string {
        return this._image;
    }

    get coordinates(): Vector {
        return this._coordinates;
    }

    set coordinates(newCoordinates:  Vector) {
        this._coordinates = newCoordinates;
    }

    set direction(newDirection: Vector) {
        this._direction = newDirection;
    }

    set speed(newSpeed: number) {
        this._speed = newSpeed;
    }

    public static setDimension(dimension: number) {
        this._dimension = dimension;
    }

    public static getDimension() {
        return this._dimension;
    }

    protected get intCoordinates(): Vector {
        return {
            x: Math.floor(this._coordinates.x),
            y: Math.floor(this._coordinates.y)
        };
    }

    public coordinatesString(): string {
        return JSON.stringify(this.intCoordinates);
    }

    set name(name: string) {
        this._name = name;
    }

    set image(image: string) {
        this._image = image;
    }

    public move(): void {
        this.moving();
    }

    protected moving(): void {
        this._coordinates.x = this.module(this._coordinates.x +this._direction.x * this._speed);
        this._coordinates.y = this.module(this._coordinates.y + this._direction.y * this._speed);
    }

    protected module(coordinate): number {
        if (coordinate < 0) return AbstractInhabitant._dimension + coordinate - 1;
        return coordinate % AbstractInhabitant._dimension;
    }

    get type(): InhabitantsTypes {
        return this._type;
    }

    protected getSafeZones(worldActions: WorldActionsForInhabitantsMovementInterface, dangerousType: InhabitantsTypes): Vector[] {
        let coordinates: Vector = this.intCoordinates;
        let isDangerous: boolean = false;
        let safeZones: Vector[] = [];
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                isDangerous = false;
                if (i == 0 && j == 0) continue;
                let checkingCoordinates: string = JSON.stringify({x: coordinates.x + i, y: coordinates.y + j});
                let inhabitants: AbstractInhabitant[] = worldActions.getInhabitantsByCoordinates(checkingCoordinates);
                if (inhabitants === undefined) continue;
                for (let inhabitant of inhabitants) {
                    if (inhabitant._type === dangerousType) {
                        isDangerous = true;
                        break;
                    }
                }
                if (!isDangerous) safeZones.push(JSON.parse(checkingCoordinates));
            }
        }
        return safeZones;
    }

    protected getExpectedCoordinates(): Vector {
        return {
            x: this.module(this._coordinates.x + this._direction.x * this._speed),
            y: this.module(this._coordinates.y + this._direction.y * this._speed)
        };
    }

    protected checkDirection(worldActions: WorldActionsForInhabitantsMovementInterface, dangerousType: InhabitantsTypes): void {
        let safeZones = this.getSafeZones(worldActions, InhabitantsTypes.Dog);
        let expectingCoordinates = this.getExpectedCoordinates();
        let expectingCoordinatesJ = JSON.stringify(expectingCoordinates);
        if (safeZones[expectingCoordinatesJ] === undefined) {
            if (safeZones.length !== 0) this.changeDirection(safeZones[0]);
        }
    }

    protected changeDirection(safeCoordinates: Vector): void {
        let x: number = safeCoordinates.x - this._coordinates.x;
        let y: number = safeCoordinates.y - this._coordinates.y;
        let module = Math.sqrt(x * x + y * y);
        this._direction.x = x / module;
        this._direction.y = y / module;
    }

    public toJSON(): string {
        let clone: Object = {...this};
        clone["_coordinates"] = this.intCoordinates;
        delete clone["worldActions"];
        return JSON.stringify(clone);
    }
}