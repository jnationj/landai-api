// index.test.js

const request = require('supertest');
const express = require('express');
const app = require('./index'); // make sure your Express app is exported

describe('GET /landNFTs', () => {
  it('should return 200 and an array', async () => {
    const res = await request(app).get('/landNFTs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});