import * as worldIdentification from "../Interface/WorldIdentificationInterface";
import {Runtime} from "inspector";
import {InhabitantsTypes} from "./InhabitantsTypes";
import {Vector} from "../Interface/InhabitantInterface";
const maxCoordinate = 10;

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

    protected constructor(type: InhabitantsTypes) {
        this._id = AbstractInhabitant._idCounter++;
        this._timeMark = Date.now();
        this._type = type;
        this._direction = this.generateDirection();
        this._coordinates = this.generateCoordinates();
        this._speed = 1;
    }

    private generateDirection(): Vector {
        let x = this.getRandomInt(maxCoordinate) + 1;
        let y = this.getRandomInt(maxCoordinate) + 1;
        const directionModule = Math.sqrt( Math.pow(x, 2) + Math.pow(y, 2));
        const finishX = Math.ceil(x / directionModule);
        const finishY = Math.ceil(y / directionModule);
        return {'x': finishX, 'y': finishY};
    }

    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
    }

    private generateCoordinates(): Vector {
        return {x: this.getRandomInt(maxCoordinate), y: this.getRandomInt(maxCoordinate)};
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

    public coordinatesString(): string {
        return JSON.stringify(this._coordinates);
    }

    set name(name: string) {
        this._name = name;
    }

    set image(image: string) {
        this._image = image;
    }

    public move(): void {
        this._coordinates.x = Math.ceil(this._coordinates.x +this._direction.x * this._speed) % maxCoordinate;
        this._coordinates.y = Math.ceil(this._coordinates.y + this._direction.y * this._speed) % maxCoordinate;
        if (this._coordinates.x == null || this._coordinates.x == NaN) console.log('wtf', this.getRandomInt(maxCoordinate));
    }

    get type(): InhabitantsTypes {
        return this._type;
    }

    public toJSON(): string {
        let clone: Object = {...this};
        delete clone["worldActions"];
        return JSON.stringify(clone);
    }
}