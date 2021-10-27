import request from 'supertest'; 
import { app } from '../../app';

it('201', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "asd@asd.com",
            password: "abcd123"
        })
        .expect(201);
});

it('400 password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "asd@asd.com",
            password: ""
        })
        .expect(400);
});

it('400 email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "",
            password: "password"
        })
        .expect(400);
});

it('400 invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "asdasd.com",
            password: "abcd123"
        })
        .expect(400);
});

it('400 invalid', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400);
});

it('400 duplicated emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "asd@asd.com",
            password: "abcd123"
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: "asd@asd.com",
            password: "abcd123"
        })
        .expect(400);
});

it('201 header', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: "asd@asd.com",
            password: "abcd123"
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});