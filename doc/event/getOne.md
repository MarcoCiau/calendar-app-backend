# Get Event by Id

Get event by Id. 

**URL** : `/api/v1/event/:id`

**Method** : `GET`

**Auth required** : Yes

**Request Headers** 
```json
{
    "x-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjIzN2E3OGMwMzUyM2MwM2VmMDE0ZGUiLCJpYXQiOjE2NDY0OTk3MDAsImV4cCI6MTY0NjQ5OTc2MH0.pmfaumTcfKFP3Lgf82RWpo1Cd6_aAVcfVy9SRHpInxk",
}
```

**Request Params**

- ***:id***: event Id. Must be a MongoDB ObjectId type.

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "status": true,
    "msg": "process sucess",
    "count": 1,
    "events": [
        {
            "_id": "62239b51d9ee4a39a9917c57",
            "title": "Visit place 2",
            "notes": "make a call before",
            "user": {
                "_id": "62237a78c03523c03ef014de",
                "name": "user name"
            },
            "start": "2022-02-18T17:00:00.000Z",
            "end": "2022-02-18T17:50:00.000Z"
        }
    ]
}
```

## Error Responses

**Condition** : If provided event 'Id' doesn't exists.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": false,
    "msg": "event not found with provided userId"
}
```

---

**Condition** : If provided event 'Id' is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": false,
    "msg": "request data [body, header, query or params] trouble encountered",
    "errors": [
        {
            "value": "620ff90da449a40a500274e",
            "msg": "Invalid value",
            "param": "id",
            "location": "params"
        }
    ]
}
```

---

**Condition** : If 'access token' doesn't match with the signature key.

**Code** : `401 UNAUTHORIZED`

**Content** :

```json
{
    "status": false,
    "msg": "invalid signature"
}
```

---

**Condition** : If 'access token' is expired.

**Code** : `401 UNAUTHORIZED`

**Content** :

```json
{
    "status": false,
    "msg": "jwt expired"
}
```