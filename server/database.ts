export class Database {

    private _loki = require('lokijs');
    private _db;
    private _person;

    constructor() {
        this._db = new this._loki('PathExample');
        this._person = this._db.addCollection('person');
        this._person.insert({firstName:'Adam', familyName: 'Jones'});
        this._person.insert({firstName:'Betty', familyName: 'Miller'});
        this._person.insert({firstName:'Chris', familyName: 'Connor'});
        this._person.insert({firstName:'Dave', familyName: 'Dean'});
    }

    public getPersons() : any {
        let result:PathListEntry[] = [];
        for (let person of this._person.find()) {
            let entry:PathListEntry = new PathListEntry();
            let key:PathListKey = new PathListKey();
            console.log(person);
            key.key = person['$loki'];
            key.name = "personKey";
            entry.key = key;
            entry.name = person.familyName + ' ' + person.firstName;
            entry.details.push('' + person['$loki']); // must be string
            result.push(entry);
        }
        return result;
    }

    public createPerson(data:any) : boolean {
        this._person.insert(data);
        return true;
    }

    public getPerson(personKey:number) : any {
        let query:any = {};
        query["$loki"] = personKey;
        let result:any = this._person.findOne(query);
        result = JSON.parse(JSON.stringify(result)); // clone

        let key:PathListKey = new PathListKey();
        key.key = result.id;
        key.name = "personKey";
        result.key = key;
        return result;
    }

    public updatePerson(personKey:number, data:any) : boolean {
        let query:any = {};
        query["$loki"] = personKey;
        let person:any = this._person.findOne(query);
        person.firstName = data.firstName;
        person.familyName = data.familyName;
        this._person.update(person);
        return true;
    }

    public deletePerson(personKey:number) {
        let query:any = {};
        query["$loki"] = personKey;
        let person:any = this._person.findOne(query);
        this._person.remove(person);
        return true;
    }

}

export class PathListEntry {
    public key:PathListKey;
    public name:string;
    public color:string;
    public icon:string;
    public url:string;
    public active:boolean = true;
    public details:string[] = [];
}

export class PathListKey {
    public name:string;
    public key:number;
}