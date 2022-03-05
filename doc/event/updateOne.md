# Update an Event

Update an existing event. We can modify 'title', 'notes', 'start' and 'end' values optionally.

**URL** : `/api/v1/auth/event/:id`

**Method** : `PUT`

**Auth required** : Yes

**Request Headers** 
```json
{
    "x-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjIzN2E3OGMwMzUyM2MwM2VmMDE0ZGUiLCJpYXQiOjE2NDY0OTk3MDAsImV4cCI6MTY0NjQ5OTc2MH0.pmfaumTcfKFP3Lgf82RWpo1Cd6_aAVcfVy9SRHpInxk",
}
```

**Request Params**

***:id***: event Id. Must be a MongoDB ObjectId type.

**Request Body**

```json
{
  "title": "Business meeting - Modified",
  "notes": "Check my notes - Modified",
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
        "_id": "6223aae975030b02152f05c2",
        "title": "Business meeting - Modified",
        "notes": "Check my notes - Modified",
        "user": {
            "_id": "62237a78c03523c03ef014de",
            "name": "user name"
        },
        "start": "2022-02-18T17:00:00.000Z",
        "end": "2022-02-18T17:50:00.000Z"
    }
}
```

## Error Responses

**Condition** : If provided event 'Id' doesn't exists.

**Code** : `400 BAD REQUEST`

**Content** :
```json
{
    "status": false,
    "msg": "event not found with provided Id"
}
```

---

**Condition** : If 'Id', 'title', 'start', 'end' & 'notes' values are empty or invalid.

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