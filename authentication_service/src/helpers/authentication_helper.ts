import argon2 from 'argon2'
import BaseError from "../models/BaseError";
import crypto from "crypto";

/**
 * Hashes a password using argon2 and the default security settings, which include salting.
 * @param password
 * @param ignore
 */
export async function hashPassword(password: string) {
    // Validate the password
    //     let passwordRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_@#\$%\^&\*])(?=.{8,})");
    //     if (password.length < 8 || password.length > 20) {
    //         throw new BaseError({error: 'Password too short/long', status: 400, errno: 10})
    //     }
    //     if (!passwordRegExp.test(password)) {
    //         throw new BaseError({error: 'Password does not match the criteria', status: 400, errno: 10})
    //     }
    //
    let passwordHash;

    // Hash the password with argon2
    try {
        passwordHash = await argon2.hash(password);
    } catch (e) {
        throw new BaseError({error: 'Error hashing password', status: 500, errno: 9})

    }

    return passwordHash;
}

export async function verifyPassword(hashPassword: any, plainPassword: string) {
    if (!await argon2.verify(hashPassword, plainPassword)) {
        throw new BaseError({error: 'Invalid credentials', status: 400, errno: 5})
    }
    return true;
}

export function generateToken(length?: number) {
    try {
        if (length != null) {
            return crypto.randomBytes(length).toString('base64')

        } else {
            return crypto.randomBytes(16).toString('base64')
        }
    } catch (e) {
        throw new BaseError({error: e, errno: 9})
    }
}
