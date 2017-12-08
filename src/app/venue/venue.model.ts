export class Venue {

    private _id: String;
    private _name: String;
    private _address_street: String;
    private _address_number: String;
    private _address_city: String;
    private _address_postalcode: String;
    private _telephone: String;

	constructor(name: String, addressStreet: String, addressNumber: String, address_city: String, address_postalcodle: String, telephone: String) {
		this._name = name;
		this._address_street = addressStreet;
		this._address_number = addressNumber;
		this._address_city = address_city;
		this._address_postalcode = address_postalcodle;
		this._telephone = telephone;
    }
    
    static fromJSON(json) : Venue {
        const venue = new Venue(json.name,json.address_street,json.address_number,json.address_city,json.address_postalcode,json.telephone)
        venue._id = json.id;
        return venue
    }

    toJSON() {
        return {
            id: this._id,
            name: this._name,
            address_street: this._address_street,
            address_number: this._address_number,
            address_city: this._address_city,
            address_postalcode: this._address_postalcode,
            telephone: this._telephone
        }
    }

	public get name(): String {
		return this._name;
	}

	public set name(value: String) {
		this._name = value;
	}

	public get addressStreet(): String {
		return this._address_street;
	}

	public set addressStreet(value: String) {
		this._address_street = value;
	}

	public get addressNumber(): String {
		return this._address_number;
	}

	public set addressNumber(value: String) {
		this._address_number = value;
	}

	public get address_city(): String {
		return this._address_city;
	}

	public set address_city(value: String) {
		this._address_city = value;
	}

	public get address_postalcodle(): String {
		return this._address_postalcode;
	}

	public set address_postalcodle(value: String) {
		this._address_postalcode = value;
	}

	public get telephone(): String {
		return this._telephone;
	}

	public set telephone(value: String) {
		this._telephone = value;
	}

    public get id(): String {
        return this._id;
    }

    public set id(value: String) {
        this._id = value;
    }

}