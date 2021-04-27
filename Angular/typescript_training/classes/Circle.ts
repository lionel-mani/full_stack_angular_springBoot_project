import { Shape } from "./Shape";

export class Circle extends Shape{
     
    
    constructor(_x: number, _y: number, private _radius: number){
        super(_x,_y);
    }

    public get radius(): number {
        return this._radius;
    }
    public set radius(value: number) {
        this._radius = value;
    }

    toString(): string{
        return super.toString() + `, radius = ${this._radius}`;
    }
}