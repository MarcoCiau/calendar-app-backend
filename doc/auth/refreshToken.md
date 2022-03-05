# Refresh Token

User Login.

**URL** : `/api/v1/auth/refreshToken`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "refreshToken": "[JWT Token]"
}
```

**Request Body Example**
```javascript
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjIzN2E3OGMwMzUyM2MwM2VmMDE0ZGUiLCJpYXQiOjE2NDY0OTk2ODksImV4cCI6MTY0NjUwMzI4OX0.6YNN8aM2GU8_jUMxnKdwbNkum88qhrbYHWc-XlftWRU"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "status": true,
    "msg": "process sucess",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjIzN2E3OGMwMzUyM2MwM2VmMDE0ZGUiLCJpYXQiOjE2NDY0OTk3MDAsImV4cCI6MTY0NjQ5OTc2MH0.pmfaumTcfKFP3Lgf82RWpo1Cd6_aAVcfVy9SRHpInxk",
    "user": {
        "_id": "62237a78c03523c03ef014de",
        "name": "user name"
    },
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjIzN2E3OGMwMzUyM2MwM2VmMDE0ZGUiLCJpYXQiOjE2NDY0OTk3MDAsImV4cCI6MTY0NjUwMzMwMH0.vBC7qlNNtOBUqwb71QIU-_LqfeANRJ9pWGlQYEpFgEo"
}
```

## Error Responses

**Condition** : If 'refresh token' is missed or empty.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": false,
    "msg": "request data [body, header, query or params] trouble encountered",
    "errors": [
        {
            "msg": "Invalid value",
            "param": "refreshToken",
            "location": "body"
        }
    ]
}
```

**Condition** : If 'refresh token' doesn't match with the signature key.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": false,
    "msg": "invalid signature"
}
```

**Condition** : If 'refresh token' is expired.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": false,
    "msg": "jwt expired"
}
```