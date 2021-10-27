import request from 'supertest'; 
import { app } from '../../app';

it('email does not exists', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'sdsad@asdas.com',
            password: 'sdsdsadsa'
        })
});

it('incorrect email', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: "asd@asd.com",
            password: "111111111"
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();

    await request(app)
        .post('/api/users/signin')
        .send({
            email: '111@asd.com',
            password: '111111111'
        })
        .expect(400);
});

it('incorrect pw', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: "asd@asd.com",
            password: "111111111"
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'asd@asd.com',
            password: 'sadsddsaas'
        })
        .expect(400);
});

it('correct creds', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: "asd@asd.com",
            password: "111111111"
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'asd@asd.com',
            password: '111111111'
        })
        .expect(200);
});
