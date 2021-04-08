const request = require('supertest');
const app = require('../index');

describe('API prefectureのテスト', function() {
    it('/api/prefecture/1 = 北海道', function(done) {
        this.timeout(60000);
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

    it('/api/prefecture/ = 47都道府県リスト', function(done) {
        request(app)
            .get('/api/prefecture/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect(function(res: any) {
                if (res.body.data.length !== 47) {
                    throw new Error('都道府県リストが返ってこない');
                }
            });
    });
});

describe('API userのテスト', function() {
    it('/api/user/list はじめは空リスト', function(done) {
        request(app)
            .get('/api/user/list')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({
                data: []
            });
    });

    it('/api/user/add 新規ユーザーの追加', function(done) {
        request(app)
            .post('/api/user/add')
            .send({
                "name": "test_user"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({
                data: {
                    success: true
                }
            });
    });

    it('/api/user/list 新規ユーザーが登録されていることを確認', function(done) {
        request(app)
            .get('/api/user/list')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({
                data: [
                    {
                        id: 1,
                        name: "test_user"
                    }
                ]
            });
    });

    it('/api/user/remove ユーザーを削除', function(done) {
        request(app)
            .post('/api/user/remove')
            .send({
                "name": "test_user"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({
                data: {
                    success: true
                }
            });
    });

    it('/api/user/list ユーザーが削除されていることを確認', function(done) {
        request(app)
            .get('/api/user/list')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({
                data: []
            });
    });
});
