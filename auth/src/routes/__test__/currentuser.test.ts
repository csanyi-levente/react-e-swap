import request from 'supertest'; 
import { app } from '../../app';

it('current user', async () => {
    const cookie = await global.signin();

    expect(cookie).toBeDefined();

    const response2 = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

        expect(response2.body.currentUser.email).toBeDefined();
});

it('current user missing', async () => {
    const response2 = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);

        expect(response2.body.currentUser).toEqual(null);
});