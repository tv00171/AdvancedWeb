import {query} from "../helpers/db_connection";
import {generateToken, hashPassword, verifyPassword} from "../helpers/authentication_helper";
import BaseError from "../models/BaseError";
import UserModel from "../models/UserModel";
import prisma from "../helpers/prisma";

export default class AuthService {
    /**
     * Logs the user in using the email and a password
     * @param email
     * @param password
     */
    static async login(email: string, password: string) {
        const user = await this.getUser({email: email})
        if (user == null) {
            throw new BaseError({error: "User not found", errno: 4, status: 401})
        }
        await verifyPassword(user.hash, password);
        return user.toJSON();
    }

    /**
     * Creates a new user in the database
     * @param email
     * @param password
     * @param name
     */
    static async register(email: string, password: string, name: string) {
        // Hash the password
        const hash = await hashPassword(password);

        //Create a session token
        const session_token = generateToken();
        const refresh_token = generateToken();

        // Insert the user into the db
        await query('INSERT INTO users(email, name, hash, session_token, refresh_token) VALUES (?,?,?,?,?)', [email, name, hash, session_token, refresh_token]);
        return await this.getUser({email: email})

    }

    static async isTokenValid(token: string){
        const session_token = await prisma.users.findFirst({where:{session_token: token}})

        return session_token  == null ? false: true;
    }

    /**
     * Gets the user by using either the name or the id provided, if both are provided it will use the id.
     * If the user is not found it will return null
     * In case that no parameters are provided an error will be thrown.
     * @param fields
     */
    static async getUser(fields: { id?: number, email?: string }) {
        if (fields.id != null) {
            const user = await prisma.users.findFirstOrThrow({where: {id: fields.id}})
            console.log(user)
            return user == null ? null : UserModel.fromJSON(user)
        } else if (fields.email != null) {
            const user = await prisma.users.findFirstOrThrow({where: {email: fields.email}})
            return user == null ? null : UserModel.fromJSON(user)
        } else {
            throw new BaseError({error: 'No method of searching user used', errno: 0, status: 500})
        }
    }
}
