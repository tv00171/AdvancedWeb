import app from "../src/app";
// @ts-ignore
import request from "supertest"
import AuthService from "../src/services/authService";
import {query} from "../src/helpers/db_connection";

/**
 * Test the authentication service which connects to the database and contains all the business logic.
 */
describe('Authentication Service', function() {
    beforeAll(async ()=>{
        await AuthService.register('test@gmail.com', '123', 'Test User')

    })
    afterAll(async ()=>{
        await query('DELETE FROM users WHERE email = ?', ['test@gmail.com'])
        await query('DELETE FROM users WHERE email = ?', ['test2@gmail.com'])
    })

    it('login using valid email and password ', async () => {
        const user =  await AuthService.login('test@gmail.com', '123')

        expect(user.email).toEqual('test@gmail.com');
        expect(user.session.session_token).not.toBeNull()
    });

    it('login using invalid email and password ', async () => {
        let user;
        try{
            user = await AuthService.login('invalidUser@gmail.com', '123')
        }catch (e) {
            expect(e.errno).toEqual(4)
        }
        expect(user).toBeUndefined();
    });

    it('register new user with valid data', async () => {
        const user = await AuthService.register('test2@gmail.com', '123', 'Test User')
        expect(user.email).toEqual('test2@gmail.com');
    });

    it('validate a valid token', async () => {
        const user = await AuthService.login('test@gmail.com', '123')
        const isTokenValid = await AuthService.isTokenValid(user.session.session_token)
        expect(isTokenValid).toEqual(true);
    });


    it('validate an invalid token', async () => {
        const isTokenValid = await AuthService.isTokenValid('123')
        expect(isTokenValid).toEqual(false);
    });

    it('get user data using email of existing account', async () => {
        const user = await AuthService.getUser({email: 'test@gmail.com'})
        expect(user.name).toEqual('Test User');
    });
});
