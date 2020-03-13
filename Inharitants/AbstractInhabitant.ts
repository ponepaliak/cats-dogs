import * as worldIdentification from "../Interface/WorldIdentificationInterface";

export abstract class AbstractInhabitant {
    private _name: string;
    private _image: string;
    private _x: number;
    private _y: number;

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

    public move(x: number, y: number): void {
        this._x= x;
        this._y = y;
    }

    public toJSON(): string {
        let clone: Object = {...this};
        delete clone["worldActions"];
        return JSON.stringify(clone);
    }
}