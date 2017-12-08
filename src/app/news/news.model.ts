import { User } from '../user/user.model';

export class News {
    private _id: String;
    private _title: String;
    private _body: String;
    private _authors: User[];
    private _date: Date;

    static fromJSON(json) : News {
        const news = new News(json.title,json.body,json.users,json.date);
        news._id = json.id;
        return news;
    }

    toJSON() {
        return {
            id: this._id,
            title: this._title,
            body: this._body,
            authors: this._authors,
            date: this._date
        }
    }

    constructor(title: String, content: String, authors?: User[], date?: Date) {
        this._title = title;
        this._body = content;
        this._authors = authors;
        this._date = date;
    }

    get title() : String {
        return this._title;
    }

    get content() : String {
        return this._body;
    }

    get authors() : User[] {
        return this._authors;
    }

    addAuthor(author: User) {
        this._authors.push(author);
    }

    get date() : Date {
        return this._date;
    }

    set date(date: Date) {
        this._date = date;
    }

    get id() : String {
        return this._id;
    }
}