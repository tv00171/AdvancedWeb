import app from "../src/app";
// @ts-ignore
import request from "supertest"
import AuthService from "../src/services/authService";
import { query } from "../src/helpers/db_connection";
describe('Authentication routes', function() {
    beforeAll(async ()=>{
        await AuthService.register('test4@gmail.com', '123', 'Test User')
    })
    afterAll(async ()=>{
        await query('DELETE FROM users WHERE email = ?', ['test3@gmail.com'])
        await query('DELETE FROM users WHERE email = ?', ['test4@gmail.com'])
    })
    it('health check', async () => {
        const res = await request(app)
            .get('/')
        expect(res.statusCode).toEqual(200)
    });

    it('login a user', async () => {
        const res = await request(app)
            .post('/login').send({
                'email': 'test4@gmail.com',
                'password':'123'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.payload.email).toEqual('test4@gmail.com')
    });

    it('register a user', async () => {
        const res = await request(app)
            .post('/register').send({
                'email': 'test3@gmail.com',
                'password':'123',
                'name': 'Test User 3'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.payload.email).toEqual('test3@gmail.com')
    });
});
