import * as worldIdentification from "../Interface/WorldIdentificationInterface";
import {Runtime} from "inspector";
import {InhabitantsTypes} from "./InhabitantsTypes";
import {Vector} from "../Interface/InhabitantInterface";

export abstract class AbstractInhabitant {
    private static _idCounter: number = 0;
    private _id: number;
    private _name: string = "";
    private _image: string = "";
    private _coordinates: Vector = {x: 0, y: 0};
    private _direction: Vector = {x: 0, y: 0};
    private _speed: number = 2;
    private _timeMark: number;
    private _type: InhabitantsTypes;
    private static _dimension: number;

    protected constructor(type: InhabitantsTypes) {
        this._id = AbstractInhabitant._idCounter++;
        this._timeMark = Date.now();
        this._type = type;
        this._direction = this.generateDirection();
        this._coordinates = this.generateCoordinates();
        this._speed = 1;
    }

    private generateDirection(): Vector {
        let x = this.getRandomInt(AbstractInhabitant._dimension) + 1;
        let y = this.getRandomInt(AbstractInhabitant._dimension) + 1;
        const directionModule = Math.sqrt( Math.pow(x, 2) + Math.pow(y, 2));
        const finishX = x / directionModule;
        const finishY = y / directionModule;
        return {'x': finishX, 'y': finishY};
    }

    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
    }

    private generateCoordinates(): Vector {
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

    private get intCoordinates(): Vector {
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
        this._coordinates.x = (this._coordinates.x +this._direction.x * this._speed) % AbstractInhabitant._dimension;
        this._coordinates.y = (this._coordinates.y + this._direction.y * this._speed) % AbstractInhabitant._dimension;

    }

    get type(): InhabitantsTypes {
        return this._type;
    }

    public toJSON(): string {
        let clone: Object = {...this};
        clone["_coordinates"] = this.intCoordinates;
        console.log(clone["_coordinates"], this._type);
        delete clone["worldActions"];
        return JSON.stringify(clone);
    }
}