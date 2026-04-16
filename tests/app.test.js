const request = require('supertest');
const app = require('../src/index');

describe('API Endpoints', () => {
  it('should return 200 OK for /health', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ status: 'OK' });
  });

  it('should return data for /api/data', async () => {
    const res = await request(app).get('/api/data');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });

  it('should return success message for /api/unstable without fail flag', async () => {
    const res = await request(app).get('/api/unstable');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: 'Success' });
  });

  it('should return 500 failure for /api/unstable with fail=true', async () => {
    const res = await request(app).get('/api/unstable?fail=true');
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({ error: 'Simulated failure' });
  });

  it('should return success for /api/flaky', async () => {
    const res = await request(app).get('/api/flaky');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: 'Flaky Success' });
  });

  it('should return success for /api/flaky again', async () => {
    const res = await request(app).get('/api/flaky');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: 'Flaky Success' });
  });
});
