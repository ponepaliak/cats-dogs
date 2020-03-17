import {InhabitantsFactoryInterface} from "../Interface/InhabitantsFactoryInterface";
import {Buldozer} from "../Inharitants/Buldozer";
import {Cat} from "../Inharitants/Cat";
import {Dog} from "../Inharitants/Dog";
import {InhabitantInterface} from "../Interface/InhabitantInterface";
import {WorldActionsForInhabitantsInterface} from "../Interface/IWorldActions";
import {AbstractInhabitant} from "../Inharitants/AbstractInhabitant";

export class World implements WorldActionsForInhabitantsInterface {
    private static count: number = 0;
    private _id: number;
    private inhabitantsFactory: InhabitantsFactoryInterface;
    private catsList: Cat[] = [];
    private dogsList: Dog[] = [];
    private buldozersList: Buldozer[] = [];
    private map: {} = {};

    constructor(inhabitantsFactory: InhabitantsFactoryInterface) {
        this.inhabitantsFactory = inhabitantsFactory;
        this._id = World.count++;
        this.inhabitantsFactory.setWorld(this);
    }

    public get id() {
        return this._id;
    }

    public createCat(): Cat {
        let cat = this.inhabitantsFactory.createCat();
        this.catsList.push(cat);
        return cat;
    }

    public catNumbers() {
        console.log(this.catsList.length, this.id);
    }

    public createDog(): Dog {
        let dog = this.inhabitantsFactory.createDog();
        this.dogsList.push(dog);
        return dog;
    }

    public createBuldozer(): Buldozer {
        let buldozer = this.inhabitantsFactory.createBuldozer();
        this.buldozersList.push(buldozer);
        return buldozer;
    }

    public generateMap() {
        this.map = {};
        this.addElementsToMap(this.catsList);
        this.addElementsToMap(this.dogsList);
        this.addElementsToMap(this.buldozersList);
    }

    private addElementsToMap(inhabitants: AbstractInhabitant[]) {
        for (let inhabitant of inhabitants) {
            if (!this.map.hasOwnProperty(inhabitant.getCoordinates())) {
                this.map[inhabitant.getCoordinates()]  = [inhabitant];
            } else {
                this.map[inhabitant.getCoordinates()].push(inhabitant);
            }
        }
    }

    public getInhabitantsByCoordinates(coordinates: string) {
        return this.map.hasOwnProperty(coordinates) ? this.map[coordinates] : [];
    }

    public checkIfInOneWorld(firstInhabitant: InhabitantInterface, secondInhabitant: InhabitantInterface): void {
        if (this.id != secondInhabitant.getWorld().id) {
            this.timeError();
        }
    }

    public checkIfInOneWorld_v2(inhabitant: InhabitantInterface): void {
        if (this.id != inhabitant.getWorld().id) {
            this.timeError();
        }
    }

    public checkIfCatExist(cat: Cat): void {
        if (this.catsList.indexOf(cat) === -1) {
            this.timeError();
        }
    }

    public checkIfDogExist(dog: Dog): void {
        if (this.dogsList.indexOf(dog) === -1) {
            this.timeError();
        }
    }

    private timeError() {
        throw new Error("Time limit error");
    }

    public dropCat(cat: Cat): void {
        delete this.catsList[ this.catsList.indexOf(cat) ];
    }

    public dropDog(dog: Dog): void {
        delete this.dogsList[ this.dogsList.indexOf(dog) ];
    }

    public some(): void {

    }
}

