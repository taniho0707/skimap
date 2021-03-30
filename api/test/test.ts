const request = require('supertest');
const app = require('../index');

describe('GET /api/prefecture/1', function() {
    it('respond Hokkaido with json', function(done) {
        request(app)
            .get('/api/prefecture/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({
                data: {
                    id: 1,
                    name: "北海道"
                }
            });
    });
});
