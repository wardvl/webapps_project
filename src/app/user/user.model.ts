export class User {
    private _id: String;
    private _firstName: String;
    private _lastName: String;
    private _role: String;
    private _password: String;
    private _salt: String;
    private _email: String;

    constructor(firstName: String, lastName: String, role: String, salt: String, password: String, email: String) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._role = role;
        this._salt = salt;
        this._password = password;
        this._email = email;
    }

    static fromJSON(json) : User{
        const user = new User(json.firstName, json.lastName, json.role, json.salt, json.password, json.email);
        user._id = json._id;
        return user;
    }

    toJSON() {
        return {
            _id: this._id,
            name: this._firstName,
            surname: this._lastName,
            role: this._role,
            salt: this._salt,
            password: this._password,
            email: this._email,
        }
    }

	public get id(): String {
		return this._id;
	}

	public set id(value: String) {
		this._id = value;
	}

	public get firstName(): String {
		return this._firstName;
	}

	public set firstName(value: String) {
		this._firstName = value;
	}

	public get lastName(): String {
		return this._lastName;
	}

	public set lastName(value: String) {
		this._lastName = value;
	}

	public get role(): String {
		return this._role;
	}

	public set role(value: String) {
		this._role = value;
	}

	public get password(): String {
		return this._password;
	}

	public set password(value: String) {
		this._password = value;
	}

	public get salt(): String {
		return this._salt;
	}

	public set salt(value: String) {
		this._salt = value;
	}

	public get email(): String {
		return this._email;
	}

	public set email(value: String) {
		this._email = value;
	}
    
}