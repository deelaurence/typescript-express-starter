import request from 'supertest';
import app from '../src/app';

describe('Authentication Endpoints', () => {
  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser3', password: 'testpassword' });
    expect(res.statusCode).toEqual(201);
  });

  it('should not register a user with the same username', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser3', password: 'testpassword' });
    expect(res.statusCode).toEqual(409);
  });

  it('should authenticate a user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpassword' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
