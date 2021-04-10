# API

## User

### /api/user/list

GET

ユーザーリストを返す
idとnameのみ

### /api/user/add

POST

新規ユーザーを登録する

### /api/user/update

POST

ユーザー情報を更新する

### /api/user/remove

POST

ユーザー情報を削除する

## Prefecture

### /api/prefecture/

GET

全都道府県のリストを返す

```json
{
    data: [
        {
            id: 1,
            name: "北海道"
        },
        ...
    ]
}
```

### /api/prefecture/:id

GET

id番号の都道府県名を返す

```json
{
    data: {
        id: 1,
        name: "北海道"
    }
}
```

## Area

### /api/area/:id

GET

id番号のスキー場詳細を返す

```json
{
    data: [
        {
            id: 1,
            ...
        },
        ...
    ]
}
```

### /api/area/list

GET

スキー場リストを返す


```json
{
    data: {
        id: 1,
        name: ''
    }
}
```

### /api/area/add

POST

スキー場情報を追加する

### /api/area/update

POST

スキー場情報を更新する

### /api/area/remove

POST

スキー場情報を削除する

## Record

### /api/record/list

GET

旅行情報のリストを返す

### /api/record/:id

GET

旅行情報の詳細を返す  
参加者リストも含めて

### /api/record/add

POST

旅行情報を追加する

### /api/record/update

POST

旅行情報を更新する

### /api/record/remove

POST

旅行情報を削除する

## Gpslog

### /api/gpslog/record/:id

GET

id番号の旅行のGPSログ一覧を取得する

### /api/gpslog/user/:id

GET

id番号のユーザーのGPSログ一覧を取得する

### /api/gpslog/data/raw/:id

GET

id番号のGPSログ生データを取得する

### /api/gpslog/data/json/:id

GET

id番号のGPSログ加工済データを取得する

### /api/gpslog/add

POST

GPSログを追加する

### /api/gpslog/remove

POST

GPSログを削除する
