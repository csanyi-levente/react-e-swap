import request from 'supertest'; 
import { app } from '../../app';

it('correct signout', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: "asd@asd.com",
            password: "111111111"
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();

    let response2 = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'asd@asd.com',
            password: '111111111'
        })
        .expect(200);

    expect(response2.get('Set-Cookie')).toBeDefined();

    let response3 = await request(app)
            .post('/api/users/signout')
            .send({
                email: 'asd@asd.com',
                password: '111111111'
            })
        .expect(200);

    expect(response3.get('Set-Cookie')[0])
            .toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');

});