export class Customer{
    
    
    // private firstName: string;
    // private lastName: string;

    // constructor(FN: string, LN: string){
    //     this.firstName= FN;
    //     this.lastName= LN;
    // }

    //shortcut to remove the above boiler plate codes
    constructor(private _firstName: string, private _lastName: string){

    }
    //added with quick fix for get / set accessors
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }

    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }   
    // public getFirstName() : string{
    //     return this.firstName;
    // }
    // public setFirstName(FN: string): void {
    //     this.firstName = FN;
    // }
    
    //accessors get/set
    /*
    public get fName(): string{
        return this.firstName;
    }
    */
}

let cust = new Customer("mani","kandan");

//console.log(`hello ${cust.firstName} ${cust.lastName}`);
//console.log(`hello ${cust.firstName}`);