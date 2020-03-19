import * as worldIdentification from './WorldIdentificationInterface';
import {Cat} from "../Inharitants/Cat";
import {Dog} from "../Inharitants/Dog";
import {Buldozer} from "../Inharitants/Buldozer";

export interface InhabitantInterface {
    getWorld(): worldIdentification.WorldIdentificationInterface;
    toJSON(): string;
}

export interface Vector {
    x: number;
    y: number;
}

export interface AllInhabitants {
    cats: string[];
    dogs: string[];
    buldozers: string[];
}