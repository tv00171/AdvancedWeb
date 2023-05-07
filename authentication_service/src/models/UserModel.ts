import BaseError from "./BaseError";

export default class UserModel {
    /**
     * The id that identifies the user in the DB
     */
    id: number;
    /**
     * The email associated with the account
     */
    email: string;
    /**
     * The full name of the user
     */
    name: string;

    /**
     * The has representing the password of the user
     */
    hash: string;

    session: {
        /**
         * The session token associated with the account
         */
        session_token?: string;
        /**
         * The refresh token
         */
        refresh_token?: string
    }

    constructor(fields: { id: number, email: string, hash?: string, name?: string, session_token?: string, refresh_token?: string }) {
        this.session = {}
        this.email = fields.email;
        this.id = fields.id;
        this.hash = fields.hash;
        this.name = fields.name;
        this.session.refresh_token = fields.refresh_token;
        this.session.session_token = fields.session_token;
    }

    toJSON() {
        return {id: this.id, email: this.email, name: this.name, session: this.session}
    }

    static fromJSON(json: any) {
        try {
            return new UserModel({
                id: json.id,
                email: json.email,
                hash: json.hash,
                name: json.name ?? null,
                session_token: json.session_token ?? null,
                refresh_token: json.refresh_token ?? null,
            });
        } catch (e: any) {
            throw new BaseError({error: e, errno: 6});
        }
    }
}
