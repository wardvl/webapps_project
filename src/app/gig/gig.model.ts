import { Venue } from '../venue/venue.model';

export class Gig {

    private _id: String;
    private _description: String;
    private _date: Date;
    private _venue: Venue;

    static fromJSON(json): Gig {
        const gig = new Gig(json.description, json.venue, json.date);
        gig._id = json.id;
        return gig;
    }

    toJSON() {
        return {
            id: this._id,
            date: this._date,
            description: this._description,
            venue: this._venue
        }
    }

    constructor(description: String, venue: Venue, date?: Date) {
        this._description = description;
        this._venue = venue;
        this._date = date;
    }

    public get description(): String {
        return this._description;
    }

    public set description(value: String) {
        this._description = value;
    }

    public get id(): String {
        return this._id;
    }

    public set id(value: String) {
        this._id = value;
    }

    public get date(): Date {
        return this._date;
    }

    public set date(value: Date) {
        this._date = value;
    }

    public get venue(): Venue {
        return this._venue;
    }

    public set venue(value: Venue) {
        this._venue = value;
    }
}