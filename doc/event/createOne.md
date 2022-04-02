# Creating an Event

Create new event.

**URL** : `/api/v1/event`

**Method** : `POST`

**Auth required** : Yes

**Request Headers** 
```json
{
    "x-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjIzN2E3OGMwMzUyM2MwM2VmMDE0ZGUiLCJpYXQiOjE2NDY0OTk3MDAsImV4cCI6MTY0NjQ5OTc2MH0.pmfaumTcfKFP3Lgf82RWpo1Cd6_aAVcfVy9SRHpInxk",
}
```

**Request Body**

```json
{
  "title": "Business meeting",
  "notes": "Check my notes",
  "start": "2022-02-18T17:00:00.000Z",
  "end": "2022-02-18T17:50:00.000Z"
}
```
Note: **notes** is optional

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "status": true,
    "msg": "process sucess",
    "event": {
        "title": "Visit place 2",
        "notes": "make a call before",
        "user": {
            "_id": "62237a78c03523c03ef014de",
            "name": "user name"
        },
        "start": "2022-02-18T17:00:00.000Z",
        "end": "2022-02-18T17:50:00.000Z",
        "_id": "62239b51d9ee4a39a9917c57"
    }
}
```

## Error Responses

**Condition** : If 'title', 'start' & 'end' values are empty or missed.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": false,
    "msg": "request data [body, header, query or params] trouble encountered",
    "errors": [
        {
            "value": "",
            "msg": "Invalid value",
            "param": "start",
            "location": "body"
        },
        {
            "value": "",
            "msg": "Invalid value",
            "param": "start",
            "location": "body"
        },
        {
            "value": "",
            "msg": "Invalid value",
            "param": "end",
            "location": "body"
        },
        {
            "value": "",
            "msg": "Invalid value",
            "param": "end",
            "location": "body"
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