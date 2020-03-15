import * as inhabitant from './InhabitantInterface'
export interface WorldIdentificationInterface {
    checkIfInOneWorld(firstInhabitant: inhabitant.InhabitantInterface, secondInhabitant: inhabitant.InhabitantInterface): void;
    id: number;
}