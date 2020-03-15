import * as worldIdentification from './WorldIdentificationInterface';

export interface InhabitantInterface {
    // name(): string;
    // image(): string;
    // x(): number;
    // y(): number;
    // move(x: number, y: number)
    getWorld(): worldIdentification.WorldIdentificationInterface;
    toJSON(): string;
}