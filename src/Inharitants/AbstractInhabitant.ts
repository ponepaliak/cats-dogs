import * as worldIdentification from "../Interface/WorldIdentificationInterface";
import {Runtime} from "inspector";
import {InhabitantsTypes} from "./InhabitantsTypes";

export abstract class AbstractInhabitant {
    private static _idCounter: number = 0;
    private _id: number;
    private _name: string = "";
    private _image: string = "";
    private _x: number = 0;
    private _y: number = 0;
    private _timeMark: number;
    private _type: InhabitantsTypes;

    protected constructor(type: InhabitantsTypes) {
        this._id = AbstractInhabitant._idCounter++;
        this._timeMark = Date.now();
        this._type = type;
    }

    get name(): string {
        return this._name;
    }

    get image(): string {
        return this._image;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    public getCoordinates(): string {
        return `${this._x}:${this._y}`;
    }

    set name(name: string) {
        this._name = name;
    }

    set image(image: string) {
        this._image = image;
    }

    public move(x: number, y: number): void {
        this._x= x;
        this._y = y;
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