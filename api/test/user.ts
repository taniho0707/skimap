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

describe('API areaのテスト', function() {
    it('/api/area/list はじめは空リスト', function(done) {
        request(app)
            .get('/api/area/list')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({
                data: []
            });
    });

    it('/api/area/add 新規スキー場の追加', function(done) {
        request(app)
            .post('/api/area/add')
            .send({
                "name": "test_area",
                "prefecture": 1,
                "official_url": "http://example.com",
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

    it('/api/area/list 新規スキー場が登録されていることを確認', function(done) {
        request(app)
            .get('/api/area/list')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({
                data: [
                    {
                        id: 1,
                        name: "test_area"
                    }
                ]
            });
    });

    it('/api/area/1 登録したスキー場の詳細を確認', function(done) {
        request(app)
            .get('/api/area/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({
                data: {
                    id: 1,
                    prefecture: 1,
                    area_id: null,
                    name: "test_area",
                    fullname: null,
                    official_url: "http://example.com",
                }
            });
    });

    it('/api/area/update スキー場を更新', function(done) {
        request(app)
            .post('/api/area/update')
            .send({
                id: 1,
                official_url: "http://example.org",
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

    it('/api/area/1 更新したスキー場の詳細を確認', function(done) {
        request(app)
            .get('/api/area/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({
                data: {
                    id: 1,
                    prefecture: 1,
                    area_id: null,
                    name: "test_area",
                    fullname: null,
                    official_url: "http://example.org",
                }
            });
    });

    it('/api/area/remove スキー場を削除', function(done) {
        request(app)
            .post('/api/area/remove')
            .send({
                "id": 1
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

    it('/api/area/list スキー場が削除されていることを確認', function(done) {
        request(app)
            .get('/api/area/list')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({
                data: []
            });
    });

    it('/api/area/1 存在しないスキー場の詳細を要求するとエラーが返ってくることを確認', function(done) {
        request(app)
            .get('/api/area/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });
});

describe('API gpslogのテスト', function() {
    it('/api/gpslog/list はじめは空リスト', function(done) {
        request(app)
            .get('/api/gpslog/list')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({
                data: []
            });
    });

    it('/api/gpslog/add 新規Gpslogの追加', function(done) {
        request(app)
            .post('/api/gpslog/add')
            .field("json", '{\
                "area_id": 1,\
                "user_id": 1,\
                "date": "2018-03-11"\
            }')
            .attach("file", "./test/testfile1.gpx")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({
                data: {
                    success: true
                }
            });
    });

    it('/api/gpslog/list 新規Gpslogが登録されていることを確認', function(done) {
        request(app)
            .get('/api/gpslog/list')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({
                data: [
                    {
                        id: 1,
                        area_id: 1,
                        user_id: 1,
                        date: '2018-03-11'
                    }
                ]
            });
    });

    it('/api/gpslog/remove Gpslogを削除', function(done) {
        request(app)
            .post('/api/gpslog/remove')
            .send({
                "id": 1
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

    it('/api/gpslog/list Gpslogが削除されていることを確認', function(done) {
        request(app)
            .get('/api/gpslog/list')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({
                data: []
            });
    });
});